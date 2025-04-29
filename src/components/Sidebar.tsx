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
    </div>
  );
};

export default Sidebar;
