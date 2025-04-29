import { useEffect, useState } from "react";

interface Product {
  category: string;
}

// the response data will be array of products and the product will be string
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
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

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Products"
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="max"
          />
        </div>

        {/* Categories Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2 ">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* Keyword Section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
