<?php
$json_string = file_get_contents('tasks.json');

$list = json_decode($json_string, true);

if (isset($_POST['text']) && isset($_POST['description'])) {
    $new_item = [
        'text' => $_POST['text'],
        'descriptiopn' => $_POST['descriptiopn'],
        'done' => false
    ];

    $list[] = $new_item;

    file_put_contents('tasks.json', json_encode($list));
}

if (isset($_POST['indexToToggle'])) {
    $indexToToggle = $_post['indexToToggle'];
    $list[$indexToToggle]['done'] = !list[$indexToToggle];
}

header('Content-Type: applicationm/json');

echo json_encode($list);
