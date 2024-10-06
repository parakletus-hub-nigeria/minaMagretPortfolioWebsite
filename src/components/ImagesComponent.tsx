import React, { useEffect, useState } from 'react';
import ImageViewer from './ImageViewerComponent';
import { urlFor } from '../../sanityApiClient/sanityClient';
import WholePageSpinner from './WholePageSpinner';

interface ImagesComponentProps {
  images: { _id: string; url: string; title: string; description: string }[]; // Assuming images are objects with URL, title, and description
}

const ImagesComponent: React.FC<ImagesComponentProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const totalImages = images.length;

  useEffect(() => {
    const handleImageLoad = () => {
      setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    // Preload images and keep track of their load state
    const imageUrls: string[] = images.map((image) => {
      const imgUrl = urlFor(image._id).width(1920).quality(80).format('webp').url(); // Use _id directly from images
      const img = new Image();
      img.src = imgUrl;
      img.onload = handleImageLoad; // Increment loaded count when each image is loaded
      img.onerror = handleImageLoad; // Increment count even on error
      return imgUrl;
    });

    setPreloadedImages(imageUrls); // Store the preloaded image URLs

    return () => {
      // Cleanup if necessary
    };
  }, [images]);

  // Loading state while images are being loaded
  if (loadedImagesCount < totalImages) {
    <div className='z-[999]'>
        <WholePageSpinner/>
      </div>
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {preloadedImages.map((imageUrl, index) => (
          <div key={images[index]._id} className="cursor-pointer" onClick={() => {
            setCurrentIndex(index);
            setIsOpen(true);
          }}>
            <img
              src={imageUrl}
              alt={images[index].title || `Thumbnail ${index + 1}`} // Use title or fallback for alt text
              className="w-full h-auto object-cover rounded-md shadow"
            />
          </div>
        ))}
      </div>

      {/* Image Viewer */}
      {isOpen && (
        <ImageViewer
          images={preloadedImages}
          currentIndex={currentIndex}
          closeViewer={() => setIsOpen(false)}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
};

export default ImagesComponent;
