const nodemailer = require('nodemailer');
const config = process.env;
// Set up the email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailAddress,
    pass: config.emailPassword
  }
});

// Send the verification email
const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${config.serverUrl}/verify-email?token=${token}`;
  const mailOptions = {
    from: `<${config.emailAddress}>`,
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click the following link to verify your email:</p>
           <p><a href="${verificationUrl}">${verificationUrl}</a></p>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log(`Verification email sent to ${email}`);
  });
};

export default sendVerificationEmail;