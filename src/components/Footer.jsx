import React from "react";
export default function Footer(){
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">© {new Date().getFullYear()} Andal Textiles — All rights reserved.</div>
    </footer>
  );
}
