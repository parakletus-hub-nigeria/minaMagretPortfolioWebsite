import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useAuthorContext } from '../hooks/AuthorContext';
import { FaXmark } from "react-icons/fa6";
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
 

  const toggleNavbar = () => setIsOpen(!isOpen);

  const toggleSubMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };
  const toggleSubSubMenu = (menu: string) => {
    setExpandedSubMenu(expandedSubMenu === menu ? null : menu);
  }; //I am bad with names hun?

  const handleMouseEnter = (menu: string) => {
    setExpandedMenu(menu);
  };
  const handleMouseLeave = () => {
    setExpandedMenu(null);
  };

  const handleFocus = (menu: string) => {
    setExpandedMenu(menu);
  };

  const handleBlur = () => {
    setExpandedMenu(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSubMenu(menu);
    } else if (e.key === 'Escape') {
      setExpandedMenu(null);
    }
  };

  const handleSubSubMenuKeyDown = (e: React.KeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSubSubMenu(menu);
    } else if (e.key === 'Escape') {
      setExpandedSubMenu(null);
    }
  };

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-blue-500' : 'text-white';

const {authorLogoUrl} = useAuthorContext();
  return (
    <nav className="bg-transparent text-white px-4 py-3 md:flex md:justify-between">
      <div className="flex justify-between items-center">
        <Link to={'/home'}>
        <img src={authorLogoUrl} className='w-fit h-fit max-w-[120px] max-h-[120px]' alt="author logo" />
        </Link>
        <div className="md:hidden" onClick={toggleNavbar}>
          <button className="text-white focus:outline-none" aria-label="Toggle Menu">
          <GiHamburgerMenu size={24}/>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
  className={`${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } md:hidden fixed top-0 left-0 w-full h-full bg-black z-50 transition-transform duration-500`}
>
  <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   transition={{ duration: 0.5 }} // Control main container fade-in duration
   className={`${
     isOpen ? 'translate-x-0' : '-translate-x-full'
   } md:hidden transition-transform duration-500`}
  >
  <div className="flex justify-between px-4 py-2 items-center">
  <Link to={'/home'}>
        <img src={authorLogoUrl} className='max-w-[120px] max-h-[120px]' alt="author logo" />
        </Link>
        <button className="flex items-center justify-center p-2 rounded-full bg-white" onClick={toggleNavbar} aria-label="Close Menu">
  <FaXmark size={24} className='text-[#6c757d]' />
</button>

  </div>
  <ul className="flex flex-col gap-4 mt-4 text-lg px-4 py-2 capitalize">
    <li>
      <NavLink to="/" className={linkClassName} onClick={toggleNavbar}>
        Home
      </NavLink>
    </li>
    <li>
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => toggleSubMenu('about')}
        onKeyDown={(e) => handleKeyDown(e, 'about')}
        tabIndex={0}
      >
        <span>About</span>
        <span>{expandedMenu === 'about' ? '-' : '+'}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expandedMenu === 'about' ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul className="ml-4 mt-2 space-y-2">
          <li>
            <NavLink to="/about/profile" className={linkClassName} onClick={toggleNavbar}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/my-work" className={linkClassName} onClick={toggleNavbar}>
              My Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/education" className={linkClassName} onClick={toggleNavbar}>
              Education
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/fellowships-and-scholarships" className={linkClassName} onClick={toggleNavbar}>
              fellowships and schloarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/awards-and-recognitions" className={linkClassName} onClick={toggleNavbar}>
              awards and recognition
            </NavLink>
          </li>
        </ul>
      </div>
    </li>

    <li>
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => toggleSubMenu('writings')}
        onKeyDown={(e) => handleKeyDown(e, 'writings')}
        tabIndex={0}
      >
        <span>Writings</span>
        <span>{expandedMenu === 'writings' ? '-' : '+'}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expandedMenu === 'writings' ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul className="ml-4 mt-2 space-y-2 capitalize text-white">
          <li>
            <NavLink to="/writings/papers" className={linkClassName} onClick={toggleNavbar}>
              papers
            </NavLink>
          </li>
          <li>
            <NavLink to="/writings/textbooks" className={linkClassName} onClick={toggleNavbar}>
             Textbooks
            </NavLink>
          </li>
          <li>
            <NavLink to="/writings/manuals" className={linkClassName} onClick={toggleNavbar}>
             manuals
            </NavLink>
          </li>
        </ul>
      </div>
    </li>

    <li>
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => toggleSubMenu('gallery')}
        onKeyDown={(e) => handleKeyDown(e, 'gallery')}
        tabIndex={0}
      >
        <span>Gallery</span>
        <span>{expandedMenu === 'gallery' ? '-' : '+'}</span>
      </div>
      <div
        className={` overflow-hidden transition-all duration-500 ${
          expandedMenu === 'gallery' ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul className="ml-4 mt-2 space-y-2 capitalize">
          <li>
            <NavLink to="/gallery/videos" className={linkClassName} onClick={toggleNavbar}>
              Videos
            </NavLink>
          </li>
          <li>
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => toggleSubSubMenu('pictures')}
              onKeyDown={(e) => handleSubSubMenuKeyDown(e, 'pictures')}
              tabIndex={0}
            >
              <span>Pictures</span>
              <span>{expandedSubMenu === 'pictures' ? '-' : '+'}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedSubMenu === 'pictures' ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <NavLink to="/gallery/pictures/field-work" className={linkClassName} onClick={toggleNavbar}>
                    Field Work
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery/pictures/campaigns" className={linkClassName} onClick={toggleNavbar}>
                    Campaigns
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery/pictures/graduations" className={linkClassName} onClick={toggleNavbar}>
                    Graduations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery/pictures/speaking-engagements" className={linkClassName} onClick={toggleNavbar}>
                    Speaking Engagements
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery/pictures/events" className={linkClassName} onClick={toggleNavbar}>
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery/pictures/potraits" className={linkClassName} onClick={toggleNavbar}>
                    Potraits
                  </NavLink>
                </li>

              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/gallery/news" className={linkClassName} onClick={toggleNavbar}>
              News
            </NavLink>
          </li>
        </ul>
      </div>
    </li>
    
    <li>
      <NavLink to="/blog" className={linkClassName} onClick={toggleNavbar}>
        Blog
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact" className={linkClassName} onClick={toggleNavbar}>
        Contact
      </NavLink>
    </li>
  </ul>

  </motion.div>
</div>



      {/* Nav for Large Screens */}
      {/*  */}
 <div className="hidden md:flex items-center space-x-6">
  <ul className="space-x-6 flex text-lg">
    <li>
      <NavLink to="/home" className={linkClassName}>
        Home
      </NavLink>
    </li>
    <li
      className="relative"
      onMouseEnter={() => handleMouseEnter('about')}
      onMouseLeave={handleMouseLeave}
      onFocus={() => handleFocus('about')}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <NavLink to="/about" className={linkClassName}>
        <span className="flex gap-4">
          <p className="capitalize">about</p>
          <p className='w-6 text-center'>{expandedMenu === 'about' ? '-' : '+'}</p>
        </span>
      </NavLink>
      <div
        className={`overflow-hidden transition-all absolute top-full left-0 w-48 bg-black z-10 duration-500 transform-gpu origin-top 
          ${expandedMenu === 'about' ? 'rotateX(0deg) max-h-screen opacity-100' : 'rotateX(-90deg) max-h-0 opacity-0'}`}
        style={{
          transform: expandedMenu === 'about' ? 'rotateX(0deg)' : 'rotateX(-90deg)',
          transition: 'transform 0.5s ease, opacity 0.5s ease, max-height 0.5s ease',
        }}
      >
        <ul className="mt-4 py-4 px-4 text-sm font-normal text-left flex flex-col gap-2 capitalize">
          <li>
            <NavLink to="/about/profile" className={linkClassName}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/my-work" className={linkClassName}>
              My Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/education" className={linkClassName}>
              Education
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/fellowships-and-scholarships" className={linkClassName}>
              Fellowships and Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/about/awards-and-recognitions" className={linkClassName}>
              Awards and Recognitions
            </NavLink>
          </li>
        </ul>
      </div>
    </li>

    {/* Writings Menu */}
    <li
      className="relative"
      onMouseEnter={() => handleMouseEnter('writings')}
      onMouseLeave={handleMouseLeave}
      onFocus={() => handleFocus('writings')}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <NavLink to="/writings" className={linkClassName}>
        <span className="flex gap-4">
          <p className="capitalize">writings</p>
          <p className='w-6 text-center'>{expandedMenu === 'writings' ? '-' : '+'}</p>
        </span>
      </NavLink>
      <div
        className={`overflow-hidden transition-all absolute top-full left-0 w-48 bg-black z-10 duration-500 transform-gpu origin-top 
          ${expandedMenu === 'writings' ? 'rotateX(0deg) max-h-screen opacity-100' : 'rotateX(-90deg) max-h-0 opacity-0'}`}
        style={{
          transform: expandedMenu === 'writings' ? 'rotateX(0deg)' : 'rotateX(-90deg)',
          transition: 'transform 0.5s ease, opacity 0.5s ease, max-height 0.5s ease',
        }}
      >
        <ul className="mt-4 py-4 px-4 text-sm font-normal text-left flex flex-col gap-2 capitalize">
          <li>
            <NavLink to="/writings/papers" className={linkClassName}>
              papers
            </NavLink>
          </li>
          <li>
            <NavLink to="/writings/textbooks" className={linkClassName}>
             Textbooks
            </NavLink>
          </li>
          <li>
            <NavLink to="/writings/manuals" className={linkClassName}>
             manuals
            </NavLink>
          </li>
        </ul>
      </div>
    </li>

    {/* Gallery Menu */}
   
    <li
  className="relative"
  onMouseEnter={() => handleMouseEnter('gallery')}
  onMouseLeave={handleMouseLeave}
  onFocus={() => handleFocus('gallery')}
  onBlur={handleBlur}
  tabIndex={0}
>
  <NavLink to="/gallery/videos" className={linkClassName}>
    <span className="flex gap-4">
      <p className="capitalize">gallery</p>
      <p className='w-6 text-center'>{expandedMenu === 'gallery' ? '-' : '+'}</p>
    </span>
  </NavLink>
  
  <div
    className={`transition-all absolute top-full left-0 w-48 bg-black z-10 duration-500 transform-gpu origin-top 
      ${expandedMenu === 'gallery' ? 'rotateX(0deg) max-h-screen opacity-100' : 'rotateX(-90deg) max-h-0 opacity-0'}`}
    style={{
      transform: expandedMenu === 'gallery' ? 'rotateX(0deg)' : 'rotateX(-90deg)',
      transition: 'transform 0.5s ease, opacity 0.5s ease, max-height 0.5s ease',
    }}
  >
    <ul className="mt-4 py-4 px-4 text-sm font-normal text-left flex flex-col gap-2 capitalize">
      <li>
        <NavLink to="/gallery/videos" className={linkClassName}>
          Videos
        </NavLink>
      </li>
      <li
  className="relative"
  onMouseEnter={() => setExpandedSubMenu('pictures')}
  onMouseLeave={() => setExpandedSubMenu(null)}
  onFocus={() => setExpandedSubMenu('pictures')}
  onBlur={() => setExpandedSubMenu(null)}
  tabIndex={0}
>
  <NavLink to="/gallery/pictures/field-work" className={linkClassName}>
    Pictures
  </NavLink>

  <div
    className={`transition-all absolute top-0 -left-44 w-fit bg-black z-20 duration-500 origin-top 
      ${expandedSubMenu === 'pictures' ? 'rotateX(0deg) max-h-screen opacity-100' : 'rotateX(-90deg) max-h-0 opacity-0'}`}
    style={{
      transform: expandedSubMenu === 'pictures' ? 'rotateX(0deg)' : 'rotateX(-90deg)',
      transition: 'transform 0.5s ease, opacity 0.5s ease, max-height 0.5s ease',
    }}
  >
    <ul className="ml-4 mt-2 space-y-2 ">
      <li>
        <NavLink to="/gallery/pictures/field-work" className={linkClassName}>
          Field Work
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery/pictures/campaigns" className={linkClassName}>
          Campaigns
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery/pictures/graduations" className={linkClassName}>
          Graduations
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery/pictures/speaking-engagements" className={linkClassName}>
          Speaking Engagements
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery/pictures/events" className={linkClassName}>
          Events
        </NavLink>
      </li>

      <li>
                  <NavLink to="/gallery/pictures/potraits" className={linkClassName} onClick={toggleNavbar}>
                    Potraits
                  </NavLink>
                </li>
    </ul>
  </div>
</li>


      <li>
        <NavLink to="/gallery/news" className={linkClassName}>
          News
        </NavLink>
      </li>
    </ul>
  </div>
</li>








    <li>
      <NavLink to="/blog" className={linkClassName}>
        Blog
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact" className={linkClassName}>
        Contact
      </NavLink>
    </li>
  </ul>
</div>

    </nav>
  );
};

export default Navbar;
