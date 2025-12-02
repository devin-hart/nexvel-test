import React from 'react';
import { fetchTransportationData } from '../../utils/graphql-queries';
import CategoryPage from '../components/CategoryPage';

export const metadata = {
  title: 'Safety - ABC Transportation | Certified Drivers & Accountability',
  description: 'Our commitment to safety through certified professional drivers and comprehensive accountability measures ensures secure transportation for all passengers.',
  keywords: 'transportation safety, certified drivers, professional drivers, accountability, secure transport',
  openGraph: {
    title: 'Safety - ABC Transportation',
    description: 'Safe and secure transportation with certified drivers and comprehensive accountability measures.',
    type: 'website',
    url: 'https://yourdomain.com/safety',
  },
};

export default async function SafetyPage() {
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
          <h1>Safety - ABC Transportation</h1>
          <p>Loading safety information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "ABC Transportation Safety",
            "description": "Safe and secure transportation services with certified drivers and comprehensive accountability measures.",
            "provider": {
              "@type": "Organization",
              "name": "ABC Transportation"
            },
            "serviceType": "Safe Transportation",
            "offers": data.categories.safety.subcategories && Object.values(data.categories.safety.subcategories).map(sub => ({
              "@type": "Offer",
              "name": sub.title,
              "description": sub.description
            }))
          })
        }}
      />
      
      <CategoryPage 
        data={data}
        activeCategory="safety"
        categoryTitle="Safety"
      />
    </>
  );
}