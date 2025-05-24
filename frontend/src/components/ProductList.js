import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProductList = ({ refresh, onEdit }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      api.delete(`/products/${id}`)
        .then(() => {
          alert('¡Producto eliminado!');
          fetchProducts();
        })
        .catch(console.error);
    }
  };

  return (
    <div>
      <h4>Lista de Productos</h4>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Stock mínimo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.quantity}</td>
              <td>S/. {p.price}</td>
              <td>{p.min_stock}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(p)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
