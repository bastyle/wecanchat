const nodemailer = require('nodemailer');
require('dotenv').config()

class EmailSender{
    constructor(){
        console.log("emmail sender constructor.");
        // Create a transporter with your email service provider details
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:  process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD 
            }
        });    
    }

    sendWelcomeEmail(userEmail, userName) {
        const mailOptions = {
          from: process.env.MAIL_USER,
          to: userEmail,
          subject: process.env.MAIL_WELCOME_SUBJECT,
          text: `Dear ${userName},\n\nWelcome to WeCanChat! We're thrilled to have you as part of our community.\n\nYour account has been successfully created, and you're now ready to explore all the exciting features we have to offer.\n\nIf you have any questions or need assistance, feel free to reach out to  ${process.env.MAIL_USER}\n\nBest regards,\nThe WeCanChat Team`
        };
    
        // Send the email
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending welcome email:', error);
          } else {
            console.log('Welcome email sent:', info.response);
          }
        });
      }
}

module.exports = EmailSender;