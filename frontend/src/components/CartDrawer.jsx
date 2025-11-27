import closeIcon from '../assets/XIcon.svg';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import trashIcon from '../assets/trash.svg';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md h-full shadow-sm flex flex-col animate-slide-in">
                <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
                        <img src={closeIcon} className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {cart.length === 0 && (
                        <div className="text-center mt-10 text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    )}
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <img src={item.imageUrl} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                <p className="text-gray-500 text-sm">₹{item.price}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 border rounded hover:bg-gray-50">
                                        <img src={minusIcon} className="w-3 h-3" />
                                    </button>
                                    <span className="font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                                    <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 border rounded hover:bg-gray-50">
                                        <img src={plusIcon} className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <span className="font-bold">₹{item.price * item.quantity}</span>
                                <button onClick={() => onRemove(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                    <img src={trashIcon} className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={onCheckout}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-sm transition-transform active:scale-95"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}