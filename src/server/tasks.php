<?php
$filename = 'tasks.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $tasks = json_decode(file_get_contents($filename), true);
    if (!$tasks) {
        $tasks = [];
    }

    if (isset($data['action'])) {
        if ($data['action'] === 'add' && !empty(trim($data['text']))) {
            $tasks[] = ['text' => $data['text'], 'completed' => false];
        } elseif ($data['action'] === 'remove') {
            array_splice($tasks, $data['index'], 1);
        } elseif ($data['action'] === 'toggle') {
            $tasks[$data['index']]['completed'] = !$tasks[$data['index']]['completed'];
        }
    }

    file_put_contents($filename, json_encode($tasks));
    echo json_encode($tasks);
} else {
    $tasks = json_decode(file_get_contents($filename), true);
    if (!$tasks) {
        $tasks = [];
    }
    echo json_encode($tasks);
}
