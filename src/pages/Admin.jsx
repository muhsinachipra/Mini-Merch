import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getProducts, deleteProduct, seedProducts } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Download, Trash2, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Basic protection
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    seedProducts();
    loadProducts();
  }, [user]);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product? Action cannot be undone.')) {
      deleteProduct(id);
      toast.success('Product removed from marketplace');
      loadProducts();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.includes(search) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#101418] dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />
      {/* Navbar handles the header part (Logo, Search, User) */}
      {/* 
        Note: The design has a slightly different header for Admin (Search bar details etc), 
        but reusing Navbar maintains consistency. I will add the secondary header below.
      */}
      
      <main className="flex-1 px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          {/* Page Heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#101418] dark:text-white mb-2">Product Moderation</h2>
              <p className="text-[#5e758d] dark:text-gray-400 text-base">Manage and review all listed products across the marketplace.</p>
            </div>
            <div className="flex gap-3">
              {/* Search specific to admin page logic if needed, but Navbar might have one. 
                  Design puts Search in Header. I'll add a search bar here for clarity since Navbar search might be global. 
              */}
              <div className="hidden md:flex relative w-64 lg:w-96 mr-2">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                   <Search className="text-[#5e758d]" size={18} />
                 </div>
                 <input 
                   type="text" 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="block w-full rounded-lg border-0 bg-[#f0f2f5] dark:bg-gray-800 py-2 pl-10 pr-3 text-sm text-[#101418] dark:text-white placeholder:text-[#5e758d] focus:ring-2 focus:ring-primary focus:ring-inset font-normal" 
                   placeholder="Search products, IDs, or categories..." 
                 />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-[#dae0e7] dark:border-gray-700 px-4 py-2.5 text-sm font-bold text-[#101418] dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={20} />
                <span>Filter</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                <Download size={20} />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl bg-white dark:bg-[#1e2730] p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-[#5e758d] dark:text-gray-400 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-[#101418] dark:text-white mt-1">{products.length}</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1e2730] p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-[#5e758d] dark:text-gray-400 font-medium">Flagged Items</p>
              <p className="text-2xl font-bold text-red-600 mt-1">15</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1e2730] p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-[#5e758d] dark:text-gray-400 font-medium">New Today</p>
              <p className="text-2xl font-bold text-[#101418] dark:text-white mt-1">32</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-xl border border-[#dae0e7] dark:border-gray-700 bg-white dark:bg-[#1e2730] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-[#dae0e7] dark:border-gray-700">
                    <th className="px-6 py-4 font-semibold text-[#101418] dark:text-gray-200 w-24">Thumbnail</th>
                    <th className="px-6 py-4 font-semibold text-[#101418] dark:text-gray-200 w-[30%]">Product Name</th>
                    <th className="px-6 py-4 font-semibold text-[#101418] dark:text-gray-200">Category</th>
                    <th className="px-6 py-4 font-semibold text-[#101418] dark:text-gray-200">Price</th>
                    <th className="px-6 py-4 font-semibold text-[#101418] dark:text-gray-200 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dae0e7] dark:divide-gray-700">
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" role="row">
                       <td className="px-6 py-3">
                         <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                           <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                         </div>
                       </td>
                       <td className="px-6 py-3">
                         <div className="flex flex-col">
                           <span className="font-medium text-[#101418] dark:text-white group-hover:text-primary transition-colors line-clamp-1">{product.name}</span>
                           <span className="text-xs text-[#5e758d] dark:text-gray-400">ID: #{product.id}</span>
                         </div>
                       </td>
                       <td className="px-6 py-3">
                         <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-700/30 capitalize">
                           {product.category}
                         </span>
                       </td>
                       <td className="px-6 py-3 font-medium text-[#101418] dark:text-white">
                         ${parseFloat(product.price).toFixed(2)}
                       </td>
                       <td className="px-6 py-3 text-right">
                         <button 
                           onClick={() => handleDelete(product.id)}
                           className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group/delete"
                         >
                           <Trash2 size={20} className="group-hover/delete:fill-current" />
                           <span className="ml-2 font-bold text-sm">Delete</span>
                         </button>
                       </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                        No products match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination (Static Mock) */}
            <div className="flex items-center justify-between border-t border-[#dae0e7] dark:border-gray-700 bg-white dark:bg-[#1e2730] px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-[#5e758d] dark:text-gray-400">
                      Showing <span className="font-medium text-[#101418] dark:text-white">1</span> to <span className="font-medium text-[#101418] dark:text-white">{filteredProducts.length}</span> of <span className="font-medium text-[#101418] dark:text-white">{products.length}</span> results
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
