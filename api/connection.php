<?php
class Connection
{
    private string $db_username = "root";
    private string $db_password = "secret";
    private string $db_name = "edusogno-esercizio";
    private string $db_host = "localhost:3306";

    private function dbConnection()
    {
        $data_source_name = "mysql:host=" . $this->db_host . ";dbname=" . $this->db_name;

        try {
            $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

            $pdo_connection = new PDO($data_source_name, $this->db_username, $this->db_password, $options);
        } catch (PDOException $exception) {
            $_SESSION["no_db_connection"] = $exception->getMessage();
            die($exception->getMessage());
        }

        return $pdo_connection;
    }


    protected function dbConnect(): ?PDO
    {
        return $this->dbConnection();
    }

    static function generateSet(string $_template, array $_data, string $_character = "||"): string
    {
        $statement = "";
        foreach ($_data as $key => $key) {
            $statement .= " " . $key . " = :" . $key . ",";
        }
        $statement = substr($statement, 0, -1);

        return str_replace($_character, $statement, $_template);
    }
}
