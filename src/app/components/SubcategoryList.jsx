import React from 'react';
import Image from 'next/image';

const SubcategoryList = ({ 
  subcategories, 
  activeSubcategory, 
  onSubcategoryChange,
  isMobile = false,
  activeAccordion = null,
  onAccordionToggle = null,
  getQuoteLink = "#", 
  bookOnlineLink = "#",
  getQuoteText = "GET A QUOTE",
  bookOnlineText = "BOOK ONLINE"
}) => {
  
  if (isMobile) {
    // Mobile accordion layout
    return (
      <section aria-label="Service features">
        {Object.entries(subcategories).map(([key, subcategory]) => (
          <article key={key} className="border-b border-[#333333]">
            <h3>
              <button
                onClick={() => onAccordionToggle(key)}
                className={`w-full p-4 flex items-center text-left transition-all duration-300 cursor-pointer ${
                  activeAccordion === key
                    ? 'bg-[#111111]'
                    : 'bg-transparent'
                }`}
                aria-expanded={activeAccordion === key}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center" aria-hidden="true">
                    {subcategory.icon ? (
                      <Image
                        src={subcategory.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                        style={{
                          filter: activeAccordion === key
                            ? 'brightness(0) saturate(100%) invert(70%) sepia(12%) saturate(1084%) hue-rotate(58deg) brightness(94%) contrast(88%)'
                            : 'none'
                        }}
                      />
                    ) : (
                      <span className="text-xl opacity-80">🔸</span>
                    )}
                  </span>
                  <span className={`font-normal tracking-wide font-euclid text-xs ${
                    activeAccordion === key ? 'text-[#A7A86E]' : 'text-gray-300'
                  }`}>
                    {subcategory.title?.toUpperCase()}
                  </span>
                </span>
              </button>
            </h3>
            {activeAccordion === key && (
              <div className="p-4 bg-[#111111]">
                <figure className="mb-4">
                  <Image
                    src={subcategory.image || "/api/placeholder/600/400"}
                    alt={subcategory.title}
                    width={600}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <h4 className="font-light leading-tight font-euclid mb-4" style={{ fontSize: 'clamp(1.25rem, 1rem + 2vw, 3.5rem)' }}>{subcategory.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {subcategory.description}
                </p>
                <div className="flex gap-4">
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
            )}
          </article>
        ))}
      </section>
    );
  }

  // Desktop list layout
  return (
    <nav className="max-w-[512px]" aria-label="Service features">
      <ul className="list-none">
        {Object.entries(subcategories).map(([key, subcategory]) => (
          <li key={key}>
            <button
              onClick={() => onSubcategoryChange(key, subcategory)}
              className={`w-full text-left transition-all duration-300 p-4 border-b border-[#333333] cursor-pointer ${
                activeSubcategory === key
                  ? 'bg-[#111111]'
                  : 'bg-transparent hover:bg-[#1a1a1a]'
              }`}
              aria-current={activeSubcategory === key ? 'true' : undefined}
            >
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center" aria-hidden="true">
                  {subcategory.icon ? (
                    <Image
                      src={subcategory.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                      style={{
                        filter: activeSubcategory === key
                          ? 'brightness(0) saturate(100%) invert(70%) sepia(12%) saturate(1084%) hue-rotate(58deg) brightness(94%) contrast(88%)'
                          : 'none'
                      }}
                    />
                  ) : (
                    <span className="text-xl opacity-80">🔸</span>
                  )}
                </span>
                <span className={`font-normal tracking-wide font-euclid text-xs ${
                  activeSubcategory === key ? 'text-[#A7A86E]' : 'text-gray-300'
                }`}>
                  {subcategory.title?.toUpperCase()}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubcategoryList;