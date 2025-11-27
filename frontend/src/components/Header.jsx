import cartIcon from '../assets/cart.svg';

export default function Header({ onCartClick, count }) {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-orange-500 bg-clip-text text-transparent">
                    Orbit
                </h1>
                <button 
                    onClick={onCartClick} 
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <img src={cartIcon} alt="Cart" className="w-6 h-6" />
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {count}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}