import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">&copy; {new Date().getFullYear()} Powerloom Works — All rights reserved.</p>
    </footer>
  );
};

export default Footer;
