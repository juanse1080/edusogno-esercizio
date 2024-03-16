<?php

include_once "controller/base.controller.php";
include_once "model/Event.php";
include_once "utils/exception/NotFound.php";
include_once "utils/exception/BadRequest.php";


class EventController extends BaseController
{
    public function addUsers(array $params)
    {
        $body = $this->getBody();
        $_eventModel = new Event();
        $event = $this->getAndValidateEvent($params['id']);
        [$eventId] = $_eventModel->addUsers($body["user_ids"], $params['id']);

        if (!$eventId) {
            throw new BadRequestException('Bad request with body: ' . json_encode($body));
        }

        return $event;
    }

    public function index()
    {
        $_eventModel = new Event();
        return $_eventModel->getAll()[0];
    }

    public function getAndValidateEvent($_id)
    {
        $_eventModel = new Event();
        [$events, $is_success] = $_eventModel->getById($_id);

        if (!$is_success || empty($events)) {
            throw new NotFoundException('Not found event with id: ' . $_id);
        }

        return $events[0];
    }

    public function find(array $params)
    {
        return $this->getAndValidateEvent($params['id']);
    }

    public function create()
    {
        $body = $this->getBody();
        $_eventModel = new Event();
        [$eventId] = $_eventModel->create($body);

        if (!$eventId) {
            throw new BadRequestException('Bad request with body: ' . json_encode($body));
        }

        $this->statusCode(201);
        return $this->getAndValidateEvent($eventId);
    }

    public function update(array $params)
    {
        $this->getAndValidateEvent($params['id']);

        $body = $this->getBody();
        $_eventModel = new Event();
        [$eventId] = $_eventModel->update($params['id'], $body);

        if (!$eventId) {
            throw new BadRequestException('Bad request with body: ' . json_encode($body));
        }

        return $this->getAndValidateEvent($eventId);
    }

    public function delete(array $params)
    {
        $event = $this->getAndValidateEvent($params['id']);

        $_eventModel = new Event();
        $_eventModel->delete($params['id']);
        return $event;
    }
}
