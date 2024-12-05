import { useState } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => {
  const handleClick = (e, id) => {
    if (id === 'home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClick();
  };

  return (
    <nav className="flex flex-col lg:flex-row lg:gap-8 gap-4">
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => handleClick(e, link.id)}
          className="text-neutral-400 text-sm font-medium hover:text-white transition-colors"
        >
          {link.title}
        </a>
      ))}
    </nav>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 h-16">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4">
          <a 
            href="#top" 
            onClick={scrollToTop}
            className="text-neutral-400 font-bold text-lg hover:text-white transition-colors"
          >
            Shyamnath
          </a>

          <div className="hidden lg:block">
            <NavItems />
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                }
              />
            </svg>
          </button>

          {isOpen && (
            <div className="lg:hidden fixed inset-0 top-16 bg-black/90 flex items-start justify-center pt-8">
              <NavItems onClick={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
