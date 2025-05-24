import React, { useEffect, useState } from 'react';
import api from '../services/api';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    quantity_sold: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = () => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(console.error);
  };

  const fetchSales = () => {
    api.get('/sales')
      .then((res) => setSales(res.data))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/sales', form)
      .then(() => {
        alert('¡Venta registrada!');
        setForm({ product_id: '', quantity_sold: '' });
        fetchProducts();
        fetchSales();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registro de Ventas</h2>
      <div className="card p-3 mb-4">
        <h4>Registrar Nueva Venta</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <select
              className="form-select"
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              name="quantity_sold"
              type="number"
              placeholder="Cantidad"
              value={form.quantity_sold}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
          </div>
        </form>
      </div>

      <h4>Historial de Ventas</h4>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Cantidad Vendida</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.Product.name}</td>
              <td>{s.Product.description}</td>
              <td>{s.quantity_sold}</td>
              <td>{new Date(s.sale_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;
