import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-center text-blue-600">TextGrabr &copy; 2023</p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/sihle-ndlovu-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
             <img
              src="/linkedin-icon.png" // Replace with the actual LinkedIn icon URL
              alt="LinkedIn"
              className="w-9 h-9"
            />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
