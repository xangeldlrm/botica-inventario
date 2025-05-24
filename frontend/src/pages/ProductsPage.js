import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleProductAdded = () => setRefresh(!refresh);
  const clearEdit = () => setProductToEdit(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Inventario</h2>
      <ProductForm
        onProductAdded={handleProductAdded}
        productToEdit={productToEdit}
        clearEdit={clearEdit}
      />
      <ProductList
        refresh={refresh}
        onEdit={(product) => setProductToEdit(product)}
      />
    </div>
  );
};

export default ProductsPage;
