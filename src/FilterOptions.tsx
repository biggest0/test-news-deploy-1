import { useState } from "react";

interface FilterOption {
  dateAscending?: boolean;
  subCategory?: string[];
  source?: string;
}

interface FilterOptionsProps {
  onChange: (filter: FilterOption) => void;
}

function FilterOptions({ onChange }: FilterOptionsProps) {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterOption>({
    dateAscending: false,
    subCategory: [],
    source: '',
  });

  const updateFilter = (newFilter: FilterOption) => {
    setFilter(newFilter);
    onChange(newFilter); // trigger only after actual interaction
  };

  const addCategory = (category: string) => {
    if (category.trim() && !filter.subCategory?.includes(category)) {
      const updated = {
        ...filter,
        subCategory: [...(filter.subCategory || []), category],
      };
      setInputValue("");
      updateFilter(updated);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory(inputValue);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    updateFilter({ ...filter, source: value });
  };

  const handleSortChange = () => {
    updateFilter({ ...filter, dateAscending: !filter.dateAscending });
  };

  return (
    <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded p-2 flex flex-col gap-2 border z-20 w-72">
      {/* Sort by latest */}
      <div className="text-black flex items-center space-x-4">
        <label htmlFor="latest" className="w-24">Latest</label>
        <input type="checkbox" id="latest" checked={filter.dateAscending} onChange={handleSortChange} />
      </div>

      {/* Add Category */}
      <div className="text-black flex items-center space-x-4">
        <label htmlFor="category" className="w-24">Category</label>
        <input
          type="text"
          id="category"
          className="bg-gray-100 px-2 py-1 rounded flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Set Source */}
      <div className="text-black flex items-center space-x-4">
        <label htmlFor="source" className="w-24">Source</label>
        <input
          type="text"
          id="source"
          className="bg-gray-100 px-2 py-1 rounded flex-1"
          onChange={handleSourceChange}
        />
      </div>

      {/* Optional: Show selected categories */}
      {filter.subCategory && filter.subCategory.length > 0 && (
        <div className="text-sm text-gray-700 mt-2">
          <strong>Selected Categories:</strong> {filter.subCategory.join(", ")}
        </div>
      )}
    </div>
  );
}

export default FilterOptions;
