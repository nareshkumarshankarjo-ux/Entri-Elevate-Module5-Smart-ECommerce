
import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");

        setProducts(response.data.items ?? []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main style={{ padding: "30px" }}>
      <h1>Smart E-Commerce Store</h1>
      <p>Entri Elevate - Module 5 MERN Stack Project</p>

      {loading && <p>Loading products...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <h2>Available Products ({products.length})</h2>

          {products.length === 0 && (
            <p>No products available.</p>
          )}

          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "12px",
                borderRadius: "8px"
              }}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
        </>
      )}
    </main>
  );
}

export default App;