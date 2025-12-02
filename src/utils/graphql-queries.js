// GraphQL queries for Transportation Experience

export const GET_TRANSPORTATION_EXPERIENCE = `
  query GetTransportationExperience {
    transportationExperiences {
      nodes {
        id
        title
        transportationExperienceOrganized {
          heroSection {
            title
            subtitle
            titleSuffix
            description
          }
          experienceCategory {
            label
            icon {
              node {
                sourceUrl
                altText
              }
            }
            subcategories {
              title
              description
              icon {
                node {
                  sourceUrl
                  altText
                }
              }
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          careCategory {
            label
            icon {
              node {
                sourceUrl
                altText
              }
            }
            subcategories {
              title
              description
              icon {
                node {
                  sourceUrl
                  altText
                }
              }
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          safetyCategory {
            label
            icon {
              node {
                sourceUrl
                altText
              }
            }
            subcategories {
              title
              description
              icon {
                node {
                  sourceUrl
                  altText
                }
              }
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          globalSettings {
            getQuoteLink
            getQuoteText
            bookOnlineLink
            bookOnlineText
          }
        }
      }
    }
  }
`;

// Helper function to fetch from WordPress GraphQL
export async function fetchTransportationData() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://wordpress-321502-6033953.cloudwaysapps.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_TRANSPORTATION_EXPERIENCE
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL query failed');
    }

    return transformWordPressData(data.data.transportationExperiences.nodes[0]);
  } catch (error) {
    console.error('Error fetching transportation data:', error);
    throw error;
  }
}

// Transform WordPress data to match our component structure
function transformWordPressData(wpData) {
  const fields = wpData.transportationExperienceOrganized;
  
  return {
    hero: {
      title: fields.heroSection?.title || "THE ABC",
      subtitle: fields.heroSection?.subtitle || "Transportation", 
      titleSuffix: fields.heroSection?.titleSuffix || "EXPERIENCE",
      description: fields.heroSection?.description || ""
    },
    categories: {
      experience: {
        label: fields.experienceCategory?.label || "EXPERIENCE",
        icon: fields.experienceCategory?.icon?.node?.sourceUrl || null,
        iconAlt: fields.experienceCategory?.icon?.node?.altText || "",
        subcategories: transformSubcategories(fields.experienceCategory?.subcategories || [])
      },
      care: {
        label: fields.careCategory?.label || "WE CARE",
        icon: fields.careCategory?.icon?.node?.sourceUrl || null,
        iconAlt: fields.careCategory?.icon?.node?.altText || "",
        subcategories: transformSubcategories(fields.careCategory?.subcategories || [])
      },
      safety: {
        label: fields.safetyCategory?.label || "SAFETY",
        icon: fields.safetyCategory?.icon?.node?.sourceUrl || null,
        iconAlt: fields.safetyCategory?.icon?.node?.altText || "",
        subcategories: transformSubcategories(fields.safetyCategory?.subcategories || [])
      }
    },
    globalSettings: {
      getQuoteLink: fields.globalSettings?.getQuoteLink === "https://devin-hart-nexvel-test.netlify.app/#"
        ? "#"
        : fields.globalSettings?.getQuoteLink || "#",
      getQuoteText: fields.globalSettings?.getQuoteText || "GET A QUOTE",
      bookOnlineLink: fields.globalSettings?.bookOnlineLink === "https://devin-hart-nexvel-test.netlify.app/#"
        ? "#"
        : fields.globalSettings?.bookOnlineLink || "#",
      bookOnlineText: fields.globalSettings?.bookOnlineText || "BOOK ONLINE"
    }
  };
}

function transformSubcategories(subcategories) {
  const transformed = {};

  subcategories.forEach((sub, index) => {
    const key = sub.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || `subcategory-${index}`;
    transformed[key] = {
      title: sub.title || "",
      description: sub.description || "",
      icon: sub.icon?.node?.sourceUrl || null,
      iconAlt: sub.icon?.node?.altText || "",
      image: sub.image?.node?.sourceUrl || "/api/placeholder/600/400",
      imageAlt: sub.image?.node?.altText || ""
    };
  });

  return transformed;
}