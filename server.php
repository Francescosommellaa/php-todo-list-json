<?php
$json_string = file_get_contents('tasks.json');

$list = json_decode($json_string, true);

if (isset($_POST['text']) && isset($_POST['description'])) {
    $new_item = [
        'text'
    ]
}

header('Content-Type: applicationm/json');

echo json_encode($list);
