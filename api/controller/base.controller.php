<?php
class BaseController
{
    protected function getQueryStringParams()
    {
        return parse_str($_SERVER['QUERY_STRING'], $query);
    }

    protected function getBody()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    protected function statusCode($code = 200)
    {
        http_response_code($code);
    }

    protected function auth($_attr = false)
    {
        if (!$_attr) {
            return $_SESSION['auth'];
        }

        return $_SESSION['auth'][$_attr];
    }

    protected function setAuth($_user)
    {
        if (array_key_exists("password", $_user)) {
            unset($_user["password"]);
        }
        $_SESSION['auth'] = $_user;
    }
}
