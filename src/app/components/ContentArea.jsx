import React from 'react';

const ContentArea = ({ 
  subcategory, 
  getQuoteLink = "#", 
  bookOnlineLink = "#",
  getQuoteText = "GET A QUOTE",
  bookOnlineText = "BOOK ONLINE"
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
      <figure className="mb-8">
        <img
          src={subcategory.image || "/api/placeholder/600/400"}
          alt={subcategory.title}
          className="w-full h-96 object-cover"
        />
      </figure>

      <div className="space-y-6">
        <h2 className="font-light leading-tight font-euclid" style={{ fontSize: 'clamp(1.25rem, 1rem + 2vw, 3.5rem)' }}>
          {subcategory.title}
        </h2>
        <p className="text-gray-300 leading-relaxed text-sm">
          {subcategory.description}
        </p>
        <div className="flex gap-4 pt-4">
          <a
            href={getQuoteLink}
            className="px-8 py-3 bg-[#A7A86E] text-white rounded-full font-medium text-sm border border-[#A7A86E] hover:bg-transparent hover:text-[#A7A86E] transition-all duration-300"
          >
            {getQuoteText}
          </a>
          <a
            href={bookOnlineLink}
            className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm border border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            {bookOnlineText}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ContentArea;