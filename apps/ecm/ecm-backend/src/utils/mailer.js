// src/utils/mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT, 
  secure: false, // false for port 587
  requireTLS: true,
  auth: {
    user: process.env.SMTP_MAIL, 
    pass: process.env.SMTP_PASSWORD, 
  },
});

const sendMail = async (email, subject, content) => {
  console.log(email,subject,content)
  
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: content,
    };

    

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = { sendMail };
