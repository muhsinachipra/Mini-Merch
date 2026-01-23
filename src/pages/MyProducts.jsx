import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts, deleteProduct, seedProducts } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function MyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'low_stock', 'drafts' (mock)

  useEffect(() => {
    if (user) {
      seedProducts();
      loadProducts();
    }
  }, [user]);

  const loadProducts = () => {
    const all = getProducts();
    // Filter by owner
    const myItems = all.filter((p) => p.ownerId === user?.email);
    setProducts(myItems);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      toast.success("Product deleted");
      loadProducts();
    }
  };

  const handleEdit = (product) => {
    toast("Edit functionality not implemented in this demo", { icon: "ℹ️" });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#101418] dark:text-white">
              My Inventory
            </h1>
            <p className="text-[#5e758d] dark:text-gray-400 text-base">
              Manage your product listings and stock.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
              {products.length} Items Listed
            </div>
            <Link
              to="/add-product"
              className="flex items-center gap-2 h-10 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              <Plus size={20} />
              Upload Item
            </Link>
          </div>
        </div>

        {/* Filter Chips (Mock) */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {["All Items", "Active", "Low Stock", "Drafts"].map((type) => (
            <button
              key={type}
              className={`flex items-center justify-center px-4 h-9 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${type === "All Items" ? "bg-[#101418] dark:bg-white text-white dark:text-[#101418]" : "bg-[#f0f2f5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#101418] dark:text-gray-300"}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="inventory"
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
              <Package size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              No items yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
              You haven't listed any products yet. Start selling by uploading
              your first item.
            </p>
            <Link
              to="/add-product"
              className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Add Product
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
