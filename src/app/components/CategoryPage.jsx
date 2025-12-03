'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import SubcategoryList from './SubcategoryList';
import ContentArea from './ContentArea';
import Loader from './Loader';

const CategoryPage = ({ data, activeCategory, categoryTitle }) => {
  // 1. Calculate the defaults synchronously before state initialization
  // This prevents the need for a useEffect to set "initial" values
  let defaultKey = null;
  let defaultData = null;

  if (data && data.categories[activeCategory]?.subcategories) {
    const subcategoryEntries = Object.entries(data.categories[activeCategory].subcategories);
    if (subcategoryEntries.length > 0) {
      defaultKey = subcategoryEntries[0][0];
      defaultData = subcategoryEntries[0][1];
    }
  }

  // 2. Initialize state with the calculated defaults
  const [activeSubcategory, setActiveSubcategory] = useState(defaultKey);
  const [activeAccordion, setActiveAccordion] = useState(defaultKey);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState(defaultData);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log(
      `%c
▓█████▄ ▓█████ ██▒   █▓ ██▓ ███▄    █ 
▒██▀ ██▌▓█   ▀▓██░   █▒▓██▒ ██ ▀█   █ 
░██   █▌▒███   ▓██  █▒░▒██▒▓██  ▀█ ██▒
░▓█▄   ▌▒▓█  ▄  ▒██ █░░░██░▓██▒  ▐▌██▒
░▒████▓ ░▒████▒  ▒▀█░  ░██░▒██░   ▓██░
 ▒▒▓  ▒ ░░ ▒░ ░  ░ ▐░  ░▓  ░ ▒░   ▒ ▒ 
 ░ ▒  ▒  ░ ░  ░  ░ ░░   ▒ ░░ ░░   ░ ▒░
 ░ ░  ░    ░       ░░   ▒ ░   ░   ░ ░ 
   ░       ░  ░     ░   ░           ░ 
 ░                 ░                  
 ██░ ██  ▄▄▄       ██▀███  ▄▄▄█████▓  
▓██░ ██▒▒████▄    ▓██ ▒ ██▒▓  ██▒ ▓▒  
▒██▀▀██░▒██  ▀█▄  ▓██ ░▄█ ▒▒ ▓██░ ▒░  
░▓█ ░██ ░██▄▄▄▄██ ▒██▀▀█▄  ░ ▓██▓ ░   
░▓█▒░██▓ ▓█   ▓██▒░██▓ ▒██▒  ▒██▒ ░   
 ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒▓ ░▒▓░  ▒ ░░     
 ▒ ░▒░ ░  ▒   ▒▒ ░  ░▒ ░ ▒░    ░      
 ░  ░░ ░  ░   ▒     ░░   ░   ░        
 ░  ░  ░      ░  ░   ░                
                                      
NeXVel Solutions Test Site

%cThanks for taking the time to check out my test site.
Hopefully it passes the test and we'll have an opportunity to work together.

Check out more of my work here: %chttps://www.devinh.art/
%cContact: %cdevohart@gmail.com %c- %c215-688-7294
`,
      'color: #39ff14; font-weight: bold;', // Neon Green Art
      'color: inherit;',
      'color: magenta; font-weight: bold;',
      'color: inherit;',
      'color: magenta; font-weight: bold;',
      'color: inherit;',
      'color: magenta; font-weight: bold;'
    );

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    { key: 'experience', label: data.categories.experience.label, icon: data.categories.experience.icon, iconAlt: data.categories.experience.iconAlt, href: '/experience' },
    { key: 'care', label: data.categories.care.label, icon: data.categories.care.icon, iconAlt: data.categories.care.iconAlt, href: '/we-care' },
    { key: 'safety', label: data.categories.safety.label, icon: data.categories.safety.icon, iconAlt: data.categories.safety.iconAlt, href: '/safety' }
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
        <main className="pt-16 px-4 pb-16">
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

            <section className='max-w-[803px]' aria-live="polite">
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