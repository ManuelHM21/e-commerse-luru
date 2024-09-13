import transporter from '../config/nodemailerConfig.js';

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verifica tu cuenta',
    text: `Por favor, verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
