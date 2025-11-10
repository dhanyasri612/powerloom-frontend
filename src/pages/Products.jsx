import React, { useEffect, useState } from "react";
import api, { getImageUrl } from "../services/api";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/products")
      .then((r) => setProducts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "all",
    ...new Set(products.flatMap((p) => p.categories || [])),
  ];

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.categories?.includes(filter));

  return (
    <section>
      {/* Hero Section */}
      <div className="products-hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3">Our Products</h1>
          <p className="lead fs-4">
            Premium textile products crafted with precision and care
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-4 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn ${
                  filter === cat ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-5">
        <div className="container">
          {loading ? (
            <LoadingSpinner />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No products found</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((p) => (
                <div className="col-md-6 col-lg-4" key={p._id}>
                  <div className="card h-100 shadow-sm product-card border-0">
                    <div className="product-image-wrapper">
                      <img
                        src={getImageUrl(p.images?.[0])}
                        className="card-img-top product-image"
                        alt={p.name}
                      />
                      {p.stockMeters > 0 && (
                        <span className="badge bg-success stock-badge">
                          In Stock
                        </span>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold mb-2">{p.name}</h5>
                      <p className="text-muted small flex-grow-1">
                        {p.description?.slice(0, 100)}
                        {p.description?.length > 100 && "..."}
                      </p>

                      <div className="product-meta mb-3">
                        {p.gsm && (
                          <span className="badge bg-light text-dark me-2">
                            GSM: {p.gsm}
                          </span>
                        )}
                        {p.width && (
                          <span className="badge bg-light text-dark">
                            Width: {p.width}
                          </span>
                        )}
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="product-price">
                            ₹{p.pricePerMeter}
                          </div>
                          <small className="text-muted">per meter</small>
                        </div>
                        <Link
                          className="btn btn-primary"
                          to={`/products/${p._id}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-5 bg-light text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">Need Contract Weaving Service?</h3>
          <p className="lead text-muted mb-4">
            Bring your own yarn and design - we'll weave it into finished cloth
            for you
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg px-5">
            Get Job Work Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
