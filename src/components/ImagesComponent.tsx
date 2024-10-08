import React, { useEffect, useState } from 'react';
import { urlFor } from '../../sanityApiClient/sanityClient';
import ImageViewer from './ImageViewerComponent';
import WholePageSpinner from './WholePageSpinner';
import { useAuthorContext } from '../hooks/AuthorContext';

interface Image {
  _id: string;
  url: string;
  title: string;
  description: string;
}

interface ImagesComponentProps {
  images: Image[]; 
}

const ImagesComponent: React.FC<ImagesComponentProps> = ({ images }) => {
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const totalImages = images.length; 
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {authorName} = useAuthorContext();

  useEffect(() => {
    const handleImageLoad = () => {
      setLoadedImagesCount((prevCount) => prevCount + 1);
    };

   
    const imageUrls: string[] = images.map((image) => {
      const imgUrl = image.url;
      const img = new Image();
      img.src = imgUrl;
      img.onload = handleImageLoad; 
      img.onerror = handleImageLoad;
      return imgUrl;
    });

    setPreloadedImages(imageUrls); 

    return () => {
     
    };
  }, [images]);

 
  if (loadedImagesCount < totalImages) {
    return (
      
        <WholePageSpinner />
      
    );
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
              alt={`Portrait of ${images[index].title} of ${authorName}`}
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
