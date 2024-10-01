import React, { useEffect, useRef, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import {motion} from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';



export const LayoutLoader: LoaderFunction = async () => {
  try {
   
  
    const backgroundImage = await fetchBackgroundImage();
      
    if (!backgroundImage || backgroundImage.length === 0) {
      throw new Error('Background image not found');
    }

    return {backgroundImage};
  } catch (error) {
    throw new Response('Failed to load one or more images', { status: 500 });
  }
};



interface MousePosition {
  x: number;
  y: number;
}

const Layout: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [trackMousePosition, setTrackMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isScrolled, setIsScrolled] = useState(false); 

  const mouseMoveFunction = (event: MouseEvent) => {
    setTrackMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollTop = mainRef.current.scrollTop; 
        setIsScrolled(scrollTop > 40); 
      }
    };

    window.addEventListener('mousemove', mouseMoveFunction);
    mainRef.current?.addEventListener('scroll', handleScroll); 

    return () => {
      window.removeEventListener('mousemove', mouseMoveFunction);
      mainRef.current?.removeEventListener('scroll', handleScroll); 
    };
  }, [mainRef]);

  const variants = {
    default: {
      x: trackMousePosition.x - 16,
      y: trackMousePosition.y - 16,
    },
  };

  const {backgroundImage} = useLoaderData();

  return (
    <div
    className='absolute inset-0'
    style={{
      backgroundImage: `url(${backgroundImage[0]?.image?.asset?.url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className='flex flex-col h-screen max-w-[1200px] mx-auto'>
        <header
          className={`z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`} 
        >
          <Navbar />
        </header>
        <main ref={mainRef} className='overflow-y-scroll hidescrollbar flex-1'>
          <Outlet />
          <ScrollToTopButton containerRef={mainRef} />
        </main>
        
        <motion.div
          className='cursor bg-[#1111] w-12 h-12 rounded-full border-2 border-blue-500 fixed top-0 left-0 z-[999] pointer-events-none'
          variants={variants}
          animate="default"
        />
      </div>
    </div>
  );
};

export default Layout;
