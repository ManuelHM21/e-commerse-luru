import transporter from '../config/nodemailerConfig.js';

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
      <section style="max-width: 640px; margin: auto; padding: 16px; background-color: #ffffff; color: #333333;">
        <header>
          <div>
            <h1 style="width: auto; height: 28px; text: 50px; font-weight: 700;">Cule titulo</h1>
          </div>
        </header>

        <main style="margin-top: 32px;">
          <h2 style="color: #4a4a4a;">Hola,</h2>

          <p style="margin-top: 8px; line-height: 1.6; color: #666666;">
            Gracias por registrarte. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:
          </p>
          
          <a href="${verificationLink}" style="
            display: inline-block;
            padding: 12px 24px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            background-color: #000000;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#1d4ed8'" onmouseout="this.style.backgroundColor='#2563eb'">
            Verificar mi cuenta
          </a>
          
          <p style="margin-top: 32px; color: #666666;">
            Gracias, <br>
            El equipo de nuestra aplicación
          </p>
        </main>

        <footer style="margin-top: 32px; color: #999999;">
          <p>
            Este correo fue enviado a <a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a>. 
            Si no solicitaste este registro, puedes ignorar este correo.
          </p>

          <p style="margin-top: 8px;">© ${new Date().getFullYear()} Nuestra Aplicación. Todos los derechos reservados.</p>
        </footer>
      </section>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
