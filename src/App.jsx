import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
