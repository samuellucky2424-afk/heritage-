import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Shield, Clock, Package, Wrench, Factory, HardHat, Loader2 } from 'lucide-react';
import { newsItems } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { products, loading } = useProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Value section fade in
      gsap.from('.value-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: valueRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      // Featured products stagger
      gsap.from('.featured-card', {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      // News cards stagger
      gsap.from('.news-card', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: newsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <div className="hero-bg absolute inset-0 w-full h-[120%]">
          <img
            src="/images/hero-rig.jpg"
            alt="Offshore drilling rig"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-[#e4002b] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              SEAGATE METALS
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.9] tracking-tight mb-6">
              Reliable Rig<br />Materials &<br />Industrial Supply
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#e4002b] text-white px-8 py-4 text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                Shop Materials <ArrowRight size={16} />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                Track Order <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:block">
          <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center animate-bounce">
            <ChevronRight size={20} className="text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section ref={valueRef} className="py-24 md:py-32 px-6">
        <div className="value-content max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-8">
            Technology-driven supply solutions
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            For over 30 years, Seagate Metals has pioneered efficient consignment logistics 
            that empower the global energy industry. Our deep expertise and vast inventory enable customers 
            to source critical rig materials, drilling equipment, and industrial supplies with unmatched speed 
            and reliability. We minimize downtime and maximize operational efficiency across oilfield, 
            construction, marine, and heavy industrial sectors.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 px-6 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: '/images/service-products.jpg', title: 'Products & Services', desc: 'Explore our comprehensive catalog of rig materials, drilling equipment, valves, pipes, and industrial supplies.', link: '/shop' },
              { img: '/images/service-industries.jpg', title: 'Industries Served', desc: 'Serving oil & gas, construction, marine, renewable energy, and heavy industrial sectors worldwide.', link: '/shop' },
              { img: '/images/service-safety.jpg', title: 'Safety & Compliance', desc: 'Certified safety equipment and compliance solutions to protect your workforce and meet regulations.', link: '/shop?category=Safety+Equipment' },
            ].map((card, i) => (
              <Link key={i} to={card.link} className="group relative overflow-hidden bg-white">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#e4002b] text-sm font-medium">
                    Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">Featured Products</h2>
              <p className="text-gray-500 mt-2">Top-rated industrial equipment trusted by professionals</p>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-[#e4002b] text-sm font-semibold hover:underline">
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-[#e4002b]" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="featured-card group bg-white border border-gray-100">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 font-mono mb-1">{product.partNumber}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-semibold text-black mb-2 group-hover:text-[#e4002b] transition-colors">{product.name}</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-1 text-[#e4002b] text-sm font-semibold">
              View all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Why Seagate Metals</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Vast Inventory', desc: '50,000+ SKUs in stock, ready for immediate shipment to your location.' },
              { icon: Clock, title: 'Fast Delivery', desc: 'Same-day shipping available for orders placed before 2 PM. Global logistics network.' },
              { icon: Shield, title: 'Quality Assured', desc: 'All products meet or exceed API, ANSI, and ISO industry standards. Full certification.' },
              { icon: Wrench, title: 'Expert Support', desc: 'Dedicated technical team with decades of combined field experience in oil & gas.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <item.icon size={28} className="text-[#e4002b]" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-12">Industries Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Factory, label: 'Oil & Gas' },
              { icon: HardHat, label: 'Construction' },
              { icon: Wrench, label: 'Manufacturing' },
              { icon: Package, label: 'Marine' },
              { icon: Shield, label: 'Mining' },
              { icon: Clock, label: 'Renewables' },
            ].map((ind, i) => (
              <div key={i} className="group flex flex-col items-center p-6 border border-gray-200 hover:border-[#e4002b] transition-colors cursor-pointer">
                <ind.icon size={32} className="text-gray-400 group-hover:text-[#e4002b] transition-colors mb-3" />
                <span className="text-sm font-medium text-black group-hover:text-[#e4002b] transition-colors">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section ref={newsRef} className="py-24 px-6 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">Latest News</h2>
              <p className="text-gray-500 mt-2">Industry insights and company updates</p>
            </div>
            <Link to="#" className="hidden md:inline-flex items-center gap-1 text-[#e4002b] text-sm font-semibold hover:underline">
              View all news <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <article key={news.id} className="news-card group bg-white">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-[#e4002b] uppercase tracking-wider">{news.category}</span>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-[#e4002b] transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{news.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-black group-hover:text-[#e4002b] transition-colors">
                    Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Support CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-6">
            Need Help Finding the Right Parts?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Our technical support team is available 24/7 to help you identify the correct materials 
            and equipment for your specific application.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#e4002b] text-white px-8 py-4 text-sm font-semibold hover:bg-black transition-all duration-300"
            >
              Browse Catalog <ArrowRight size={16} />
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center gap-2 border border-black text-black px-8 py-4 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Track an Order <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
