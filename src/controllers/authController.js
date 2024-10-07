import * as authService from '../services/authService.js';

// Registro de usuario
export const register = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen

  try {
    await authService.registerUser(email, password, firstName, lastName, phone, profileImage);
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Verificar el correo electrónico
export const verify = async (req, res) => {
  const { token } = req.params;
  try {
    await authService.verifyUser(token);
    res.json({ message: 'Cuenta verificada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Token de verificación inválido o expirado' });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Desestructurar el objeto retornado por loginUser
    const { token, profileImage, firstName } = await authService.loginUser(email, password);
    
    // Retornar los datos correctamente
    res.json({ token, email, profileImage, firstName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};