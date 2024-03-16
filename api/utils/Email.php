<?php

class Email
{
    public static function sendEmail(
        string $_to,
        string $_subject,
        string $_message
    ) {
        mail($_to, $_subject, $_message);
    }
}
