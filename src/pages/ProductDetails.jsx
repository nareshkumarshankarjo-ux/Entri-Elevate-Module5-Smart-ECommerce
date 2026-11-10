import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../api/axios";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setAdded(false);

      try {
        const response = await api.get(`/products/${id}`);

        if (active) {
          setProduct(response.data.product ?? response.data);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load product details."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product?._id) return;

    dispatch(addToCart(product));
    setAdded(true);
  }

  return (
    <div className="container py-5">
      <Link
        to="/products"
        className="btn btn-outline-secondary mb-4"
      >
        Back to Products
      </Link>

      {loading && (
        <div className="alert alert-info">
          Loading product details...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && product && (
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="fw-bold mb-3">
              {product.name}
            </h2>

            <p className="text-muted">
              {product.description}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <h3 className="text-primary fw-bold">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </h3>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddToCart}
                disabled={!product._id}
              >
                Add to Cart
              </button>

              <Link
                to="/cart"
                className="btn btn-outline-primary"
              >
                View Cart
              </Link>
            </div>

            {added && (
              <div
                className="alert alert-success mt-3 mb-0"
                role="status"
              >
                Product added to cart successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {!loading && !error && !product && (
        <div className="alert alert-warning">
          Product not found.
        </div>
      )}
    </div>
  );
}