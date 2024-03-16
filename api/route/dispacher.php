<?php
include_once "route/route.php";
include_once "route/index.php";
include_once "controller/user.controller.php";
include_once "controller/event.controller.php";
include_once "controller/auth.controller.php";

class Dispatcher
{
    private string $requestUri;
    private string $requestMethod;

    public function __construct($_requestMethod, $_requestUri)
    {
        $this->requestMethod = $_requestMethod;
        $this->requestUri = $_requestUri;
    }

    public function dispatch()
    {
        $currentResources = explode('/', $this->requestUri);
        array_splice($currentResources, 0, 1);

        foreach (Route::$routes[$this->requestMethod] as $route => $action) {
            if ($route === $this->requestUri) {
                return $this->executeAction($action);
            }

            $resources = explode('/', $route);
            array_splice($resources, 0, 1);

            $pattern = '/^\{[^\{\}]*\}$/';
            $matches = preg_grep($pattern, $resources);
            $path = implode('/', $resources);

            $pathObj = [];
            $currentResourcesToReplace = $currentResources;
            foreach ($matches as $idx => $var) {
                if (array_key_exists($idx, $currentResourcesToReplace)) {
                    $key = str_replace(["{", "}"], "", $var);
                    $pathObj[$key] = $currentResourcesToReplace[$idx];
                    $currentResourcesToReplace[$idx] = $var;
                }
            }

            $currentPath = implode('/', $currentResourcesToReplace);

            if ($currentPath === $path) {
                return $this->executeAction($action, $pathObj);
            }
        }

        http_response_code(404);
    }

    private function executeAction($action, $path = null)
    {
        if (is_callable($action)) {
            return $action($path);
        }

        list($controller, $method) = explode('@', $action);

        $controller = new $controller;
        return $controller->$method($path);
    }
}
