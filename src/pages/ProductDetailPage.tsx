import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products, loading } = useProducts();

  const product = id ? getProductById(id) : undefined;
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 size={32} className="animate-spin text-[#e4002b]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-[#e4002b] font-medium hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>

      {/* Product Hero */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-[#e4002b] font-semibold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400 font-mono mb-4">Part #: {product.partNumber}</p>

            <div className={`inline-flex items-center gap-1 text-sm font-medium mb-6 w-fit px-3 py-1 ${product.stock > 10 ? 'bg-green-50 text-green-700' : product.stock > 0 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
              <Check size={14} />
              {product.stock > 0 ? `${product.stock} units in stock` : 'Currently out of stock'}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e4002b] text-white text-sm font-semibold hover:bg-black transition-all duration-300 w-fit"
            >
              Track Order
            </Link>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-8">Technical Specifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50">
                <span className="text-sm text-gray-500">{key}</span>
                <span className="text-sm font-semibold font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200 pb-24">
            <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/product/${rp.id}`}
                  className="group flex gap-4 p-4 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-24 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-mono">{rp.partNumber}</p>
                    <h3 className="text-sm font-semibold text-black group-hover:text-[#e4002b] transition-colors line-clamp-2 mt-1">{rp.name}</h3>
                    <p className="text-base font-semibold font-mono mt-2">${rp.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
