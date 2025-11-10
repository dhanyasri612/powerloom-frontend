import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";

const services = [
  {
    title: "Contract Weaving Service",
    desc: "You provide the thread/yarn, design pattern, and specifications - we weave it into finished cloth using our powerlooms.",
    img: `${import.meta.env.BASE_URL}images/loom5.png`,
    icon: "🧵"
  },
  {
    title: "Job Work Only",
    desc: "Pure job work model - no material sales. Bring all your materials (yarn, patterns, designs) and we handle the weaving process.",
    img: `${import.meta.env.BASE_URL}images/loom3.png`,
    icon: "🎨"
  },
  {
    title: "Quality Weaving & Inspection",
    desc: "Professional weaving with our modern powerlooms. Each meter thoroughly checked before delivery.",
    img: `${import.meta.env.BASE_URL}images/image.png`,
    icon: "✅"
  },
  {
    title: "Flexible Order Quantities",
    desc: "From small trial batches to bulk production. We handle orders of all sizes with the same quality standards.",
    img: `${import.meta.env.BASE_URL}images/image copy.png`,
    icon: "📦"
  },
];

const processSteps = [
  { step: "1", title: "Bring Your Materials", desc: "Provide thread/yarn, design pattern, and specifications" },
  { step: "2", title: "Sample Weaving", desc: "We weave sample pieces for your approval" },
  { step: "3", title: "Contract Production", desc: "Full production with quality monitoring at every stage" },
  { step: "4", title: "Return Woven Cloth", desc: "Final inspection and delivery of finished woven fabric" }
];

const Services = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="services-hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3">Contract Weaving Services</h1>
          <p className="lead fs-4 mb-4">
            Professional job work weaving - You bring yarn & design, we weave high-quality cloth
          </p>
          <div className="mb-4">
            <p className="fs-5 text-white-50">
              ✓ No Material Sales | ✓ Pure Job Work | ✓ Your Material, Our Expertise
            </p>
          </div>
          <Link to="/contact" className="btn btn-light btn-lg px-5">
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {services.map((service, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="card h-100 shadow-sm service-card border-0">
                  <div className="service-icon-wrapper">
                    <span className="service-icon-large">{service.icon}</span>
                  </div>
                  <img
                    src={service.img}
                    className="card-img-top"
                    alt={service.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold mb-3">{service.title}</h5>
                    <p className="card-text text-muted">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Process</h2>
          <div className="row g-4">
            {processSteps.map((step, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="text-center">
                  <div className="process-step-number mx-auto mb-3">
                    {step.step}
                  </div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-muted">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="process-arrow d-none d-lg-block">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-5 philosophy-section">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-white">Our Philosophy</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg mb-4 philosophy-card">
                <div className="card-body p-4">
                  <p className="fs-5 fst-italic mb-3">
                    "We don't just weave fabric — we weave trust, precision, and tradition."
                  </p>
                  <footer className="text-muted">— Andal Textiles</footer>
                </div>
              </div>
              <div className="card border-0 shadow-lg philosophy-card">
                <div className="card-body p-4">
                  <p className="fs-5 fst-italic mb-3">
                    "Strong threads build strong connections — let's create excellence together."
                  </p>
                  <footer className="text-muted">— Andal Textiles</footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-5 text-center bg-light">
        <div className="container">
          <h3 className="fw-bold mb-3">Ready to Start Your Project?</h3>
          <p className="lead text-muted mb-4">Contact us to discuss your fabric requirements</p>
          <Link to="/contact" className="btn btn-primary btn-lg px-5">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
