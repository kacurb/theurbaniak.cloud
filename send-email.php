<?php
/**
 * Skrypt obslugi formularza kontaktowego
 * theurbaniak.cloud
 */

// Tylko metoda POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Location: /index.html#contact');
    exit;
}

// Honeypot check (anti-spam)
if (!empty($_POST['_honey'])) {
    http_response_code(400);
    header('Location: /index.html#contact');
    exit;
}

// Pobierz i waliduj dane
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$gdpr = isset($_POST['gdpr_consent']) ? true : false;

// Walidacja
$errors = [];

if (empty($name)) {
    $errors[] = 'Imie jest wymagane';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Prawidlowy email jest wymagany';
}

if (empty($message)) {
    $errors[] = 'Wiadomosc jest wymagana';
}

if (!$gdpr) {
    $errors[] = 'Zgoda RODO jest wymagana';
}

// Jesli sa bledy - przekieruj z powrotem
if (!empty($errors)) {
    header('Location: /index.html?error=1#contact');
    exit;
}

// Sanityzacja danych
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Konfiguracja emaila
$to = 'theurbaniak@gmail.com';
$subject = 'Nowa wiadomosc ze strony theurbaniak.cloud';

// Tresc wiadomosci
$body = "Nowa wiadomosc z formularza kontaktowego:\n\n";
$body .= "Imie i nazwisko: $name\n";
$body .= "Email: $email\n";
$body .= "Zgoda RODO: Tak\n\n";
$body .= "Wiadomosc:\n";
$body .= "----------------------------------------\n";
$body .= $message;
$body .= "\n----------------------------------------\n\n";
$body .= "Data: " . date('Y-m-d H:i:s') . "\n";
$body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Naglowki emaila
$headers = "From: kontakt@theurbaniak.cloud\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Wyslij email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Sukces - przekieruj z komunikatem
    header('Location: /index.html?sent=1#contact');
} else {
    // Blad - przekieruj z komunikatem o bledzie
    header('Location: /index.html?error=2#contact');
}
exit;
