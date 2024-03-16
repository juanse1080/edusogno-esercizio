<?php

class Hash
{
    const SECRET = 'secret';
    public static function hash(string $_password)
    {
        return hash('sha512', Hash::SECRET . $_password);
    }

    public static function verify(string $_password, string $_hash)
    {
        return $_hash == Hash::hash($_password);
    }
}
