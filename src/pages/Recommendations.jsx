import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";

export default function Recommendations() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadRecommendations() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/analytics/recommendations"
        );

        if (active) {
          setRecommendations(response.data.items ?? []);
          setNote(response.data.note ?? "");
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load recommendations."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <h2>Recommended For You</h2>

        <div className="alert alert-warning">
          Please log in to view personalized recommendations.
        </div>

        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3">
        Recommended For You
      </h2>

      <p className="text-muted">
        Personalized recommendations powered by RapidMiner
        and MongoDB Atlas.
      </p>

      {loading && (
        <div className="alert alert-info">
          Loading recommendations...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && recommendations.length === 0 && (
        <div className="alert alert-info">
          No personalized recommendations are available
          for this account yet.
          {note && <p className="mb-0 mt-2">{note}</p>}
        </div>
      )}

      {!loading && !error && recommendations.length > 0 && (
        <div className="row g-4">
          {recommendations.map((item) => {
            const product = item.product;

            if (!product) return null;

            return (
              <div
                className="col-md-4"
                key={product._id}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.name}
                    </h5>

                    <p className="text-muted">
                      {product.description}
                    </p>

                    <p>
                      <strong>Category:</strong>{" "}
                      {product.category}
                    </p>

                    <h5 className="text-primary">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </h5>

                    <p>
                      <span className="badge bg-success">
                        Recommendation Score:{" "}
                        {Number(item.score).toFixed(2)}
                      </span>
                    </p>

                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link
        to="/products"
        className="btn btn-secondary mt-4"
      >
        Browse All Products
      </Link>
    </div>
  );
}