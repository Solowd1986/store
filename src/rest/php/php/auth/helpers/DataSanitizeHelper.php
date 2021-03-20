<?php

namespace php\auth\helpers;

class DataSanitizeHelper
{
    public static function run($data)
    {
        $sanitizeData = [];
        foreach ($data as $key => $value) {
            if ($key === "email" || strpos($value, "@")) {
                $sanitizeData[DataSanitizeHelper::cln($key)] = DataSanitizeHelper::cln($value, true);
            } else {
                $sanitizeData[DataSanitizeHelper::cln($key)] = DataSanitizeHelper::cln($value);
            }
        }
        return $sanitizeData;
    }

    private static function cln($str, $email = false)
    {
        return preg_replace("/[^\w@.+]/i", "", trim(filter_var($str, !$email ? FILTER_SANITIZE_STRING : FILTER_SANITIZE_EMAIL)));
    }

    private static function check($checkingData)
    {

    }
}