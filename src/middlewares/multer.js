import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegúrate de que la carpeta de destino exista
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
  console.log("Carpeta 'uploads' creada.");
} else {
  console.log("La carpeta 'uploads' ya existe.");
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño: 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de archivo no permitido'), false);
    }
    cb(null, true);
  },
});

// Exportar el middleware para usarlo en las rutas
export default upload;
