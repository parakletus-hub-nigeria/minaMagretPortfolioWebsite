import React from 'react';

const WholePageSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-300"></div>
    </div>
  );
};

export default WholePageSpinner;
