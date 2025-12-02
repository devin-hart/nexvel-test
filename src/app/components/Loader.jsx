import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-[#A7A86E] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
