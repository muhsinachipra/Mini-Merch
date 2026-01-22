import { Edit, Trash2 } from 'lucide-react';

export default function ProductCard({ product, variant = 'listing', onDelete, onEdit }) {
  // variants: 'listing' (public), 'inventory' (owner)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1e2730] border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url('${product.image || 'https://via.placeholder.com/400'}')` }}
        />
        {variant === 'inventory' && (
           <div className="absolute top-2 right-2 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 text-xs font-bold px-2 py-1 rounded">
              Active
           </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-1 gap-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[#101418] dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary dark:text-blue-400 mt-1">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          {variant === 'inventory' && (
             <p className="text-[#5e758d] dark:text-gray-500 text-xs mt-1">ID: {product.id}</p>
          )}
        </div>

        {/* Actions for Inventory */}
        {variant === 'inventory' && (
          <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
            <button 
              onClick={() => onEdit && onEdit(product)}
              className="flex-1 h-9 flex items-center justify-center gap-1 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Edit size={16} /> Edit
            </button>
            <button 
              onClick={() => onDelete && onDelete(product.id)}
              className="flex-1 h-9 flex items-center justify-center gap-1 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
