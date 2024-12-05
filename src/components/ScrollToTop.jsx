import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Reset scroll position on page load
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
