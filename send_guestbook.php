<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST["name"]);
    $message = htmlspecialchars($_POST["message"]);

    // Формируем сообщение
    $guestbookMessage = "📝 Новое сообщение в гостевой книге!\n\nИмя: $name\nСообщение: $message";

    // URL для запроса к Telegram API
    $url = "https://api.telegram.org/bot$token/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $guestbookMessage
    ];

    // Отправляем запрос через cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Получаем ответ
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        // Если произошла ошибка cURL
        $errorMessage = curl_error($ch);
        echo json_encode(["status" => "error", "message" => "Ошибка при отправке сообщения: $errorMessage"]);
    } else {
        // Проверяем, есть ли ошибка от Telegram API
        $responseData = json_decode($response, true);
        if (isset($responseData['ok']) && $responseData['ok'] === true) {
            echo json_encode(["status" => "success", "message" => "Сообщение отправлено!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Ошибка при отправке сообщения в Telegram."]);
        }
    }

    curl_close($ch);
}
?>
