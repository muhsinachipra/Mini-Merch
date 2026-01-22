import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { addProduct } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { UploadCloud, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // base64 string
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      image: image || "https://via.placeholder.com/400", // Fallback
      ownerId: user.email,
    };

    addProduct(newProduct);

    // Show success (mimic design toast)
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-[#1a2632] shadow-lg border border-green-100 dark:border-green-900 border-l-4 border-l-green-500 max-w-sm w-full`}
      >
        <div className="text-green-500 mt-0.5">
          <CheckCircle size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-[#101418] dark:text-white leading-none">
            Success
          </h4>
          <p className="text-sm text-[#5e758d] dark:text-[#9ba8b8] leading-tight">
            Product successfully listed!
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-[#5e758d] hover:text-[#101418] dark:text-[#9ba8b8] dark:hover:text-white ml-auto"
        >
          <X size={18} />
        </button>
      </div>
    ));

    setTimeout(() => {
      navigate("/my-products");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-start flex-1 py-10 px-4 md:px-0 relative">
        {/* Form Container */}
        <div className="w-full max-w-[600px] bg-white dark:bg-[#1e2730] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-[#101418] dark:text-white tracking-tight text-3xl font-bold leading-tight">
              List a New Product
            </h1>
            <p className="text-[#5e758d] dark:text-[#9ba8b8] text-sm font-normal leading-normal">
              Fill in the details below to add your item to the marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Upload Section */}
            <div className="flex flex-col gap-3">
              <label className="text-[#101418] dark:text-white text-base font-medium leading-normal">
                Product Images
              </label>
              <div
                className={`group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed ${isDragOver ? "border-primary bg-primary/5" : "border-[#dae0e7] dark:border-[#4a5568] bg-[#f9fafb] dark:bg-[#15202b]"} hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all px-6 py-12 cursor-pointer relative overflow-hidden`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload").click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <>
                    <div className="rounded-full bg-primary/10 p-4 text-primary relative z-10">
                      <UploadCloud size={32} />
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center relative z-10">
                      <p className="text-[#101418] dark:text-white text-base font-semibold">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[#5e758d] dark:text-[#9ba8b8] text-sm">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#101418] dark:text-white text-sm font-medium leading-normal"
                  htmlFor="product-name"
                >
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input w-full rounded-lg border border-[#dae0e7] dark:border-[#4a5568] bg-white dark:bg-[#0f1923] text-[#101418] dark:text-white placeholder-[#5e758d] dark:placeholder-[#6b7280] h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                  placeholder="e.g., Vintage Leather Jacket"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#101418] dark:text-white text-sm font-medium leading-normal"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-[#5e758d] dark:text-[#9ba8b8] sm:text-sm">
                        $
                      </span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-input w-full rounded-lg border border-[#dae0e7] dark:border-[#4a5568] bg-white dark:bg-[#0f1923] text-[#101418] dark:text-white placeholder-[#5e758d] dark:placeholder-[#6b7280] h-12 pl-7 pr-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#101418] dark:text-white text-sm font-medium leading-normal"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select w-full rounded-lg border border-[#dae0e7] dark:border-[#4a5568] bg-white dark:bg-[#0f1923] text-[#101418] dark:text-white placeholder-[#5e758d] dark:placeholder-[#6b7280] h-12 px-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow appearance-none"
                    >
                      <option value="" disabled>
                        Select a category...
                      </option>
                      <option value="clothing">Clothing & Apparel</option>
                      <option value="electronics">Electronics</option>
                      <option value="home">Home & Garden</option>
                      <option value="collectibles">Collectibles</option>
                      <option value="accessories">Accessories</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#5e758d]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#004494] text-white text-base font-bold shadow-sm transition-all focus:ring-4 focus:ring-primary/30"
              >
                <UploadCloud size={20} />
                Publish Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
