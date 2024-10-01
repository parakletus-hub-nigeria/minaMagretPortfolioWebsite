
import React, { useState } from 'react';
import ImageViewer from './ImageViewerComponent';

interface ImagesComponentProps {
  images: { url: string; title: string; description: string }[]; // Assuming images are objects with URL, title, and description
}

const ImagesComponent: React.FC<ImagesComponentProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeViewer = () => {
    setIsOpen(false);
  };

  return (
    <div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer" onClick={() => openViewer(index)}>
            <img
              src={image.url}
              alt={image.title || `Thumbnail ${index + 1}`} // Accessible alt text
              className="w-full h-auto object-cover rounded-md shadow"
            />
            
          </div>
        ))}
      </div>

      {/* Image Viewer */}
      {isOpen && (
        <ImageViewer
          images={images.map(img => img.url)}
          currentIndex={currentIndex}
          closeViewer={closeViewer}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
};

export default ImagesComponent;
