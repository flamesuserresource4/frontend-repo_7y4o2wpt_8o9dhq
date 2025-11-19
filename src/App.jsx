import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        // seed once if no products
        const listRes = await fetch(`${API_BASE}/api/products`).then((r) => r.json());
        if (!listRes || listRes.length === 0) {
          await fetch(`${API_BASE}/api/seed`, { method: "POST" });
        }
        const data = await fetch(`${API_BASE}/api/products`).then((r) => r.json());
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return products;
    return products.filter((p) =>
      `${p.title} ${p.description ?? ""} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [products, query]);

  function addToCart(product) {
    setCart((prev) => {
      const ex = prev.find((p) => p.id === product.id);
      if (ex) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function setQty(id, qty) {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  }

  async function checkout() {
    try {
      const payload = {
        customer_name: "Guest",
        customer_email: "guest@example.com",
        shipping_address: "India",
        items: cart.map((c) => ({ product_id: c.id, quantity: c.qty })),
      };
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Checkout failed");
      setCart([]);
      setMessage("Order placed! Check your orders below.");
      setCartOpen(false);
    } catch (e) {
      setMessage("Checkout failed. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar cartCount={cart.length} onSearch={setQuery} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Soni Zi Creations</h1>
          <p className="text-slate-600 mt-2">Beautiful handcrafted products you can buy right now.</p>
        </section>

        {message && (
          <div className="mb-6 p-3 rounded border border-emerald-200 bg-emerald-50 text-emerald-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-3">Recent Orders (demo)</h2>
          <OrdersList />
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        setQty={setQty}
      />
    </div>
  );
}

function OrdersList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${API_BASE}/api/orders`).then((r) => r.json());
        setOrders(data);
      } catch (e) {}
    })();
  }, []);

  if (orders.length === 0) return <p className="text-slate-500">No orders yet.</p>;

  return (
    <div className="grid gap-3">
      {orders.map((o) => (
        <div key={o.id} className="border rounded-lg p-3 bg-white">
          <div className="font-medium">Order #{o.id.slice(-6)}</div>
          <div className="text-sm text-slate-600">{o.customer_name} • {o.customer_email}</div>
          <div className="text-sm text-slate-600">Items: {o.items?.length} • Total: ₹{o.total}</div>
        </div>
      ))}
    </div>
  );
}
