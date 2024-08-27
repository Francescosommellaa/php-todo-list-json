<?php
$json_string = file_get_contents(tasks . json);

$list = json_decode($json_string, true);

header('Content-Type:');

echo json_encode($list);
