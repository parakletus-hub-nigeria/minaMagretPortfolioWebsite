import React from 'react';

const Footer: React.FC = () => {
  const startYear = 2024; // Start year for the project or website
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-900 text-white py-4 text-center flex flex-col gap-2 playfair">
      
       
      <div className="text-sm">
        © The Mina Ogbanga {startYear} {currentYear > startYear && `- ${currentYear}`}
      </div>

     
      <div className="text-sm">
        This website is powered by {' '}
        <a
          href="https://wa.me/2348148876125"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#49A3AC] hover:text-[#fd7e14] underline"
        >
          Parakletus Publishing
        </a>
      </div>
    </footer>
  );
};

export default Footer;
