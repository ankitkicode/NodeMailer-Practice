var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'your.gmail.com',
      pass: 'yourPasswordHEre',
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//  Define a route to send emails
router.get('/send-email', (req, res) => {
  const to = req.query.to;
  const from = req.query.from;
  const text = req.query.text;
  const subject = req.query.subject;
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <div class="flex min-h-screen items-center justify-center">
          <div>
              <p class="text-base font-light leading-relaxed mt-0 mb-0 text-pink-800">
                  To send an HTML document in an email using Nodemailer in your Express app, you need to adjust the text or html property of the mailOptions object. Here's how you can modify the previous example to send an HTML document:
              </p>
              <img height="100px" width="300px" src="https://images.unsplash.com/photo-1709833226085-bef3dc6c7e9e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="">
              <footer class="block text-pink-600">
              - Someone famous in <cite>Source Title</cite>
              </footer>
              
          </div>
      </div>
  </body>
  </html>`;


    // Email content
    const mailOptions = {
        to,
        subject,
        text,
        html,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error occurred while sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully.');
        }
    });
});


module.exports = router;
