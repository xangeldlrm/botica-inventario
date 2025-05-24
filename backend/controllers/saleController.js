const { Sale, Product } = require('../models');

exports.createSale = async (req, res) => {
  const { product_id, quantity_sold } = req.body;

  try {
    const product = await Product.findByPk(product_id);

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    // Verifica stock disponible
    if (product.quantity < quantity_sold) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Registra la venta
    const sale = await Sale.create({ product_id, quantity_sold });

    // Actualiza inventario
    product.quantity -= quantity_sold;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar venta' });
  }
};

exports.getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: { model: Product, attributes: ['name', 'description'] },
      order: [['sale_date', 'DESC']],
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};
