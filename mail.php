<?php
<<<<<<< HEAD
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $subject = $_POST['subject'];
        $mailFrom = $_POST['email'];
        $message = $_POST['message'];

        $mailTo = "liam_meade_animator@yahoo.com";
        $headers = "From: ".$mailFrom;
        $txt = "You have received an email from ".$name.".\n\n".$message;

        if (mail($mailTo, $subject, $txt, $headers)) {
            header("Location: mail.php?mailSend");
        } else {
            echo "Error sending email! Please check your SMTP settings in php.ini.";
            error_log("Error sending email using mail() function. Check your PHP configuration for SMTP settings.", 0);
        }
=======
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $mailheader = "From: " . $name . " <" . $email . ">\r\n";
    $recipient = "liam_meade_animator@yahoo.com";

    if (mail($recipient, $subject, $message, $mailheader)) {
        echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <ul class="list-header">
                    <li><a href="./index.html">HOME</a></li>
                    <li><a href="./music.html">MUSIC</a></li>
                    <li><a href="./about.html">ABOUT</a></li>
                </ul>
            </header>
            <h2>Thank you for contacting us. We will get back to you shortly.</h2>
            <p>Go back to the <a href="index.html">homepage</a>.</p>
        </body>
        </html>';
    } else {
        echo "Error sending email!";
>>>>>>> 86b251299941c2422e9e8673d7d8862709de3e83
    }
} else {
    echo "Invalid request method.";
}
?>
