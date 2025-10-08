import React from 'react';

const Contact = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container-fluid px-3 px-md-5">
        <h2 className="fw-bold mb-4 text-center">Contact Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="p-4 border rounded shadow-sm bg-light">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="you@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
