<?php
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
    }
} else {
    echo "Invalid request method.";
}
?>
