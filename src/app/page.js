'use client';

import { useState, useEffect } from 'react';
import { fetchTransportationData } from '../utils/graphql-queries';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SubcategoryList from './components/SubcategoryList';
import ContentArea from './components/ContentArea';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('experience');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch WordPress data
  useEffect(() => {
    async function loadData() {
      try {
        const wpData = await fetchTransportationData();
        setData(wpData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load WordPress data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set default active subcategory when category changes
    if (data && data.categories[activeCategory]?.subcategories) {
      const subcategoryEntries = Object.entries(data.categories[activeCategory].subcategories);
      if (subcategoryEntries.length > 0) {
        const [firstKey, firstData] = subcategoryEntries[0];
        setActiveSubcategory(firstKey);
        setSelectedSubcategoryData(firstData);
      }
    }
  }, [activeCategory, data]);

  const handleSubcategoryChange = (key, subcategoryData) => {
    setActiveSubcategory(key);
    setSelectedSubcategoryData(subcategoryData);
  };

  const handleAccordionToggle = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-red-400 mb-4">Error Loading Data</div>
          <div className="text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">No data found</div>
      </div>
    );
  }

  const currentSubcategories = data.categories[activeCategory]?.subcategories || {};
  const categories = [
    { key: 'experience', label: data.categories.experience.label, icon: data.categories.experience.icon, href: '/experience' },
    { key: 'care', label: data.categories.care.label, icon: data.categories.care.icon, href: '/we-care' },
    { key: 'safety', label: data.categories.safety.label, icon: data.categories.safety.icon, href: '/safety' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {!isMobile && (
        <Navigation
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isMobile={isMobile}
          categories={categories}
          isRouted={true}
        />
      )}
      
      {isMobile ? (
        // Mobile Layout
        <div className="pt-16 px-6">
          <div className="text-center mb-8">
            <Hero {...data.hero} />
          </div>

          <Navigation
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isMobile={true}
            categories={categories}
            isRouted={true}
          />

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
        </div>
      ) : (
        // Desktop Layout
        <div className="grid grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center px-12 pt-32">
            <Hero {...data.hero} />
            
            <SubcategoryList
              subcategories={currentSubcategories}
              activeSubcategory={activeSubcategory}
              onSubcategoryChange={handleSubcategoryChange}
            />
          </div>

          <div className="flex flex-col justify-center p-12">
            <ContentArea
              subcategory={selectedSubcategoryData}
              getQuoteLink={data.globalSettings.getQuoteLink}
              bookOnlineLink={data.globalSettings.bookOnlineLink}
              getQuoteText={data.globalSettings.getQuoteText}
              bookOnlineText={data.globalSettings.bookOnlineText}
            />
          </div>
        </div>
      )}
    </div>
  );
}