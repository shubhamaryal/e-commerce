import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import PopularBlog from "./components/PopularBlog";
import TopSellers from "./components/TopSellers";

export default function App() {
  return (
    <Router>
      <div className="h-screen bg-gray-50 overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 min-w-0 h-full">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <div className="w-80 p-4 space-y-6 hidden lg:block overflow-y-auto">
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
