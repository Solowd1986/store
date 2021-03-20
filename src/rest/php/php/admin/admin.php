<?php


/**
 * РЕАЛИЗАЦИЯ АДМИНКИ С ПОДПИСАННЫМИ ЗАПРОСАМИ И АВТОРИЗАЦИЕЙ
 */

/*
 * Пути для звпуска от папки dist
 */
//require_once realpath('vendor/autoload.php');

//require_once "./php/functions/functions.php";


/*
 * Пути для работы без папки dist, просто запуск скриптов от data.php
 */
//require_once realpath('../../vendor/autoload.php');
//require_once realpath('php/functions/functions.php');


/*
 * Пути для запуска скрипта самостоятельно, но нужно прописать новые пути автозагрузки
 * и вызвать php composer.phar dump-autoload
 * Пути для работы отдельного модуля:
 *  "php\\db\\": "src/js/php/db",
 *  "php\\auth\\": "src/js/php/auth",
 *  "php\\auth\\helpers\\": "src/js/php/auth/helpers"
 *
 * Пути для работы модуля от папки dist:
 *  "php\\db\\": "php/db",
 *  "php\\auth\\": "php/auth",
 *  "php\\auth\\helpers\\": "php/auth/helpers"
 *
 *  Вызови - php composer.phar dump-autoload + npm run prod-reload
 */


require_once "./php/db/DbConnect.php";
require_once "./php/db/DbQueryCore.php";
require_once "./php/db/UsersModel.php";
require_once "./php/db/AdminModel.php";


use \php\auth\helpers\UserToken as UserToken;
use \php\auth\UserRegistration as UserRegistration;
use \php\auth\helpers\DataSanitizeHelper as DataSanitizeHelper;
use \php\db\DbQueryCore;
use php\db\RequestHandler;


$passedData = [
    "login" => "bob",
    "email" => "lo1go@yaw.ru",
    "psw" => 1234,
];


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Сюда обращается метод submitAddRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Add") {
        $table = $_POST['table'];
        DbQueryCore::insert($table, $_POST);
        print json_encode($_POST);
        exit();
    }
    //Сюда обращается метод submitEditRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Edit") {
        $id = $_POST['id'];
        $table = $_POST['table'];
        DbQueryCore::update($id, $table, $_POST);
        //print json_encode($_POST);
        exit();
    }
    //Сюда обращается метод submitDeleteRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Delete") {
        $id = $_POST['id'];
        $table = $_POST['table'];
        DbQueryCore::delete($table, $id);
        print json_encode($_POST);
        exit();
    }


    if (isset(getallheaders()["Token-Status"])) {
        $token = $_POST["token"];

        if (UserToken::verifyUserData($token)) {
            if (UserToken::hasTokenExpired($token)) {
                print UserToken::setTokenParams($token, ["has-expired" => true]);
            } else {
                print UserToken::packedData(["allowed" => true, "header" => getallheaders()["Token-Status"]]);
                //print UserToken::packedData(["allowed" => true]);
            }
        } else {
            print UserToken::packedData(["allowed" => false]);
            //var_dump_pre("Token wrong");
        }
        exit();

    }


    if (isset(getallheaders()["Data-Type"])) {

        $sanitizedPost = DataSanitizeHelper::run($_POST);

        $tokenSuccess = [
            "result" => true,
            "tokenName" => "auth",
            "uid" => 34467,
            "allowed" => true,
            "path" => "/",
            "tokenId" => "sdf657gfhytutyutyu",
            "name" => "Stan",
            "role" => "user"
        ];

        $expired = [
            "has-expired" => false,
            "expiration-date" => (time() + 3600) * 1000,
            "max-age" => 3600
        ];

        //print UserToken::packedData($tokenData);


        $responce["errors"] = [];
        if (!empty(UserRegistration::checkUserRegistrationFields(DataSanitizeHelper::run($sanitizedPost)))) {
            $responce["errors"]["registrationFormErrors"] = UserRegistration::checkUserRegistrationFields(DataSanitizeHelper::run($sanitizedPost));
        }

        if (empty($responce["errors"])) {
            print UserToken::packedData(array_merge($sanitizedPost, $tokenSuccess, $expired));
        } else {
            print UserToken::packedData(array_merge($sanitizedPost, $tokenSuccess, $expired, $responce["errors"]));
        }


        //print json_encode($responce);
    }

    if (isset($_POST["auth-submit"])) {
        print "post from auth-submit";
    }

    if (empty($_POST)) {
        print "empty arr\n";
    }
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {

    //Сюда обращается метод showListOfTables из класса AdminInitPanel
    if (array_key_exists('tables', $_GET)) {
        $res = DbQueryCore::getAllTablesNames();
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод addRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Add-Get-Fields") {
        $res = DbQueryCore::getFieldNamesOfOneTable($_GET["table"]);
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод editItem из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Edit-Get-Item") {
        $res = DbQueryCore::getItem($_GET["table"], $_GET["id"]);
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод renderTableRecords из класса AdminInitPanel
    if (array_key_exists('table', $_GET)) {
        $res = DbQueryCore::getAll($_GET["table"]);
        print json_encode($res);
        exit();
    }
}


if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (array_key_exists('id', $_GET)) {
        print false;
        //print "data with id = " . $_GET['id'] . " deleted";
    }
}
