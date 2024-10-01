import React from 'react';
interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  closeViewer: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, currentIndex, closeViewer, setCurrentIndex }) => {
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Handler to close the viewer if clicked outside the image
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click is outside the image by comparing the clicked target with the image container
    if ((e.target as HTMLElement).id === 'image-viewer-background') {
      closeViewer();
    }
  };

  return (
    <div
      id="image-viewer-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0  bg-black bg-opacity-80 z-50 flex items-center justify-center   "
    >
<div className='max-h-[620px] max-w-[948px] relative flex justify-center items-center border-white border-8 rounded-[6px] '>
  {/* Close Button */}
  <button
  onClick={closeViewer}
  className="absolute -top-6 -right-6 text-[#6c757d] bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl z-50"
>
  &times;
</button>


  {/* Left Arrow Button */}
  <button
    onClick={goToPrevious}
    className="absolute -left-12 text-[#6c757d] text-3xl z-50 py-4 px-2  bg-white rounded-[6px] focus:outline-none  transition ease-in-out"
  >
    &#8592;
  </button>

  {/* Right Arrow Button */}
  <button
    onClick={goToNext}
    className="absolute -right-12 text-[#6c757d] text-3xl z-50 py-4 px-2 bg-white rounded-[6px] focus:outline-none  transition ease-in-out"
  >
    &#8594;
  </button>

  {/* Image */}
  <div className="relative w-full h-full flex flex-col justify-center items-center">
    <img
      src={images[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
      className="w-full h-full max-h-[600px] max-w-[928px] object-contain rounded-lg"
    />
 
  </div>
</div>

   
    </div>
  );
};

export default ImageViewer;
