import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProductForm = ({ onProductAdded, productToEdit, clearEdit }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    min_stock: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name,
        description: productToEdit.description,
        quantity: productToEdit.quantity,
        price: productToEdit.price,
        min_stock: productToEdit.min_stock,
      });
    } else {
      setForm({
        name: '',
        description: '',
        quantity: '',
        price: '',
        min_stock: '',
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      api.put(`/products/${productToEdit.id}`, form)
        .then(() => {
          alert('¡Producto actualizado!');
          onProductAdded();
          clearEdit();
        })
        .catch(console.error);
    } else {
      api.post('/products', form)
        .then(() => {
          alert('¡Producto agregado!');
          onProductAdded();
          setForm({ name: '', description: '', quantity: '', price: '', min_stock: '' });
        })
        .catch(console.error);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4>{productToEdit ? 'Editar Producto' : 'Agregar Producto'}</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input className="form-control" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input className="form-control" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="quantity" type="number" placeholder="Cantidad" value={form.quantity} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="min_stock" type="number" placeholder="Stock Mínimo" value={form.min_stock} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">
            {productToEdit ? 'Actualizar' : 'Agregar'}
          </button>
          {productToEdit && (
            <button type="button" className="btn btn-secondary" onClick={clearEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;


