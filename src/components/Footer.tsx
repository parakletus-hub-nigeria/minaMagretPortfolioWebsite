import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorContext } from '../hooks/AuthorContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  return (
    <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 text-gray-300 font-sans backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
          {/* Brand & Credo */}
          <div className="space-y-2 max-w-md">
            <h3 className="text-lg font-serif font-bold text-gray-100 tracking-tight">
              {displayName}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              First Professor of Social Work & Environmental Sustainability Globally. Bridging research, policy advocacy, and community empowerment across the Niger Delta and international forums.
            </p>
          </div>

          {/* Quick Academic Nav Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
            <Link to="/about/profile" className="hover:text-blue-400 transition-colors">
              Biography
            </Link>
            <Link to="/writings/papers" className="hover:text-blue-400 transition-colors">
              Publications
            </Link>
            <Link to="/about/fellowships-and-scholarships" className="hover:text-blue-400 transition-colors">
              Fellowships
            </Link>
            <Link to="/about/awards-and-recognitions" className="hover:text-blue-400 transition-colors">
              Honors
            </Link>
            <Link to="/gallery/videos" className="hover:text-blue-400 transition-colors">
              Lectures & Media
            </Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">
              Speaking Requests
            </Link>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-400">
          <p>
            © {currentYear} {displayName}. All rights reserved.
          </p>

          <p>
            Engineered & Published with{' '}
            <a
              href="https://wa.me/2348148876125"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
            >
              Parakletus Publishing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
