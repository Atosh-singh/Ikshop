const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.gmail.com for Gmail
    port: process.env.SMTP_PORT, // Usually 587 for Gmail
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL, // Your Gmail address
        pass: process.env.SMTP_PASSWORD, // Your App Password (not your Gmail password)
    },
});

// Sending email function
const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL,  // Sender's email address
            to: email, // Recipient's email address
            subject: subject, // Email subject
            html: content, // HTML email content
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
            } else {
                console.log("Email sent: %s", info.messageId);
            }
        });
    } catch (error) {
        console.log("Error in sendMail:", error.message);
    }
};

module.exports = { sendMail };
