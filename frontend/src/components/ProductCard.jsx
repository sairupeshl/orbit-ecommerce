import plusIcon from '../assets/plus.svg';

export default function ProductCard({ product, onOpen, onAdd }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Image Section */}
            <div className="aspect-square cursor-pointer bg-gray-100" onClick={() => onOpen(product)}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            {/* Info Section */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                        className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800 transition-colors"
                    >
                        <img src={plusIcon} alt="Add" className="w-4 h-4 invert" />
                    </button>
                </div>
            </div>
        </div>
    );
}