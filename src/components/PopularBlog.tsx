import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlog = () => {
  const blogs = [
    {
      title: "The Future of E-commerce in 2023",
      author: "Sarah Johnson",
      likes: 125,
      comments: 44,
    },
    {
      title: "Optimizing Your Online Store for Conversions",
      author: "Jane Smith",
      likes: 98,
      comments: 32,
    },
    {
      title: "Essential E-commerce Tools for Small Businesses",
      author: "Michael Johnson",
      likes: 156,
      comments: 67,
    },
    {
      title: "Creating Effective Product Descriptions",
      author: "Emily Chen",
      likes: 87,
      comments: 29,
    },
    {
      title: "Mobile-First Design for E-commerce Websites",
      author: "David Wilson",
      likes: 142,
      comments: 51,
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Blogs</h2>
      <ul className="space-y-6">
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600">
                Published by {blog.author}
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>{blog.comments} comments</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{blog.likes} likes</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlog;
