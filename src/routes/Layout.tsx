import React, { useEffect, useState } from 'react';
import { Outlet, LoaderFunction, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Navbar from '../components/Navbar'; // Adjust the path as needed
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';
import Footer from '../components/Footer';
import { urlFor } from '../../sanityApiClient/sanityClient'; // Ensure you import the urlFor function

// Define the type for the asset
interface BackgroundImageAsset {
  _id: string; // Optional: include if you want to identify the asset
  url: string; // The URL for the background image
}

// Define the type for the background image structure
interface BackgroundImage {
  image: {
    asset: BackgroundImageAsset; // The asset containing the image URL
  };
}

// Define the type for the data returned from the loader
interface LayoutLoaderData {
  backgroundImage: BackgroundImage[]; // Array of BackgroundImage
}

// Define the loader function
export const LayoutLoader: LoaderFunction = async () => {
  try {
    const backgroundImage = await fetchBackgroundImage();

    if (!backgroundImage || backgroundImage.length === 0) {
      throw new Error('Background image not found');
    }

    return { backgroundImage };
  } catch (error) {
    throw new Response('Failed to load one or more images', { status: 500 });
  }
};

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  const { backgroundImage } = useLoaderData() as LayoutLoaderData;

  useEffect(() => {
    // Generate the image URL using urlFor
    const bgImageUrl = urlFor(backgroundImage[0]?.image?.asset?._id).quality(75).format('webp').url();
    
    // Set background image URL in state
    setBackgroundImageUrl(bgImageUrl);

    let timeoutId: NodeJS.Timeout | undefined; // Explicitly type timeoutId

    const handleScroll = () => {
      // Clear the previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to debounce
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY;

        // Show/hide navbar background based on scroll
        setIsScrolled(scrollTop > 40);

        // Show/hide scroll-to-top button
        setShowScrollToTop(scrollTop > 200);
      }, 100); // Adjust the delay as needed
    };

    window.addEventListener('scroll', handleScroll);

    // Preload the background image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = bgImageUrl; // Preload the image so that it can be fetched quickly
    link.as = 'image';
    document.head.appendChild(link);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the timeout on unmount
      }
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(link); // Clean up the link element on unmount
    };
  }, [backgroundImage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh", 
      }}
    >
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-black shadow-md" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Navbar />
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] p-4 pb-16">
        <Outlet />
      </main>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        >
          <MdOutlineKeyboardArrowUp size={20} />
        </button>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-gray-900 text-center py-2">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
