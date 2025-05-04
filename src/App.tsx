import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import PopularBlog from "./components/PopularBlog";
import TopSellers from "./components/TopSellers";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <div className="lg:w-80 p-4 lg:p-6 space-y-6 hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <div className="space-y-6">
              <TopSellers />
              <PopularBlog />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}
