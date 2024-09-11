import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verify);

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso concedido a la ruta protegida' });
});



export default router;
