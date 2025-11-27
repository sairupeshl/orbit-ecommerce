import closeIcon from '../assets/XIcon.svg';

export default function ProductModal({ product, onClose, onAdd }) {
    if (!product) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-sm w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="md:w-1/2 bg-gray-100">
                    <img src={product.imageUrl} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                            <img src={closeIcon} className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t">
                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                        <button 
                            onClick={() => { onAdd(product); onClose(); }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-sm transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}