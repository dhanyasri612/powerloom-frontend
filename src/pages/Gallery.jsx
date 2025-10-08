import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const galleryImages = [
  "images/loom3.png",
  "images/image copy 2.png",
  "images/image copy 3.png",
  "images/image copy 4.png",
  "images/image copy 5.png",
];

const Gallery = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Our Gallery</h1>
          <p className="lead">
            A glimpse of our weaving, fabrics, and production processes
          </p>
        </div>

        <div className="row g-3 justify-content-center">
          {galleryImages.map((img, index) => (
            <div
              className={`col-6 col-md-4 col-lg-3 mb-3 ${
                index === galleryImages.length - 1 ? "mx-auto" : ""
              }`}
              key={index}
            >
              <div className="card border-0 shadow-sm">
                <img
                  src={img}
                  className="card-img-top"
                  alt={`Gallery ${index + 1}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
