import React from 'react';
import Link from 'next/link';

const Navigation = ({ activeCategory, onCategoryChange, isMobile = false, categories, isRouted = false }) => {
  // Fallback categories if not provided
  const defaultCategories = [
    { key: 'experience', label: 'EXPERIENCE', icon: null, href: '/experience' },
    { key: 'care', label: 'WE CARE', icon: null, href: '/we-care' },
    { key: 'safety', label: 'SAFETY', icon: null, href: '/safety' }
  ];

  const categoryList = categories || defaultCategories;

  if (isMobile) {
    return (
      <nav aria-label="Category navigation">
        <ul className="flex flex-wrap justify-center gap-3 mb-8 list-none">
          {categoryList.map((category) => {
            const isActive = activeCategory === category.key;

            const buttonContent = (
              <>
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt=""
                    className="w-5 h-5"
                    style={{
                      filter: isActive
                        ? 'brightness(0) saturate(100%) invert(70%) sepia(12%) saturate(1084%) hue-rotate(58deg) brightness(94%) contrast(88%)'
                        : 'brightness(0) invert(1)'
                    }}
                  />
                ) : (
                  <span aria-hidden="true">🔸</span>
                )}
                {category.label}
              </>
            );

            const buttonClasses = `min-w-[158px] px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
              isActive
                ? 'bg-transparent border-[#A7A86E] text-[#A7A86E]'
                : 'bg-transparent border-white text-white'
            }`;

            return (
              <li key={category.key}>
                {isRouted ? (
                  <Link
                    href={category.href}
                    className={buttonClasses}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {buttonContent}
                  </Link>
                ) : (
                  <button
                    onClick={() => onCategoryChange(category.key)}
                    className={buttonClasses}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {buttonContent}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="flex justify-center py-8" aria-label="Category navigation">
      <ul className="flex bg-[#0a0a0a] backdrop-blur-sm rounded-full px-6 border border-[#424242] list-none gap-6">
        {categoryList.map((category) => {
          const isActive = activeCategory === category.key;

          const buttonContent = (
            <span className="relative py-3 block">
              <span className="text-sm font-medium transition-all duration-300 flex items-center gap-2">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt=""
                    className="w-5 h-5"
                    style={{
                      filter: isActive
                        ? 'brightness(0) saturate(100%) invert(70%) sepia(12%) saturate(1084%) hue-rotate(58deg) brightness(94%) contrast(88%)'
                        : 'brightness(0) invert(0.6)'
                    }}
                  />
                ) : (
                  <span className="text-lg" aria-hidden="true">🔸</span>
                )}
                <span className={isActive ? 'text-[#A7A86E]' : 'text-gray-300 hover:text-white'}>
                  {category.label}
                </span>
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A7A86E]" aria-hidden="true"></span>
              )}
            </span>
          );

          return (
            <li key={category.key}>
              {isRouted ? (
                <Link
                  href={category.href || '#'}
                  className="block hover:cursor-pointer"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {buttonContent}
                </Link>
              ) : (
                <button
                  onClick={() => onCategoryChange && onCategoryChange(category.key)}
                  className="block"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {buttonContent}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
