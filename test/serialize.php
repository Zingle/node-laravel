<?php

$input = file_get_contents("php://stdin");
$data = json_decode($input);
echo serialize($data) . "\n";
