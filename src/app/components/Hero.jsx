import React from 'react';

const Hero = ({ title, subtitle, titleSuffix, description, centered = false }) => {
  return (
    <header className={`mb-6 ${centered ? 'text-center' : ''}`}>
      <h2 className="font-libre font-light mb-2 tracking-wide leading-none">
        <span
          className="block mb-2 text-[clamp(2.25rem,1rem+4vw,5.625rem)]"
        >
          {title}
        </span>
        <span
          className="block text-[#A7A86E] italic font-libre font-light mb-2 text-[clamp(1.5rem,1rem+2.4vw,3.75rem)]"
        >
          {subtitle}
        </span>
        <span
          className="block font-libre font-light text-[clamp(2.25rem,1rem+4vw,5.625rem)]"
        >
          {titleSuffix}
        </span>
      </h2>
      <p className={`text-gray-300 leading-relaxed max-w-md text-sm font-euclid mt-4 ${centered ? 'mx-auto' : ''}`}>
        {description}
      </p>
    </header>
  );
};

export default Hero;
