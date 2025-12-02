import React from 'react';

const Hero = ({ title, subtitle, titleSuffix, description }) => {
  return (
    <header className='mb-8'>
      <h1 className="font-libre font-light mb-2 tracking-wide leading-none">
        <span
          className="block"
          style={{ fontSize: 'clamp(2.25rem, 1rem + 5vw, 5.625rem)' }}
        >
          {title}
        </span>
        <span
          className="block text-[#A7A86E] italic font-libre font-light mb-2"
          style={{ fontSize: 'clamp(1.5rem, 1rem + 2.5vw, 3.75rem)' }}
        >
          {subtitle}
        </span>
        <span
          className="block font-libre font-light"
          style={{ fontSize: 'clamp(2.25rem, 1rem + 5vw, 5.625rem)' }}
        >
          {titleSuffix}
        </span>
      </h1>
      <p className="text-gray-300 leading-relaxed max-w-md text-sm font-euclid mt-6">
        {description}
      </p>
    </header>
  );
};

export default Hero;
