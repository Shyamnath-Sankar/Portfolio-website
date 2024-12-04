import { useState } from 'react';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => {
  return (
    <nav className="flex flex-col gap-4">
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={onClick}
          className="text-neutral-400 font-medium hover:text-white transition-colors"
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Shyamnath
          </a>

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

          <div className="hidden lg:block">
            <NavItems />
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 c-space">
            <NavItems onClick={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
