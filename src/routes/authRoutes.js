import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.get('/verify/:token', verify);

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso concedido a la ruta protegida' });
});



export default router;
