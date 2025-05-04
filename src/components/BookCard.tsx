import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h2>
          <p className="text-xl font-bold text-indigo-600">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
