import React from 'react';
import { fetchTransportationData } from '../../utils/graphql-queries';
import CategoryPage from '../components/CategoryPage';

export const metadata = {
  title: 'Experience - ABC Transportation | Premium Driver Services',
  description: 'Discover our comprehensive driver clearances, real-time GPS tracking, in-house maintenance, and wheelchair-accessible vehicles for premium transportation experiences.',
  keywords: 'transportation experience, driver clearances, GPS tracking, vehicle maintenance, accessible vehicles',
  openGraph: {
    title: 'Transportation Experience - ABC Transportation',
    description: 'Premium transportation services with professional drivers and real-time tracking.',
  },
};

export default async function ExperiencePage() {
  let data;
  
  try {
    data = await fetchTransportationData();
  } catch (error) {
    console.error('Failed to load WordPress data:', error);
    data = null;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2>Experience - ABC Transportation</h2>
          <p>Loading transportation experience information...</p>
        </div>
      </div>
    );
  }

  // Get the base URL safely
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devin-hart-nexvel-test.netlify.app';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "ABC Transportation Experience",
            "description": "Premium transportation services including comprehensive driver clearances, real-time GPS tracking, and accessible vehicles.",
            "provider": {
              "@type": "Organization",
              "name": "ABC Transportation",
              "url": baseUrl
            },
            "serviceType": "Transportation Service",
            "offers": data.categories.experience.subcategories && Object.values(data.categories.experience.subcategories).map(sub => ({
              "@type": "Offer",
              "name": sub.title,
              "description": sub.description
            }))
          })
        }}
      />
      
      <CategoryPage 
        data={data}
        activeCategory="experience"
        categoryTitle="Experience"
      />
    </>
  );
}