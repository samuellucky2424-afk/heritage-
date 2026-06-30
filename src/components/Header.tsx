import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled && !mobileMenuOpen;

  if (isAdminPage) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-white/95 backdrop-blur-sm text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm ${isTransparent ? 'bg-[#e4002b] text-white' : 'bg-[#e4002b] text-white'}`}>
              S
            </div>
            <div className="hidden sm:block">
              <span className={`text-sm font-semibold tracking-tight ${isTransparent ? 'text-white' : 'text-black'}`}>
                SEAGATE
              </span>
              <span className={`hidden md:inline text-xs ml-1 ${isTransparent ? 'text-white/60' : 'text-gray-400'}`}>
                METALS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm font-medium hover:text-[#e4002b] transition-colors">Shop</Link>
            <Link to="/track" className="text-sm font-medium hover:text-[#e4002b] transition-colors">Track Order</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-[#e4002b] transition-colors">My Account</Link>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:text-[#e4002b] transition-colors">Sign In</Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 transition-colors ${isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              <Search size={18} />
            </button>

            {user ? (
              <button
                onClick={logout}
                className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  isTransparent ? 'border border-white/30 hover:bg-white/10' : 'border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <User size={14} /> Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  isTransparent ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <User size={14} /> Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#e4002b]/20"
                autoFocus
              />
              {searchQuery && (
                <Link
                  to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e4002b] text-sm font-medium"
                >
                  Go
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-black border-t border-gray-100 shadow-lg">
          <nav className="px-6 py-4 space-y-1">
            <Link to="/shop" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50">Shop</Link>
            <Link to="/track" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50">Track Order</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50">My Account</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm font-medium text-[#e4002b] hover:bg-gray-50">Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-3 text-sm font-medium text-[#e4002b] hover:bg-gray-50">Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
