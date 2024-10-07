import bcrypt from 'bcryptjs';
import prisma from '../config/prismaClient.js';
import generateToken from '../utils/generateToken.js';
import sendVerificationEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// Registro de usuario con token de verificación
export const registerUser = async (email, password, firstName, lastName, phone, profileImage) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario en la base de datos (sin verificar)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,  
      firstName,
      lastName,
      phone,
      profileImage,
      isVerified: false
    },
  });

  // Generar token de verificación
  const verificationToken = generateToken(user.id, '1d'); // Válido por 1 día

  // Enviar correo de verificación
  await sendVerificationEmail(email, verificationToken);
};


// Verificar el token del correo electrónico
export const verifyUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Actualizar el usuario como verificado
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });
    
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};


// Login de usuario
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log(user);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar si el usuario ha confirmado su cuenta
  if (!user.isVerified) {
    throw new Error('Por favor, verifica tu correo electrónico para activar tu cuenta');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = generateToken(user.id);
  const profileImage = user.profileImage;
  const firstName = user.firstName;

  return {
    token,
    profileImage,
    firstName,
  };
};