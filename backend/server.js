const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Inicializa la conexión
connectDB();

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
