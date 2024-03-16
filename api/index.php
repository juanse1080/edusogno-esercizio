<?php
include_once "route/dispacher.php";
include_once "utils/exception/NotFound.php";
include_once "utils/exception/BadRequest.php";
include_once "utils/exception/Forbidden.php";

session_start();
header('Content-type: application/json');

try {
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $dispatcher = new Dispatcher($requestMethod, $requestUri);
    echo json_encode(["response" => $dispatcher->dispatch(), "status" => http_response_code()]);
    exit;
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "message" => $e->getMessage(), "status" => http_response_code()
    ]);
    exit;
} catch (\NotFoundException $e) {
    http_response_code(404);
    echo json_encode([
        "message" => $e->getMessage(), "status" => http_response_code()
    ]);
    exit;
} catch (\BadRequestException $e) {
    http_response_code(400);
    echo json_encode([
        "message" => $e->getMessage(), "status" => http_response_code()
    ]);
    exit;
} catch (\UnauthorizedException $e) {
    http_response_code(401);
    echo json_encode([
        "message" => $e->getMessage(), "status" => http_response_code()
    ]);
    exit;
} catch (\ForbiddenException $e) {
    http_response_code(403);
    echo json_encode([
        "message" => $e->getMessage(), "status" => http_response_code()
    ]);
    exit;
}
