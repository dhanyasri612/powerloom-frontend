import React, { useState } from "react";
import { useToast } from "../components/Toast";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success("Message sent! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      {/* Hero */}
      <div className="contact-hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3">Get In Touch</h1>
          <p className="lead fs-4">
            Contact us for contract weaving services - bring your yarn & design,
            we'll weave your cloth!
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-4">
              <h3 className="fw-bold mb-4">Contact Information</h3>

              <div className="contact-info-card mb-4">
                <div className="contact-icon">📍</div>
                <div>
                  <h6 className="fw-bold mb-1">Address</h6>
                  <p className="text-muted mb-0">
                    2/296-A Makaliamman Kovil,
                    <br />
                    Kombakadu, Tirupur,
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="contact-info-card mb-4">
                <div className="contact-icon">📞</div>
                <div>
                  <h6 className="fw-bold mb-1">Phone</h6>
                  <p className="text-muted mb-0">+91 96595 96066</p>
                </div>
              </div>

              <div className="contact-info-card mb-4">
                <div className="contact-icon">✉️</div>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0">info@andaltextiles.com</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">⏰</div>
                <div>
                  <h6 className="fw-bold mb-1">Business Hours</h6>
                  <p className="text-muted mb-0">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-muted mb-0">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg contact-form-card">
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4">Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-control-lg"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control form-control-lg"
                          placeholder="What is this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          className="form-control form-control-lg"
                          rows="5"
                          placeholder="Tell us more about your requirements..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className={`btn btn-primary btn-lg px-5 ${
                            submitting ? "loading" : ""
                          }`}
                          disabled={submitting}
                        >
                          {submitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Optional) */}
      <div className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Find Us</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125226.68392634907!2d77.2508!3d11.1085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907b5855fb349%3A0x5f89000f2d6765e2!2sTirupur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "15px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
