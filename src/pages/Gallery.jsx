import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css";

const galleryImages = [
  { src: `${import.meta.env.BASE_URL}images/loom3.png`, title: "Powerloom in Action", category: "production" },
  { src: `${import.meta.env.BASE_URL}images/image copy 2.png`, title: "Fabric Weaving", category: "process" },
  { src: `${import.meta.env.BASE_URL}images/image copy 3.png`, title: "Quality Inspection", category: "quality" },
  { src: `${import.meta.env.BASE_URL}images/image copy 4.png`, title: "Finished Products", category: "products" },
  { src: `${import.meta.env.BASE_URL}images/image copy 5.png`, title: "Textile Details", category: "products" },
  { src: `${import.meta.env.BASE_URL}images/loom1.png`, title: "Modern Looms", category: "production" },
  { src: `${import.meta.env.BASE_URL}images/loom2.png`, title: "Weaving Process", category: "process" },
  { src: `${import.meta.env.BASE_URL}images/loom4.png`, title: "Production Floor", category: "production" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <section>
      {/* Hero */}
      <div className="gallery-hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3">Our Gallery</h1>
          <p className="lead fs-4">
            A glimpse of our weaving, fabrics, and production processes
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="py-4 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredImages.map((img, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div 
                  className="gallery-item"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    className="gallery-image"
                    alt={img.title}
                  />
                  <div className="gallery-overlay">
                    <h5 className="text-white fw-bold">{img.title}</h5>
                    <p className="text-white-50 small mb-0">{img.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="lightbox-caption">
              <h4 className="fw-bold">{selectedImage.title}</h4>
              <p className="text-muted mb-0">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
