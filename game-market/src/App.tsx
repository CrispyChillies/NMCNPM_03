import { Routes, Route } from "react-router-dom";
import ProductUploading from "./pages/product-uploading/ProductUploading";
import ProfileUpdating from "./pages/profile-updating/ProfileUpdating";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile-updating" element={<ProfileUpdating />} />
        <Route path="/product-uploading" element={<ProductUploading />} />
      </Routes>
    </div>
  );
};

export default App;
