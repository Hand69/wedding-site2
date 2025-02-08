<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST["name"]);
    $status = htmlspecialchars($_POST["status"]);

    // Формируем сообщение
    $message = "💍 Новая заявка на свадьбу!\n\nИмя: $name\nСтатус: $status";

    // URL для запроса к Telegram API
    $url = "https://api.telegram.org/bot$token/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $message
    ];

    // Отправляем запрос через cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Получаем ответ
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response) {
        echo "Сообщение отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>
