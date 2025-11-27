import closeIcon from '../assets/XIcon.svg';

export default function CheckoutModal({ isOpen, onClose, total, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-md p-6 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                    <button onClick={onClose}><img src={closeIcon} className="w-6 h-6" /></button>
                </div>
                
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onConfirm(e.target.name.value);
                }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input required name="name" type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter your address"></input>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mt-4">
                            <span className="text-gray-600 font-medium">Total Amount</span>
                            <span className="text-2xl font-bold text-orange-600">₹{total.toFixed(2)}</span>
                        </div>

                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mt-2">
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}