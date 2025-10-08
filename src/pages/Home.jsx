import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const slides = [
  { type: "image", src: "/images/loom1.png", alt: "Powerloom weaving", title: "Precision in Every Thread", desc: "Expert job work weaving for modern textile demands." },
  { type: "image", src: "/images/loom2.png", alt: "Fabric production", title: "From Yarn to Fabric", desc: "Trusted by brands for quality and consistency." },
  { type: "image", src: "/images/loom3.png", alt: "Powerloom process", title: "Innovation in Weaving", desc: "Modern technology meets skilled craftsmanship." },
  { type: "image", src: "/images/loom4.png", alt: "Finishing section", title: "Finishing Excellence", desc: "Perfect texture, perfect touch." },
  { type: "image", src: "/images/loom5.png", alt: "Quality inspection", title: "Quality Beyond Measure", desc: "Every meter checked with care." },
  { type: "video", src: "/videos/video1.mp4", title: "Power & Perfection", desc: "Our looms deliver excellence, meter by meter." },
  { type: "video", src: "/videos/video2.mp4", title: "Dynamic Weaving in Action", desc: "Watch the rhythm of our textile machines." },
  { type: "video", src: "/videos/video3.mp4", title: "Crafted with Care", desc: "Every roll reflects our dedication to excellence." },
];

const quotes = [
  { quote: "Quality is never an accident; it is always the result of intelligent effort.", author: "John Ruskin" },
  { quote: "We don’t just weave fabric — we weave trust, precision, and tradition.", author: "Andal Textiles" },
  { quote: "Strong threads build strong connections — let’s create excellence together.", author: "Andal Textiles" },
];

const Home = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="text-center py-5 bg-primary text-white">
        <h1 className="display-4 fw-bold">Andal Textiles</h1>
        <p className="lead mt-3">"Where threads meet tradition and technology."</p>
        <p className="mt-2 small">Contract Weaving | Custom Fabrics | Quality Finishing — Based in Erode, Tamil Nadu</p>
      </div>

      {/* Carousel Section */}
      <Carousel interval={5000} pause="hover" slide={true}>
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
              <h5>{slide.title}</h5>
              <p>{slide.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Quotes Section */}
      <div className="py-5 text-center">
        <h2 className="fw-bold mb-4">Our Philosophy</h2>
        <div className="container">
          {quotes.map((q, i) => (
            <blockquote key={i} className="mb-4">
              <p className="mb-1 fst-italic">“{q.quote}”</p>
              <footer className="text-muted">{q.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
