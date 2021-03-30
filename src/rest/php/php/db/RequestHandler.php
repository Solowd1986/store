<?php

namespace php\db;
require_once "DbConnect.php";

use php\db\DbConnect as Connect;

class RequestHandler extends DbConnect
{
    public static function getIndexPageData()
    {
        $data['phones'] = self::getCategoryItems("phones", 4);
        $data['gadgets'] = self::getCategoryItems("gadgets", 4);
        $data['accessoires'] = self::getCategoryItems("accessoires", 4);
        $data['slider'] = self::getSlider();
        return $data;
    }


    public static function getCategoryItems($category, $limit = null, $offset = null)
    {
        $DEFAULT_NUMBER_OF_ELEMENTS = 8;
        // Получаем имена таблиц для картинок, промо и основного списка продуктов, основываясь на переданном значении
        $category_products_table = $category . "_list";
        $category_promo_table = substr($category, 0, strlen($category) - 1) . "_promo";
        $category_img_table = substr($category, 0, strlen($category) - 1) . "_img";

        $products_query = $limit
            ? "SELECT * FROM {$category_products_table} LIMIT {$limit}"
            : "SELECT * FROM {$category_products_table} LIMIT {$DEFAULT_NUMBER_OF_ELEMENTS}";

        if ($offset) {
            //print json_encode([$category_products_table, $limit, $offset]);
            $products_query = "SELECT * FROM {$category_products_table} LIMIT {$offset},{$limit}";
        }

        $pdo = Connect::exec()->prepare($products_query);
        $pdo->execute();
        $list_of_products = $pdo->fetchAll();

        // После получения списка продуктов выбранной категории, нужно добавить к каждому продукту
        // поля img/promo, а для телефонов - поле specifications, поэтому нам нужно получить для каждого продукта
        // в цикле соответствующие ему записи из таблиц img/promo/spec, у каждой из этих табдиц есть поле-внешний ключ,
        // по которому и определяется, к какому именно продукту приписана запись. Название поля это название категории
        // в единственном числе плюс "_id", поэтому ниже мы преобразуем название категории к такому виду.
        // Далее, нужно на текущей итерации получить индекс продукта $product в массиве $list_of_products,
        // чтобы именно текущий продукт получил доп. поля, ему соответствующие, ориентиром будет id продукта,
        // эквивалентный внешнему ключу, о котором было выше.

        foreach ($list_of_products as $product) {
            $product_foreign_key_name = substr($category, 0, strlen($category) - 1) . "_id";
            $product_index = array_search($product, $list_of_products);

            // Создаем массив изображений, не включая в него служебные поля типа id, на клиенте они не нужны
            $img_list = [];
            foreach (self::getImg($product["id"], $product_foreign_key_name, $category_img_table) as $k => $v) {
                if (!in_array($k, ["id", $product_foreign_key_name]) && $v) {
                    $img_list[$k] = "/static/media/" . $category . "/" . $v;
                }
            }
            $list_of_products[$product_index]["img"] = $img_list;

            // Создаем блок промо
            $list_of_products[$product_index]["promo"] = self::getPromo($product["id"], $product_foreign_key_name, $category_promo_table);

            // Только для телефонов добавляем блок спецификаций
            if ($category === "phones") {
                $spec_table = substr($category, 0, strlen($category) - 1) . "_specifications";
                $list_of_products[$product_index]["specifications"] =
                    self::getSpecifications($product["id"], $product_foreign_key_name, $spec_table);
            }
        }
        // Отдаем массив из двух полей: список продуктов, со всеми данными и блок служебной информации для категории
        return ["main" => self::getCategoryInfo($category), "data" => $list_of_products];
    }

    private static function getImg($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetch();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    // Получить общие данные по выбранной категории: ее название, alias, фоновое изображение страницы
    public static function getPromo($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetchAll();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    private static function getSpecifications($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetch();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    private static function getSlider($tablename = "slider")
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename}");
            $pdo->execute();
            return $pdo->fetchAll();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    private static function getCategoryInfo($category)
    {
        // Создаем блок служебной информации для всей категории, то есть название, alias и так далее.
        $category_query = "SELECT * FROM category WHERE category_alias='{$category}'";
        $pdo = Connect::exec()->prepare($category_query);
        $pdo->execute();
        $category_table_fields = $pdo->fetch();

        $category_info = [
            "alias" => $category_table_fields["category_alias"],
            "title" => $category_table_fields["category_title"],
            "img" => [
                "path" => $category_table_fields["img_prefix"] . "/" . $category_table_fields["category_title_img"],
                "alt" => $category_table_fields["category_title"],
            ],
        ];

        return $category_info;
    }

    public static function getOneItem($id, $category)
    {
        $category_products_table = $category . "_list";
        $category_promo_table = substr($category, 0, strlen($category) - 1) . "_promo";
        $category_img_table = substr($category, 0, strlen($category) - 1) . "_img";

        $product_query = "SELECT * FROM {$category_products_table} WHERE id={$id}";
        $pdo = Connect::exec()->prepare($product_query);
        $pdo->execute();
        $product = $pdo->fetch();

        if (empty($product)) throw new \Error("Not that product");


        $product_foreign_key_name = substr($category, 0, strlen($category) - 1) . "_id";

        $img_list = [];
        $img_slider = [];
        foreach (self::getImg($product["id"], $product_foreign_key_name, $category_img_table) as $k => $v) {
            if (!in_array($k, ["id", $product_foreign_key_name])) {
                if ($v) {
                    $img_list[$k] = "/static/media/" . $category . "/" . $v;
                    if ($k !== "md" && $k !== "sm") $img_slider[] = "/static/media/" . $category . "/" . $v;
                }
            }
        }

        $product["img"] = $img_list;
        $product["slider"] = $img_slider;

        //$product["promo"] = self::getPromo($product["id"], $product_foreign_key_name, $category_promo_table);

        $promo_list = [];
        foreach (self::getPromo($product["id"], $product_foreign_key_name, $category_promo_table) as $k => $v) {
            $promo = [];
            foreach ($v as $k2 => $v2) {
                if (!in_array($k2, ["id", "phone_id"])) {
                    if ($k2 === "img_path") {
                        $promo[$k2] = "/static/media/" . $category . "/" . $v2;
                    } else {
                        $promo[$k2] = $v2;
                    }
                }
            }
            $promo_list[] = $promo;
        }


        $product["promo"] = $promo_list;

        if ($category === "phones") {
            $spec_table = substr($category, 0, strlen($category) - 1) . "_specifications";
            $product["specifications"] =
                self::getSpecifications($product["id"], $product_foreign_key_name, $spec_table);
        }

        return ["main" => self::getCategoryInfo($category), "data" => $product];
    }

    private static function getTableColumnsCount($tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT COUNT(*) FROM {$tablename}");
            $pdo->execute();
            return $pdo->fetchColumn();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }


    public static function getLazyLoadItems($category, $index)
    {
        if ($index === "-1") {
            return [
                "lastIndex" => -1,
                "load" => []
            ];
        }

        $base_index = 8;
        $cnt_Of_rows = 8;
        $last_index = $index === 0 ? $base_index : $index + $base_index;


        if ($last_index + $cnt_Of_rows >= self::getTableColumnsCount($category . "_list")) {
            return [
                "lastIndex" => -1,
                "load" => self::getCategoryItems($category, $cnt_Of_rows, $last_index)["data"]
            ];
        } else {
            return [
                "lastIndex" => $last_index,
                "load" => self::getCategoryItems($category, $cnt_Of_rows, $last_index)["data"]
            ];
        }
    }
}
