import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../components/Toast";
import "./ProductDetail.css";

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [meters, setMeters] = useState(10);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => { 
    api.get(`/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleRequest = async () => {
    try {
      setSubmitting(true);
      await api.post("/orders", {
        customerName: "Walk-in",
        customerEmail: "none",
        items: [{ product: product._id, meters, pricePerMeter: product.pricePerMeter }],
        estimatedDelivery: new Date(Date.now() + 7*24*3600*1000),
        totalAmount: meters * product.pricePerMeter
      });
      toast.success("Quote request created successfully!");
      setMeters(10);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) return <div className="text-center py-5"><p>Product not found</p></div>;

  const totalPrice = meters * (product.pricePerMeter || 0);

  return (
    <section className="py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Image Gallery */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="main-image-wrapper mb-3">
                <img 
                  src={product.images?.[selectedImage] || "/images/placeholder.png"} 
                  className="img-fluid rounded shadow main-product-image" 
                  alt={product.name}
                />
                {product.stockMeters > 0 && (
                  <span className="badge bg-success position-absolute top-0 end-0 m-3">
                    In Stock
                  </span>
                )}
              </div>
              
              {product.images?.length > 1 && (
                <div className="d-flex gap-2 flex-wrap">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                      alt={`${product.name} ${idx + 1}`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
            
            {product.categories?.length > 0 && (
              <div className="mb-3">
                {product.categories.map(cat => (
                  <span key={cat} className="badge bg-primary me-2">{cat}</span>
                ))}
              </div>
            )}

            <div className="product-price-section mb-4">
              <div className="price-display">
                <span className="currency">₹</span>
                <span className="amount">{product.pricePerMeter}</span>
                <span className="unit">/ meter</span>
              </div>
            </div>

            <p className="lead text-muted mb-4">{product.description}</p>

            {/* Specifications */}
            <div className="card mb-4 border-0 bg-light">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Specifications</h6>
                <div className="row g-3">
                  {product.gsm && (
                    <div className="col-6">
                      <div className="spec-item">
                        <small className="text-muted">GSM</small>
                        <div className="fw-semibold">{product.gsm}</div>
                      </div>
                    </div>
                  )}
                  {product.width && (
                    <div className="col-6">
                      <div className="spec-item">
                        <small className="text-muted">Width</small>
                        <div className="fw-semibold">{product.width}</div>
                      </div>
                    </div>
                  )}
                  {product.stockMeters !== undefined && (
                    <div className="col-6">
                      <div className="spec-item">
                        <small className="text-muted">Available Stock</small>
                        <div className="fw-semibold">{product.stockMeters} meters</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Request a Quote</h5>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Quantity (meters)</label>
                  <div className="input-group input-group-lg">
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => setMeters(Math.max(1, meters - 10))}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      value={meters} 
                      onChange={e => setMeters(Math.max(1, Number(e.target.value)))}
                      min="1"
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => setMeters(meters + 10)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="total-price-box mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5">Total Price:</span>
                    <span className="fs-3 fw-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  className={`btn btn-primary btn-lg w-100 mb-3 ${submitting ? 'loading' : ''}`}
                  onClick={handleRequest}
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Request Quote'}
                </button>
                
                <Link to="/contact" className="btn btn-outline-primary w-100">
                  Contact for Custom Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
