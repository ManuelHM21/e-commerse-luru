import * as authService from '../services/authService.js';

// Registro de usuario
export const register = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  try {
    await authService.registerUser(email, password, firstName, lastName, phone);
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: 'El correo ya está en uso' });
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
    res.status(400).json({ error: 'Token de verificación inválido' });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginUser(email, password);
    res.json({ token , email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


