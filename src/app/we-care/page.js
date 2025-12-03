import React from 'react';
import { fetchTransportationData } from '../../utils/graphql-queries';
import CategoryPage from '../components/CategoryPage';

export const metadata = {
  title: 'We Care - ABC Transportation | Customer-Focused Service',
  description: 'Experience our unmatched standards, easy booking system, and 24/7 customer support. We care about every aspect of your transportation experience.',
  keywords: 'customer service, transportation standards, easy booking, 24/7 support, customer care',
  openGraph: {
    title: 'We Care - ABC Transportation',
    description: 'Customer-focused transportation services with unmatched standards and 24/7 support.',
  },
};

export default async function WeCarePage() {
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
          <h2>We Care - ABC Transportation</h2>
          <p>Loading customer care information...</p>
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
            "name": "ABC Transportation Customer Care",
            "description": "Customer-focused transportation services with unmatched standards, easy booking, and 24/7 support.",
            "provider": {
              "@type": "Organization",
              "name": "ABC Transportation",
              "url": baseUrl
            },
            "serviceType": "Customer Service",
            "offers": data.categories.care.subcategories && Object.values(data.categories.care.subcategories).map(sub => ({
              "@type": "Offer",
              "name": sub.title,
              "description": sub.description
            }))
          })
        }}
      />
      
      <CategoryPage 
        data={data}
        activeCategory="care"
        categoryTitle="We Care"
      />
    </>
  );
}