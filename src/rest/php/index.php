<?php


//sleep(8);
//header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
//die();

require_once "./php/functions/functions.php";
require_once "./php/db/RequestHandler.php";
use php\db\RequestHandler as Request;

//  /src/rest/php/index.php/api/category/phones




// перехват отправки данных формы
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    //print json_encode($_POST);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    preg_match("/api\/(?P<path>[\w\d\/]+)$/", trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL)), $uri);
    try {
        if (preg_match("/^index$/", $uri["path"])) {
            print json_encode(Request::getIndexPageData());

        } elseif (preg_match("/^category\/(?P<category>[a-z]+)$/", $uri["path"], $matches)) {
            print json_encode(Request::getCategoryItems($matches["category"]));

        } elseif (preg_match("/^product\/(?P<category>[a-z]+)\/(?P<id>[0-9]+)$/", $uri["path"], $matches)) {
            print json_encode(Request::getOneItem($matches["id"], $matches["category"]));

        } elseif (preg_match("/^lazy\/(?P<category>[a-z]+)\/(?P<index>[0-9-]+)$/", $uri["path"], $matches)) {
            print json_encode(Request::getLazyLoadItems($matches["category"], $matches["index"]));

        } elseif (preg_match("/^token$/", $uri["path"])) {
            //sleep(12);
            //http_response_code(404);
            //die();

            //throw new Error("Code 401");
            //print json_encode("from token");
        } else {
            throw new Error("Page with this parametres not exist");
        }
    } catch (\Error $e) {
        /**
         * Чтобы ошибки перехватывались, отправляй то, что поймет axios как failRequest,
         * а это - http_response_code с чем-то на 40*
         */
        print http_response_code(400);
    }
    catch (\Exception $e) {
        print http_response_code(400);
    }
}

