import { X } from "lucide-react";

export default function CartDrawer({ open, items, onClose, onCheckout, setQty }) {
  const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  return (
    <div
      className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {items.length === 0 && <p className="text-slate-500">Cart is empty.</p>}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center border rounded-lg p-3">
              {it.image && (
                <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-medium line-clamp-1">{it.title}</div>
                <div className="text-sm text-slate-600">₹{it.price}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button className="px-2 py-1 border rounded" onClick={() => setQty(it.id, Math.max(1, it.qty - 1))}>-</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button className="px-2 py-1 border rounded" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                </div>
              </div>
              <div className="font-semibold">₹{(it.price * it.qty).toFixed(0)}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold">₹{total.toFixed(0)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-3 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
