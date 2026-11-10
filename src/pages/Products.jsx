import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const response = await api.get("/products");
        if (active) {
          setProducts(response.data.items ?? []);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load products."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Our Products</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <p className="text-muted">
            Showing {visibleProducts.length} products
          </p>

          <div className="row g-4">
            {visibleProducts.map((product) => (
              <div className="col-md-6 col-lg-4" key={product._id}>
                <div className="card product-card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5>{product.name}</h5>

                    <p className="text-muted">
                      {product.description}
                    </p>

                    <p className="small">{product.category}</p>

                    <h5 className="text-primary mt-auto">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </h5>

                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-outline-primary mt-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {visibleProducts.length === 0 && (
              <p>No matching products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}