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

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño del archivo a 5MB
});

// Exportar el middleware para usarlo en las rutas
export default upload;
