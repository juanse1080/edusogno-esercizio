<?php
class Route
{
    public static array $routes = array();

    public static function addRoute($method, $route, $action)
    {
        self::$routes[$method][$route] = $action;
    }

    public static function get($route, $action)
    {
        self::addRoute('GET', $route, $action);
    }

    public static function post($route, $action)
    {
        self::addRoute('POST', $route, $action);
    }

    public static function patch($route, $action)
    {
        self::addRoute('PATCH', $route, $action);
    }

    public static function put($route, $action)
    {
        self::addRoute('PUT', $route, $action);
    }

    public static function delete($route, $action)
    {
        self::addRoute('DELETE', $route, $action);
    }
}
