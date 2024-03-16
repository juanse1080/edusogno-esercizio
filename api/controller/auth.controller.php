<?php

include_once "controller/base.controller.php";
include_once "model/User.php";
include_once "model/Event.php";
include_once "utils/exception/NotFound.php";
include_once "utils/exception/BadRequest.php";
include_once "utils/exception/Unauthorized.php";
include_once "utils/exception/Forbidden.php";
include_once "utils/Hash.php";
include_once "utils/Email.php";

class AuthController extends BaseController
{
    public static function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    private function getAndValidateUser(string $_email)
    {
        $_userModel = new User();
        [$users, $is_success] = $_userModel->getByEmail($_email);

        if (!$is_success || empty($users)) {
            throw new NotFoundException('Not found user with email: ' . $_email);
        }

        return $users[0];
    }

    private function getAndValidateEvent($_id)
    {
        $_eventModel = new Event();
        [$events, $is_success] = $_eventModel->getById($_id);

        if (!$is_success || empty($events)) {
            throw new NotFoundException('Not found event with id: ' . $_id);
        }

        return $events[0];
    }

    public function joinEvent(array $params)
    {
        $this->onlyAuth();
        $_eventModel = new Event();
        $event = $this->getAndValidateEvent($params['id']);
        [$eventId] = $_eventModel->addUsers([$this->auth("id")], $params['id']);

        if (!$eventId) {
            throw new BadRequestException('Bad request');
        }

        return $event;
    }

    public function findMyEvents()
    {
        $this->onlyAuth();
        $_userModel = new User();
        return $_userModel->getEventsByUserId($this->auth("id"))[0];
    }

    public function register()
    {
        $body = $this->getBody();
        $_userModel = new User();
        [$users] = $_userModel->getByEmail($body['email']);

        if (!empty($users)) {
            throw new BadRequestException('User with email ' . $body['email'] . ' already exist');
        }

        $body["password"] = Hash::hash($body["password"]);
        [$userId] = $_userModel->create($body);

        if (!$userId) {
            throw new BadRequestException('Bad request with body: ' . json_encode($body));
        }

        $user = $this->getAndValidateUser($body['email']);

        Email::sendEmail($user["email"], "Welcome", "Welcome to Edusogno");
        $this->statusCode(201);
        $this->setAuth($user);
        return $this->auth();
    }

    public function login()
    {
        $body = $this->getBody();
        $user = $this->getAndValidateUser($body['email']);

        if (!Hash::verify($body["password"], $user["password"])) {
            throw new UnauthorizedException('Unauthorized');
        }

        $this->setAuth($user);
        return $this->auth();
    }

    public function updateProfile()
    {
        $this->onlyAuth();
        $body = $this->getBody();
        $_userModel = new User();

        $_userModel->update($this->auth("id"), $body);
        $user = $this->getAndValidateUser($this->auth("email"));

        $this->setAuth($user);
        return $this->auth();
    }

    public function changePassword()
    {
        $this->onlyAuth();
        $body = $this->getBody();
        $_userModel = new User();
        $user = $this->getAndValidateUser($this->auth("email"));

        if (!Hash::verify($body["password"], $user["password"])) {
            throw new UnauthorizedException('Unauthorized');
        }

        $_userModel->update($this->auth("id"), ["password" => Hash::hash($body["new_password"])]);

        return ["message" => "ok"];
    }

    public function forgotPassword()
    {
        $body = $this->getBody();
        $_userModel = new User();
        $user = $this->getAndValidateUser($body["email"]);

        $code = AuthController::generateRandomString();

        $_userModel->update($user["id"], ["temp_reset_password_code" => $code]);

        Email::sendEmail(
            $user["email"],
            "Restore your password",
            "Enter this code " . $code . "for restore your password"
        );

        return ["message" => "ok"];
    }

    public function resetPassword()
    {
        $body = $this->getBody();
        $_userModel = new User();

        [$user, $is_success] = $_userModel->getByCode($body["temp_reset_password_code"]);

        if (!$is_success || empty($user) || count($user) > 1) {
            throw new NotFoundException('Not found user with code: ' . $body["temp_reset_password_code"]);
        }

        $_userModel->update($user[0]["id"], [
            "password" => Hash::hash($body["new_password"]), "temp_reset_password_code" => null
        ]);

        return ["message" => "ok"];
    }

    public function logout()
    {
        $this->onlyAuth();
        session_destroy();
        return ["message" => "logout"];
    }

    public function me()
    {
        $this->onlyAuth();
        return $this->auth();
    }
}
