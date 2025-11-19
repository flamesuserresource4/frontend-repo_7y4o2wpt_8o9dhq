import { ShoppingCart, Search } from "lucide-react";

export default function Navbar({ cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Soni Zi Creations
        </a>
        <div className="hidden sm:flex items-center gap-2 bg-white border rounded-full px-3 py-1.5 shadow-sm">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search products"
            className="outline-none text-sm w-60"
          />
        </div>
        <button className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-rose-600 text-white rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
