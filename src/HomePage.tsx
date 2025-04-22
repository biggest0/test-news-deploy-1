// app/page.tsx (Home Page)
import { useState, useEffect } from "react";
// Import the icon
import { ArrowUpIcon } from "@heroicons/react/24/solid";

import NewsSection from "./news-section";
import HeroNewsGrid from "./HeroNewsGrid";
import { getArticlesByCategory, getArticleCategories } from "./newsService";

// needs to be dynamic
const categories = getArticleCategories();

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("World");
  // --- Back to Top Button State and Effect ---
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if user has scrolled down more than one viewport height
      if (window.scrollY > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component unmounts
    // This is important to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this effect runs only once on mount and cleanup on unmount
  // --- End Back to Top Logic ---

  return (
    <main className="p-8 bg-gray-50 min-h-screen min-w-full">
      <HeroNewsGrid />
      <div className="sticky top-0 z-10 bg-gray-50">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-screen-md overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 border-b border-gray-300 px-4 min-w-max">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`cursor-pointer py-2 text-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === category
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {category.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* news sections, eg: world, tech, finance */}
      <NewsSection
        title={activeTab}
        articles={getArticlesByCategory(activeTab)}
      />

      {/* --- Back to Top Button --- */}
      {/* Conditionally render the button based on showButton state */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out z-20"
          aria-label="Back to top"
          title="Back to top" // Add title attribute for better accessibility
        >
          {/* Use the Heroicon */}
          <ArrowUpIcon/>
        </button>
      )}
      {/* --- End Back to Top Button --- */}
    </main>
  );
}
