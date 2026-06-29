import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Contact CTA */}
      <div className="bg-[#e4002b] px-6">
        <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-white text-xl font-semibold">Need help? Contact our team</h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-[#e4002b] px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e4002b] flex items-center justify-center text-white font-bold text-sm">H</div>
              <span className="font-semibold tracking-tight">HERITAGE INDUSTRIAL SUPPLY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted partner for rig materials and industrial supply solutions. 
              Serving oil & gas, construction, marine, and heavy industrial sectors since 1996.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} className="text-[#e4002b]" />
                <span>+1 (713) 555-0100</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-[#e4002b]" />
                <span>sales@heritageindustrial.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-[#e4002b]" />
                <span>4500 Energy Drive, Houston, TX 77032</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              {['Drill Pipes', 'Valves', 'Drilling Tools', 'Safety Equipment', 'Pumps', 'Fittings', 'Cables'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-gray-500 hover:text-[#e4002b] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Industries', 'News', 'Sustainability', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-500 hover:text-[#e4002b] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              {['Track Order', 'FAQs', 'Shipping Info', 'Returns', 'Technical Support', 'Account'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Track Order' ? '/track' : item === 'Account' ? '/dashboard' : '#'} className="text-sm text-gray-500 hover:text-[#e4002b] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2026 Heritage Industrial Supply. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="text-xs text-gray-400 hover:text-[#e4002b] transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-[#e4002b] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
