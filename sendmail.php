<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->IsHTML(true);

//от кого письмо
$mail->setFrom('byebyelady@ukr.net');

$mail->addAddress('mediccenter71@gmail.com');

$mail->Subject = 'Фігня';



//Letter

$body = '<h1>nhfkzkzzkzk</h1>';


$body.='<p><strong>name</strong> '.$_POST['name'].'</p>';
$body.='<p><strong>Email</strong> '.$_POST['email'].'</p>';


$body.='<p><strong>Message</strong> '.$_POST['message'].'</p>';


$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Error';
    } else {
        $message = 'Данные отправлены!';
    }
$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>