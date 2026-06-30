import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const { products, categories, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#e4002b]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs text-[#e4002b] font-semibold uppercase tracking-wider mb-2">Seagate Metals</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">Industrial Catalog</h1>
            <p className="text-gray-500 mt-2">{filteredProducts.length} products available</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-200 text-sm font-medium hover:border-black transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
            <div className="relative">
              <SlidersHorizontal size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 text-sm font-medium bg-white focus:outline-none focus:border-black appearance-none cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Availability</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, part number, or description..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mb-8 p-6 border border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold mb-4">Price Range</h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-32 px-3 py-2 border border-gray-200 text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-32 px-3 py-2 border border-gray-200 text-sm"
                placeholder="Max"
              />
              <button
                onClick={() => setPriceRange([0, 50000])}
                className="text-sm text-[#e4002b] font-medium hover:underline"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-gray-500 mb-4">No products found</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange([0, 50000]); }}
              className="text-[#e4002b] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#e4002b] font-medium uppercase tracking-wider">{product.category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 ${product.stock > 10 ? 'bg-green-50 text-green-700' : product.stock > 0 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-semibold text-black mb-1 group-hover:text-[#e4002b] transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 font-mono mb-3">{product.partNumber}</p>
                  <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
                  <div className="pt-3 border-t border-gray-100 mt-3">
                    <Link to={`/product/${product.id}`} className="text-[#e4002b] text-sm font-medium hover:underline">View Details →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
