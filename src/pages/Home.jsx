import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const slides = [
  {
    type: "image",
    src: `${import.meta.env.BASE_URL}images/loom1.png`,
    alt: "Powerloom weaving",
    title: "Precision in Every Thread",
    desc: "Expert job work weaving for modern textile demands.",
  },
  {
    type: "image",
    src: `${import.meta.env.BASE_URL}images/loom2.png`,
    alt: "Fabric production",
    title: "From Yarn to Fabric",
    desc: "Trusted by brands for quality and consistency.",
  },
  {
    type: "image",
    src: `${import.meta.env.BASE_URL}images/loom3.png`,
    alt: "Powerloom process",
    title: "Innovation in Weaving",
    desc: "Modern technology meets skilled craftsmanship.",
  },
  {
    type: "image",
    src: `${import.meta.env.BASE_URL}images/loom4.png`,
    alt: "Finishing section",
    title: "Finishing Excellence",
    desc: "Perfect texture, perfect touch.",
  },
  {
    type: "image",
    src: `${import.meta.env.BASE_URL}images/loom5.png`,
    alt: "Quality inspection",
    title: "Quality Beyond Measure",
    desc: "Every meter checked with care.",
  },
  {
    type: "video",
    src: `${import.meta.env.BASE_URL}videos/video1.mp4`,
    title: "Power & Perfection",
    desc: "Our looms deliver excellence, meter by meter.",
  },
  {
    type: "video",
    src: `${import.meta.env.BASE_URL}videos/video2.mp4`,
    title: "Dynamic Weaving in Action",
    desc: "Watch the rhythm of our textile machines.",
  },
  {
    type: "video",
    src: `${import.meta.env.BASE_URL}videos/video3.mp4`,
    title: "Crafted with Care",
    desc: "Every roll reflects our dedication to excellence.",
  },
];

const features = [
  {
    icon: "🧵",
    title: "Contract Weaving",
    desc: "You supply yarn and design, we handle the entire weaving process"
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Efficient production ensuring your woven cloth is ready on time"
  },
  {
    icon: "🎯",
    title: "Your Design, Our Expertise",
    desc: "Bring your patterns and specifications, we weave exactly as you need"
  },
  {
    icon: "✅",
    title: "Quality Job Work",
    desc: "Professional weaving service with quality checks on every meter"
  }
];

const stats = [
  { number: "8+", label: "Power Looms" },
  { number: "1000+", label: "Meters/Day" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Years Experience" }
];

const Home = () => {
  return (
    <section>
      {/* Hero Section with Gradient */}
      <div className="hero-gradient text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3 animate-fade-in">Andal Textiles</h1>
          <p className="lead mb-4 fs-4">
            "Professional Contract Weaving Services - You Bring the Yarn & Design, We Weave Your Cloth"
          </p>
          <p className="mb-4 fs-5">
            Job Work Weaving | Bring Your Thread & Pattern | We Deliver Woven Fabric
          </p>
          <p className="text-white-50 mb-4">
            📍 Kombakadu, Tirupur, Tamil Nadu
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/products" className="btn btn-light btn-lg px-4 shadow">
              View Products
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="card border-0 shadow-sm h-100 stat-card">
                  <div className="card-body">
                    <h2 className="display-4 fw-bold text-primary mb-2">{stat.number}</h2>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="py-5">
        <div className="container mb-4">
          <h2 className="text-center fw-bold mb-2">Our Work in Action</h2>
          <p className="text-center text-muted">Explore our state-of-the-art weaving facility</p>
        </div>
        <Carousel interval={5000} pause="hover" slide={true} className="shadow-lg">
          {slides.map((slide, i) => (
            <Carousel.Item key={i}>
              {slide.type === "image" ? (
                <img
                  className="d-block w-100 carousel-img"
                  src={slide.src}
                  alt={slide.alt}
                />
              ) : (
                <video
                  className="d-block w-100 carousel-img"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}
              <Carousel.Caption className="carousel-caption-custom">
                <h3 className="fw-bold">{slide.title}</h3>
                <p className="fs-5">{slide.desc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Features Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose Us</h2>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 feature-card text-center p-4">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted small">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials / Philosophy Section */}
      <div className="py-5 testimonial-section">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-white">Our Philosophy</h2>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="card border-0 shadow-lg mb-4 testimonial-card">
                <div className="card-body p-4">
                  <p className="fs-5 fst-italic mb-3">
                    "Quality is never an accident; it is always the result of intelligent effort."
                  </p>
                  <footer className="text-muted">— John Ruskin</footer>
                </div>
              </div>
              <div className="card border-0 shadow-lg mb-4 testimonial-card">
                <div className="card-body p-4">
                  <p className="fs-5 fst-italic mb-3">
                    "We don't just weave fabric — we weave trust, precision, and tradition."
                  </p>
                  <footer className="text-muted">— Andal Textiles</footer>
                </div>
              </div>
              <div className="card border-0 shadow-lg testimonial-card">
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
      <div className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Start Your Project?</h2>
          <p className="lead mb-4">Get in touch with us for custom weaving solutions</p>
          <Link to="/contact" className="btn btn-light btn-lg px-5">
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
