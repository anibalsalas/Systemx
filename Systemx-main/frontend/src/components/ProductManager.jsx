import axios from "axios";
import { useEffect, useState } from "react";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch products from backend
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handler for creating a new product
  const handleAddProduct = () => {
    axios
      .post("http://localhost:8080/api/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "" }); // Clear input fields
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  // Handler for updating a product
  const handleEditProduct = () => {
    if (editingProduct) {
      axios
        .put(`http://localhost:8080/api/products/${editingProduct.id}`, editingProduct)
        .then((response) => {
          const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? response.data : product
          );
          setProducts(updatedProducts);
          setEditingProduct(null); // Clear the editing state
        })
        .catch((error) => console.error("Error editing product:", error));
    }
  };

  // Handler for deleting a product
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { username, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [username]: value });
    } else {
      setNewProduct({ ...newProduct, [username]: value });
    }
  };

  // Handler for editing a product
  const handleSelectEditProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <h2>Product Manager</h2>

      {/* Add/Edit Product Form */}
      <div>
        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={handleInputChange}
        />
        <button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
          {editingProduct ? "Save Changes" : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleSelectEditProduct(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
