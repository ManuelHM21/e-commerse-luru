import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Función para generar un token JWT
const generateToken = (userId, expiresIn = '1h') => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn });
};

export default generateToken;
