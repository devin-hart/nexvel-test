'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import SubcategoryList from './SubcategoryList';
import ContentArea from './ContentArea';
import Loader from './Loader';

const CategoryPage = ({ data, activeCategory, categoryTitle }) => {
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set default active subcategory and accordion when page loads
    if (data && data.categories[activeCategory]?.subcategories) {
      const subcategoryEntries = Object.entries(data.categories[activeCategory].subcategories);
      if (subcategoryEntries.length > 0) {
        const [firstKey, firstData] = subcategoryEntries[0];
        setActiveSubcategory(firstKey);
        setSelectedSubcategoryData(firstData);
        setActiveAccordion(firstKey); // Set the first accordion item to be open on mobile
      }
    }
  }, [data, activeCategory]);

  const handleSubcategoryChange = (key, subcategoryData) => {
    setActiveSubcategory(key);
    setSelectedSubcategoryData(subcategoryData);
  };

  const handleAccordionToggle = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  if (!data) {
    return <Loader />;
  }

  const currentSubcategories = data.categories[activeCategory]?.subcategories || {};
  
  // Build navigation with current page active
  const categories = [
    { key: 'experience', label: data.categories.experience.label, icon: data.categories.experience.icon, href: '/experience' },
    { key: 'care', label: data.categories.care.label, icon: data.categories.care.icon, href: '/we-care' },
    { key: 'safety', label: data.categories.safety.label, icon: data.categories.safety.icon, href: '/safety' }
  ];

  return (
    <div className="min-h-screen bg-black text-white animate-fadeIn">
      {!isMobile && (
        <Navigation 
          activeCategory={activeCategory}
          categories={categories}
          isRouted={true}
        />
      )}
      
      {isMobile ? (
        <main className="pt-16 px-4 pb-24">
          <section className="mb-4">
            <Hero {...data.hero} centered={true} />
          </section>

          <section aria-label="Category Navigation">
            <Navigation 
              activeCategory={activeCategory}
              categories={categories}
              isMobile={true}
              isRouted={true}
            />
          </section>

          {/* SubcategoryList already contains a <section> tag, so no need to wrap it again */}
          <SubcategoryList
              subcategories={currentSubcategories}
              isMobile={true}
              activeAccordion={activeAccordion}
              onAccordionToggle={handleAccordionToggle}
              getQuoteLink={data.globalSettings.getQuoteLink}
              bookOnlineLink={data.globalSettings.bookOnlineLink}
              getQuoteText={data.globalSettings.getQuoteText}
              bookOnlineText={data.globalSettings.bookOnlineText}
            />
        </main>
      ) : (
        // Desktop Layout
        <main className="min-h-screen flex justify-center items-center p-8 pb-32">
          <div className="flex justify-center items-start gap-16 w-full max-w-screen-2xl mx-auto">
            <section className="pt-12" aria-labelledby="category-details">
              <h2 id="category-details" className="sr-only">{categoryTitle} Details and Options</h2>
              <Hero {...data.hero} />
              <SubcategoryList
                subcategories={currentSubcategories}
                activeSubcategory={activeSubcategory}
                onSubcategoryChange={handleSubcategoryChange}
              />
            </section>

            <section style={{ maxWidth: '803px' }} aria-live="polite">
              <ContentArea
                subcategory={selectedSubcategoryData}
                getQuoteLink={data.globalSettings.getQuoteLink}
                bookOnlineLink={data.globalSettings.bookOnlineLink}
                getQuoteText={data.globalSettings.getQuoteText}
                bookOnlineText={data.globalSettings.bookOnlineText}
              />
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default CategoryPage;