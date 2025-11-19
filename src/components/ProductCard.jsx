export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{product.title}</h3>
        {product.description && (
          <p className="text-sm text-slate-600 line-clamp-2 mt-1">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold">₹{product.price}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
