const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'sistema-ricardo-frontend', 'browser', 'index.html'));
});

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
