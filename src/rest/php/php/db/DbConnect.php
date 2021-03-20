<?php

namespace php\db;

class DbConnect
{
    private static $host = "localhost";
    private static $db = "oneplus";
    private static $user = "root";
    private static $psw = "root";
    private static $charset = "utf8";

    private static $pdo;

    private function __construct()
    {
    }

    public static function exec()
    {
        if (empty(self::$pdo)) {
            $opt = [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES => false,

            ];
            try {
                self::$pdo = new \PDO("mysql:host="
                    . self::$host . ";dbname="
                    . self::$db . ";" . "charset="
                    . self::$charset, self::$user, self::$psw, $opt);

            } catch (\Throwable $e) {
                var_dump("Error in PDO: " . $e->getMessage());
            }
        }
        return self::$pdo;
    }

    private function __clone()
    {
    }
}
