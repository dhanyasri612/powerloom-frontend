import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navCollapseRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleNavLinkClick = () => {
    if (navCollapseRef.current && window.innerWidth < 992) {
      navCollapseRef.current.classList.remove("show");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    handleNavLinkClick();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Andal Textiles</Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav" ref={navCollapseRef}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/" onClick={handleNavLinkClick}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services" onClick={handleNavLinkClick}>Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products" onClick={handleNavLinkClick}>Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contracts" onClick={handleNavLinkClick}>Contracts</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dashboard" onClick={handleNavLinkClick}>Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/gallery" onClick={handleNavLinkClick}>Gallery</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>
            {user?.role === "admin" && (
              <li className="nav-item"><Link className="nav-link" to="/admin" onClick={handleNavLinkClick}>Admin</Link></li>
            )}
            
            {user ? (
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle d-flex align-items-center" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <div 
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center me-2"
                    style={{ width: "35px", height: "35px", fontSize: "1rem" }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-lg-inline">{user.name}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <div className="dropdown-item-text">
                      <div className="fw-semibold">{user.name}</div>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/profile" onClick={handleNavLinkClick}>My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/profile" onClick={handleNavLinkClick}>My Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</Link></li>
                <li className="nav-item"><Link className="nav-link btn btn-primary text-white ms-2" to="/register" onClick={handleNavLinkClick}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}