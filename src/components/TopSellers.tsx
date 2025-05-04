import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5"); // the 5 means 5 users ; if we want more users we can change the number and get the required number of users
        const data = await response.json();
        console.log("API Response:", data.results);
        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        console.log("Processed Authors:", authorsData);
        setAuthors(authorsData);
      } catch (error) {
        console.log(`Error fetching authors: ${error}`);
      }
    };
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthor) =>
      prevAuthor.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Top Sellers</h2>
      <ul className="space-y-3">
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3 mb-2 sm:mb-0 w-full sm:w-auto">
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
              />
              <span className="font-medium text-gray-900">{author.name}</span>
            </div>
            <button
              onClick={() => handleFollowClick(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap text-sm ${
                author.isFollowing
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
