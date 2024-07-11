const express = require('express');
const path = require('path');
const app = express();

// Servir los archivos estáticos desde la carpeta 'dist/sistema-ricardo-frontend/browser'
app.use(express.static(path.join(__dirname, 'dist', 'browser')));

// Ruta para servir el index.html en todas las rutas
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist',  'browser', 'index.html'));
});

// Iniciar el servidor en el puerto definido por Heroku o 8080 localmente
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
