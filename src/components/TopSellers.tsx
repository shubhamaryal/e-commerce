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
        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.first}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">
        Top Sellers
      </h2>
      <ul className="space-y-3 sm:space-y-4">
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0 min-w-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
              />
              <span className="font-medium text-gray-900 truncate">
                {author.name}
              </span>
            </div>
            <button
              onClick={() => handleFollowClick(index)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base ${
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
