import { useState, useEffect, useMemo } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [viewProduct, setViewProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                console.log("DB Data:", data);
                const formatted = data.map(item => ({
                    ...item,
                    imageUrl: `${API_URL}${item.img}`,
                    description: item.desc
                }));
                setProducts(formatted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Backend error:", err);
                setLoading(false);
            });
    }, []);

    // Cart Logic
    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQty = (id, change) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + change) };
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleCheckout = (customerName) => {
        alert(`Thank you, ${customerName}! Your order has been placed successfully.`);
        setCart([]); 
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
    };

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <Header onCartClick={() => setIsCartOpen(true)} count={cartCount} />

            <main className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p} 
                                onOpen={setViewProduct} 
                                onAdd={addToCart} 
                            />
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-white border-t mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Orbit</p>
                </div>
            </footer>

            <CartDrawer 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
                onCheckout={() => setIsCheckoutOpen(true)}
            />

            <ProductModal 
                product={viewProduct} 
                onClose={() => setViewProduct(null)} 
                onAdd={addToCart} 
            />

            <CheckoutModal
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                onConfirm={handleCheckout}
            />
        </div>
    );
}
