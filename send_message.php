<?php
// Подключаем файл с настройками
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = $_POST['message']; // Получаем сообщение из формы
    
    // Формируем URL для запроса к Telegram API
    $url = "https://api.telegram.org/bot$token/sendMessage";
    $data = [
        'chat_id' => $chat_id, // ID чата
        'text' => $message // Сообщение
    ];
    
    // Инициализация cURL для отправки данных
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Выполнение запроса
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response) {
        echo "Сообщение отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>
