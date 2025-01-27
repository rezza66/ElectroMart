import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 text-center">
      <p>

        Copyright © {new Date().getFullYear()} - All right reserved by ACME
        Industries Ltd
      </p>
    </footer>
  );
}

export default Footer;
