<?php

include_once "controller/base.controller.php";
include_once "model/User.php";
include_once "utils/exception/NotFound.php";
include_once "utils/exception/BadRequest.php";
include_once "utils/Hash.php";

class UserController extends BaseController
{
    public function index()
    {
        $this->onlyAdmin();
        $_userModel = new User();
        return $_userModel->getAll()[0];
    }

    private function getAndValidateUser($_id)
    {
        $_userModel = new User();
        [$users, $is_success] = $_userModel->getById($_id);

        if (!$is_success || empty($users)) {
            throw new NotFoundException('Not found user with id: ' . $_id);
        }

        return $users[0];
    }

    public function find(array $params)
    {
        $this->onlyAdmin();
        return $this->getAndValidateUser($params['id']);
    }

    public function create()
    {
        $this->onlyAdmin();
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

        $this->statusCode(201);
        return $this->getAndValidateUser($userId);
    }

    public function update(array $params)
    {
        $this->onlyAdmin();
        $this->getAndValidateUser($params['id']);

        $body = $this->getBody();
        $_userModel = new User();
        [$userId] = $_userModel->update($params['id'], $body);

        if (!$userId) {
            throw new BadRequestException('Bad request with body: ' . json_encode($body));
        }

        return $this->getAndValidateUser($userId);
    }

    public function delete(array $params)
    {
        $this->onlyAdmin();
        $user = $this->getAndValidateUser($params['id']);

        $_userModel = new User();
        $_userModel->delete($params['id']);
        return $user;
    }
}
