import React, { useEffect, useState} from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface ScrollToTopButtonProps {
  containerRef: React.RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ containerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (containerRef.current && containerRef.current.scrollTop > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', toggleVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, [containerRef]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <MdOutlineKeyboardArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
