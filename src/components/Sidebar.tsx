import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

// the response data will be array of products and the product will be string
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "skirt",
  ]);
  // the <string[]> means that the categories and the keywords will be an array of the strings

  // useEffect to fetch the data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products"); // fetching data from the web
        const data: FetchResponse = await response.json(); // converting the fetched data into json
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        ); // this gives categories only ; before we were getting all of the products with all the descriptions of it

        /* data.products.map(product => product.category)
            This goes through every product in the products array.
            It returns a new array that contains only the category of each product. */

        /* new Set(...)
            Set is a JavaScript object that stores unique values only.
            When you pass the array of categories into a Set, it removes duplicates. */

        /* Array.from(...)
            This converts the Set back into a regular array. */

        setCategories(uniqueCategories); // we set the categories with unique categories from the fetched data
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined); // parseFloat changes the string to the numbers
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-full lg:w-72 p-4 lg:p-6 h-auto lg:h-screen bg-white shadow-lg lg:fixed lg:left-0 overflow-y-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-indigo-600">
        React Store
      </h1>
      <section className="space-y-4 lg:space-y-6">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Price Range</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedCategory === category}
                />
                <span className="text-gray-700 truncate">
                  {category.toUpperCase()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
