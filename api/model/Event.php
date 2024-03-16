<?php
include_once "connection.php";

class Event extends Connection
{
    public function getAll(): array
    {
        $statement = "
            SELECT
                event.*,
                user_event.user_id
            FROM
                event
            LEFT JOIN user_event
            ON event.id = user_event.event_id
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $isSuccess = $statement->execute();
        $response = [];
        foreach ($statement->fetchAll(\PDO::FETCH_ASSOC) as $value) {
            if (array_key_exists($value["id"], $response)) {
                array_push($response[$value["id"]]["users"], $value["user_id"]);
            } else {
                $response[$value["id"]] = $value;
                $response[$value["id"]]["users"] = [$value["user_id"]];
            }
        }
        return [array_values($response), $isSuccess];
    }

    public function getById($_id)
    {
        $statement = "
            SELECT
                event.*,
                user_event.user_id
            FROM
                event
            LEFT JOIN user_event
            ON event.id = user_event.event_id
                WHERE event.id = :id
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $statement->bindParam(":id", $_id, PDO::PARAM_INT);
        $isSuccess = $statement->execute();
        $response = [];
        foreach ($statement->fetchAll(\PDO::FETCH_ASSOC) as $value) {
            if (array_key_exists($value["id"], $response)) {
                array_push($response[$value["id"]]["users"], $value["user_id"]);
            } else {
                $response[$value["id"]] = $value;
                $response[$value["id"]]["users"] = [];
            }
        }
        return [array_values($response), $isSuccess];
    }

    public function create(array $_event)
    {
        $statement = "
            INSERT INTO event
                (title, description, event_date)
            VALUES
                (:title, :description, :event_date);
        ";

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $isSuccess = $statement->execute($_event);
        $lastId = $connect->lastInsertId();

        return [$lastId, $isSuccess];
    }

    public function addUsers(array $_user_ids, int $_event_id)
    {
        $statement = "
            INSERT INTO user_event
                (user_id, event_id)
            VALUES
        ";

        $data = ["event_id" => $_event_id];
        foreach ($_user_ids as $key => $value) {
            $statement .= "(:user_id_" . $key . ", :event_id),";
            $data["user_id_" . $key] = $value;
        }

        $statement = substr($statement, 0, -1);

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $isSuccess = $statement->execute($data);

        return [$_event_id, $isSuccess];
    }

    public function update($_id, array $_event)
    {
        $statement = Event::generateSet("UPDATE event SET || WHERE id = :id", $_event);
        $_event["id"] = $_id;

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $isSuccess = $statement->execute($_event);

        return [$_id, $isSuccess];
    }

    public function delete($_id)
    {
        $statement = "
            DELETE FROM event
            WHERE id = :id;
        ";

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $statement->bindParam(":id", $_id, PDO::PARAM_INT);
        $isSuccess = $statement->execute();

        return [$_id, $isSuccess];
    }
}
