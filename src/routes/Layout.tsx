import React, { useEffect, useState } from 'react';
import { Outlet, LoaderFunction, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Navbar from '../components/Navbar'; // Adjust the path as needed
import { fetchBackgroundImage } from '../../sanityApiClient/useSanityClient';
import Footer from '../components/Footer';
import { useAuthorContext } from '../hooks/AuthorContext';
import { Helmet } from 'react-helmet';

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
const Layout:React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show/hide navbar background based on scroll
      setIsScrolled(scrollTop > 40);

      // Show/hide scroll-to-top button
      setShowScrollToTop(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { backgroundImage } = useLoaderData() as LayoutLoaderData;
  const {authorName} = useAuthorContext();
  const title = "Welcome to My Portfolio"; 
  const description = `Explore the work of ${authorName}, a passionate reader and educator. Discover projects, writings, and more.`; 
  const image = "https://cdn.sanity.io/images/cod4w9ou/production/c72faa4aa2c39e39b4f941284cd7f055ddb8e922-3889x4861.jpg"; 
  const url = "http://minaogbanga.com/"; 

 return(
<div
  className="relative min-h-screen" 
  style={{
    backgroundImage: `url(${backgroundImage[0]?.image?.asset?.url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}

 
>

<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={authorName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</Helmet>

  {/* Navbar */}
  <header
    className={`sticky top-0 z-50 transition-colors duration-300 ${
      isScrolled ? "bg-black shadow-md" : "bg-transparent"
    }`}
  >
    <div className="mx-auto max-w-[1200px]">
      <Navbar />
    </div>
  </header>

  {/* Main content */}
  <main className="mx-auto max-w-[1200px] p-4 pb-16"> {/* Add padding-bottom to prevent overlap */}
    <Outlet />
  </main>

  {/* Scroll to Top button */}
  {showScrollToTop && (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300"
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
