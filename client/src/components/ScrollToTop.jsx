import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleClick} className="scroll-to-top">
      <FiArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
