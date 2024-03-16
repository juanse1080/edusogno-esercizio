<?php
include_once "connection.php";

class User extends Connection
{
    public function getEventsByUserId($_user_id)
    {
        $statement = "
            SELECT
                event.*,
                user_event.user_id
            FROM
                event
            LEFT JOIN user_event
            ON event.id = user_event.event_id
            WHERE user_event.user_id = :id
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $statement->bindParam(":id", $_user_id, PDO::PARAM_INT);
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

    public function getAll(): array
    {
        $statement = "
            SELECT
                *
            FROM
                user
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $isSuccess = $statement->execute();
        return [$statement->fetchAll(\PDO::FETCH_ASSOC), $isSuccess];
    }

    public function getById(int $_id)
    {
        $statement = "
            SELECT
                *
            FROM
                user
            WHERE id = :id
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $statement->bindParam(":id", $_id, PDO::PARAM_INT);
        $isSuccess = $statement->execute();

        return [$statement->fetchAll(PDO::FETCH_ASSOC), $isSuccess];
    }

    public function getByEmail(string $_email)
    {
        $statement = "
            SELECT
                *
            FROM
                user
            WHERE email = :email
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $statement->bindParam(":email", $_email, PDO::PARAM_STR);
        $isSuccess = $statement->execute();

        return [$statement->fetchAll(PDO::FETCH_ASSOC), $isSuccess];
    }

    public function getByCode(string $_code)
    {
        $statement = "
            SELECT
                *
            FROM
                user
            WHERE temp_reset_password_code = :temp_reset_password_code
        ";

        $statement = $this->dbConnect()->prepare($statement);
        $statement->bindParam(":temp_reset_password_code", $_code, PDO::PARAM_STR);
        $isSuccess = $statement->execute();

        return [$statement->fetchAll(PDO::FETCH_ASSOC), $isSuccess];
    }

    public function create(array $_event)
    {
        $statement = "
            INSERT INTO user
                (first_name, last_name, email, password)
            VALUES
                (:first_name, :last_name, :email, :password);
        ";

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $isSuccess = $statement->execute($_event);

        return [$connect->lastInsertId(), $isSuccess];
    }

    public function update(int $_id, array $_event)
    {
        $statement = Event::generateSet("UPDATE user SET || WHERE id = :id", $_event);
        $_event["id"] = $_id;

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $isSuccess = $statement->execute($_event);

        return [$_id, $isSuccess];
    }

    public function delete(int $_id)
    {
        $statement = "
            DELETE FROM user
            WHERE id = :id;
        ";

        $connect = $this->dbConnect();
        $statement = $connect->prepare($statement);
        $statement->bindParam(":id", $_id, PDO::PARAM_INT);
        $isSuccess = $statement->execute();

        return [$_id, $isSuccess];
    }
}
