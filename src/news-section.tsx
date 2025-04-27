import { useState, useEffect, useRef } from "react";

import { List, Grid2X2, Grid3X3, Search, Filter } from "lucide-react"; // use icon library like lucide
import NewsCard from "./news-card";
import { Article } from "./newsService";
import FilterOptions from "./FilterOptions";

interface NewsSectionProps {
  title: string;
  articles: Article[];
}

interface FilterOption {
  dateAscending?: boolean;
  subCategory?: string[];
  source?: string;
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [showOptions, setShowOptions] = useState(false);
  const [showSearchFlag, setSearchFlag] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [columns, setColumns] = useState(1);
  const [filteredArticles, setVisibleArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState<FilterOption>({});
  // console.log(1, JSON.parse(JSON.stringify(articles)))
  // console.log(2, JSON.parse(JSON.stringify(filteredArticles)))
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  // console.log(3, visibleArticles)
  const hasMore = visibleCount < articles.length;

  useEffect(() => {
    // only reset if no filters applied
    if (!hasValidFields(filters)) {
      setVisibleArticles(articles);
    }
  }, [articles]);

  const handleFilterChange = (updatedFilter: FilterOption) => {
    setFilters(updatedFilter);
    if (hasValidFields(updatedFilter)) {
      filterArticles(updatedFilter)
    }
    console.log(filters)
    // console.log("Updated Filters:", updatedFilter); // debugging
  };

  function hasValidFields(obj: Record<string, any>): boolean {
    return Object.entries(obj).some(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined || !value;
    });
  }

  // filter: date, news source
  // search: match words of various weights
  const filterArticles = (filterOption: FilterOption): void => {
    console.log('filtering')
    let filteredArticles = [...articles];
    // sort by date
    if (filterOption.dateAscending !== undefined) {
      const direction = filterOption.dateAscending ? 1 : -1;
      filteredArticles.sort((a, b) => {
        if (a.date && b.date) {
          return direction * (new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        else if (a.date) {
          return direction
        }
        else if (b.date) {
          return -direction
        }
        return 0;
      })
    }

    // sort by sub category
    if (filterOption.subCategory && filterOption.subCategory.length > 0) {
      const subCategory = new Set(filterOption.subCategory)
      filteredArticles = articles.filter(article => {
        if (article.subCategory) {
          return article.subCategory.some(category => subCategory.has(category))
        }
        return false
      })
    }

    // sort by keyword
    if (filterOption.source) {
      filteredArticles = articles.filter(article => article.source === filterOption.source)
    }
    setVisibleArticles(filteredArticles);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    let filteredArticles = [...articles]
    if (value.length > 0) {
      filteredArticles = filteredArticles.filter((article: Article) =>
        article.title?.toLowerCase().includes(value.toLowerCase()) ||
        article.body.toLowerCase().includes(value.toLowerCase()) ||
        article.longBody?.toLowerCase().includes(value.toLowerCase()) ||
        article.category?.toLowerCase().includes(value.toLowerCase()) ||
        article.subCategory?.some(sub => sub.toLowerCase().includes(value.toLowerCase()))
      );
      console.log('filtered', filteredArticles)
      setVisibleArticles(filteredArticles);
    } else {
      setVisibleArticles(articles)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        if (hasMore) showMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
        setShowFilterOptions(false);
        setSearchFlag(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (showFilterOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (showSearchFlag) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions, showFilterOptions, showSearchFlag]);

  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      default:
        return "grid-cols-1"; // fallback
    }
  };

  // Helper to get current icon
  const getActiveIcon = () => {
    if (columns === 1)
      return <List className={`w-5 h-5 hover:text-black cursor-pointer`} />;
    if (columns === 2)
      return <Grid2X2 className={`w-5 h-5 hover:text-black cursor-pointer`} />;
    return <Grid3X3 className={`w-5 h-5 hover:text-black cursor-pointer`} />;
  };

  return (
    <div className="mb-16 w-full">
      {/* Debug text */}
      {/* <pre className="text-black">{JSON.stringify(filters, null, 2)}</pre> */}

      <div className="flex justify-end items-center mb-4 ">
        {/* <h2 className="text-2xl font-bold text-gray-900">
          {title.toUpperCase()}
        </h2> */}
        <div className="relative" ref={toggleRef}>
          {/* Search button */}
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={()=> {setSearchFlag((prev) => !prev)
              setShowOptions(false)
              setShowFilterOptions(false)
            }
            }
          >
            <Search className="w-5 h-5 hover:text-black cursor-pointer"></Search>
          </button>

          {/* Filter button */}
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => {
              // filterArticles(filters)
              // setSortAscend(!sortAscend)
              setShowFilterOptions(prev => !prev)
              setShowOptions(false)
              setSearchFlag(false)
            }}
          >
            <Filter className="w-5 h-5 hover:text-black cursor-pointer"></Filter>
          </button>

          {/* Grid button */}
          <button
            onClick={() => {setShowOptions((prev) => !prev)
              setShowFilterOptions(false)
              setSearchFlag(false)
            }}
            className="p-2 border rounded hover:bg-gray-100"
          >
            {getActiveIcon()}
          </button>

          {/* Search popup */}
          {showSearchFlag && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded p-2 flex flex-col gap-2 border z-20 w-72">
              <div className="text-black flex items-center space-x-4">
                <label htmlFor="source" className="w-24">Search</label>
                <input
                  type="text"
                  id="search"
                  className="bg-gray-100 px-2 py-1 rounded flex-1"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          )}

          {/* Filter popup options */}
          {showFilterOptions && (
            <FilterOptions onChange={handleFilterChange}/>
          )}

          {/* Dropdown Options */}
          {showOptions && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded p-1 flex gap-1 border z-20">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setColumns(val);
                    setShowOptions(false);
                  }}
                  className={`p-2 hover:bg-gray-100 rounded ${columns === val ? "bg-blue-100" : ""
                    }`}
                >
                  {val === 1 && <List className="w-5 h-5" />}
                  {val === 2 && <Grid2X2 className="w-5 h-5" />}
                  {val === 3 && <Grid3X3 className="w-5 h-5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div ref={containerRef} className={`grid gap-4 w-full ${getGridClass()}`}>
        {visibleArticles.map((article, index) => (
          <NewsCard
            key={index}
            title={`${article.title ?? ""}`}
            subCategory={article.subCategory ?? []}
            body={article.body}
            longBody={article.longBody}
            date={article.date ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
