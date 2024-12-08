const cors = require('cors');

const corsMiddleware = cors({
  origin: 'http://localhost:5173', // Cambia esto por el origen de tu frontend
});

module.exports = corsMiddleware;