// Footer.jsx
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-gray-300 py-6 px-4">
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
        <p>&copy; {currentYear} Box Eats Rabbit. All rights reserved.</p>
        <p className="mt-2">Made with passion by Daniel and A Joel</p>
      </div>
    </footer>
  );
}

export default Footer;
