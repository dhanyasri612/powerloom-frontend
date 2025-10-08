import React from 'react';

export function Hero() {
  const BUSINESS_NAME = 'Shree Powerloom Works';
  const TAGLINE = 'Professional contract weaving — bring yarn and patterns, we weave.';
  const LOCATION = 'Erode, Tamil Nadu';

  return (
    <section id="home" className="py-5 bg-light">
      <div className="container-fluid px-3 px-md-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h1 className="fw-bold mb-3">{BUSINESS_NAME}</h1>
            <p className="text-muted mb-4">{TAGLINE}</p>
            <ul className="mb-4 text-muted small">
              <li>Contract weaving / job work using client-supplied yarn & patterns</li>
              <li>Small-batch samples & bulk production</li>
              <li>Quality checks and timely delivery</li>
              <li>Based in {LOCATION}</li>
            </ul>
            <a href="#contact" className="btn btn-primary">Request Quote</a>
          </div>
          <div className="col-12 col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop" 
              alt="powerloom" 
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
