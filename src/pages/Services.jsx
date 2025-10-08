import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";

const services = [
  {
    title: "Job Work Weaving",
    desc: "Expert weaving services for your custom fabric requirements.",
    img: "images/loom5.png",
  },
  {
    title: "Custom Fabric Production",
    desc: "Design your own patterns and yarn combinations.",
    img: "images/loom3.png",
  },
  {
    title: "Finishing & Quality Control",
    desc: "Precise finishing and thorough inspection for premium results.",
    img: "images/image.png",
  },
  {
    title: "Bulk Order Supply",
    desc: "Reliable delivery for business and retail orders.",
    img: "images/image copy.png",
  },
];

const Services = () => {
  return (
    <section className="bg-light py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Our Textile Services</h1>
        <p className="lead">
          Precision weaving, custom fabrics, and quality finishing for brands and businesses
        </p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {services.map((service, i) => (
            <div
              className={`col-md-4 mb-4 ${i === 3 ? "mx-auto" : ""}`}
              key={i}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={service.img}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-5 text-center">
        <h2 className="fw-bold mb-4">Our Philosophy</h2>
        <div className="container">
          <blockquote className="mb-4">
            <p className="mb-1 fst-italic">
              “We don’t just weave fabric — we weave trust, precision, and tradition.”
            </p>
            <footer className="text-muted">Andal Textiles</footer>
          </blockquote>
          <blockquote className="mb-4">
            <p className="mb-1 fst-italic">
              “Strong threads build strong connections — let’s create excellence together.”
            </p>
            <footer className="text-muted">Andal Textiles</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Services;
