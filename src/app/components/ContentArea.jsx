import React from 'react';
import Image from 'next/image';

const ContentArea = ({
  subcategory,
  getQuoteLink,
  bookOnlineLink,
  getQuoteText,
  bookOnlineText
}) => {
  if (!subcategory) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <p>Select a subcategory to view details</p>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <figure className="mb-10">
        <Image
          src={subcategory.image || "/api/placeholder/600/400"}
          alt={subcategory.imageAlt || subcategory.title}
          width={600}
          height={554}
          className="w-full object-cover max-h-[554px]"
        />
      </figure>

      <div className="space-y-6">
        <h2 
          className="font-light font-euclid mb-4 leading-[24px] md:leading-[60px] tracking-[0.02em] text-[clamp(1.25rem,1rem_+_2vw,3.5rem)]" 
        >
          {subcategory.title}
        </h2>
        <p className="text-gray-300 leading-relaxed text-[13px] md:text-base mb-2">
          {subcategory.description}
        </p>
        <div className="flex flex-col lg:flex-row gap-2 pt-4">
          <a
            href={getQuoteLink}
            className="flex-1 lg:flex-none lg:max-w-[188px] px-4 md:px-8 py-3 bg-[#A7A86E] text-white rounded-full font-medium text-xs md:text-sm border border-[#A7A86E] hover:bg-transparent hover:text-[#A7A86E] transition-all duration-300 text-center"
          >
            {getQuoteText}
          </a>
          <a
            href={bookOnlineLink}
            className="flex-1 lg:flex-none lg:max-w-[188px] px-4 md:px-8 py-3 bg-white text-black rounded-full font-medium text-xs md:text-sm border border-white hover:bg-transparent hover:text-white transition-all duration-300 text-center"
          >
            {bookOnlineText}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ContentArea;