import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuthorContext } from '../hooks/AuthorContext';
import { 
  HiMenuAlt3, 
  HiX, 
  HiChevronDown, 
  HiOutlineMail
} from 'react-icons/hi';

interface NavItem {
  name: string;
  path: string;
  dropdown?: { name: string; path: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/home' },
  {
    name: 'About',
    path: '/about',
    dropdown: [
      { name: 'Executive Profile', path: '/about/profile', description: 'Biography, mission & global leadership' },
      { name: 'Professional Work', path: '/about/my-work', description: 'Extractive industries, WASH & activism' },
      { name: 'Education & Credentials', path: '/about/education', description: 'Cambridge, Harvard & Ph.D. degrees' },
      { name: 'Fellowships & Scholarships', path: '/about/fellowships-and-scholarships', description: 'Ford Foundation & global honors' },
      { name: 'Awards & Recognitions', path: '/about/awards-and-recognitions', description: 'EU AID, UN-Habitat & NIM accolades' },
    ],
  },
  {
    name: 'Scholarship & Writings',
    path: '/writings',
    dropdown: [
      { name: 'Research Papers', path: '/writings/papers', description: 'Peer-reviewed publications & citations' },
      { name: 'Textbooks', path: '/writings/textbooks', description: 'Authored academic books & monographs' },
      { name: 'Manuals & Guides', path: '/writings/manuals', description: 'Development toolkits & policy briefs' },
    ],
  },
  {
    name: 'Media & Gallery',
    path: '/gallery',
    dropdown: [
      { name: 'Keynote & Media Videos', path: '/gallery/videos', description: 'Speeches, interviews & documentaries' },
      { name: 'News & Press', path: '/gallery/news', description: 'Press releases & featured stories' },
      { name: 'Official Portraits', path: '/gallery/pictures', description: 'High-res photography & press kit' },
    ],
  },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { authorName, authorLogoUrl } = useAuthorContext();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const toggleMobileSubMenu = (name: string) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  const isLinkActive = (path: string) => {
    if (path === '/home') return location.pathname === '/home' || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full relative z-50 font-sans" role="navigation" aria-label="Main Navigation">
      <div className="flex items-center justify-between py-3 px-4 md:px-6">
        {/* Brand / Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          {authorLogoUrl ? (
            <img
              src={authorLogoUrl}
              alt={authorName || 'Website Logo'}
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-serif font-bold text-xl">
              M
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-gray-100 text-base md:text-lg tracking-tight group-hover:text-blue-400 transition-colors">
              {authorName || 'Prof. Mina Ogbanga'}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-semibold hidden sm:inline-block">
              Professor of Social Work & Sustainability
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const active = isLinkActive(item.path);

            if (item.dropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-blue-400 bg-blue-950/40 border border-blue-800/30'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    aria-expanded={activeDropdown === item.name}
                  >
                    <span>{item.name}</span>
                    <HiChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180 text-blue-400' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-72 pt-2 z-50">
                      <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-2 shadow-2xl space-y-1">
                        {item.dropdown.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block p-2.5 rounded-xl transition-all ${
                                isActive
                                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                                  : 'hover:bg-slate-800/60 text-gray-200'
                              }`
                            }
                          >
                            <p className="text-sm font-semibold">{subItem.name}</p>
                            {subItem.description && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {subItem.description}
                              </p>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-blue-950/40 border border-blue-800/30 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <HiOutlineMail className="text-sm" />
            <span>Book / Engage</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 rounded-xl text-gray-200 hover:text-white hover:bg-slate-800/70 focus:outline-none transition-colors"
          aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-slate-950/95 backdrop-blur-xl z-50 overflow-y-auto px-6 py-6 border-t border-slate-800">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const active = isLinkActive(item.path);

              if (item.dropdown) {
                const isExpanded = mobileExpanded === item.name;
                return (
                  <div key={item.name} className="border-b border-slate-800/60 pb-2">
                    <button
                      onClick={() => toggleMobileSubMenu(item.name)}
                      className="w-full flex items-center justify-between py-2 text-base font-semibold text-gray-100 hover:text-blue-400 transition-colors"
                    >
                      <span className={active ? 'text-blue-400' : ''}>{item.name}</span>
                      <HiChevronDown
                        className={`text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-blue-400' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 py-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                              `block py-1.5 text-sm transition-colors ${
                                isActive ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2 text-base font-semibold border-b border-slate-800/60 block transition-colors ${
                      isActive ? 'text-blue-400' : 'text-gray-100 hover:text-blue-400'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}

            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-center block shadow-lg shadow-blue-600/30"
              >
                Book Keynote / Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
