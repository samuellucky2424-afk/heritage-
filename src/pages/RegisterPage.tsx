import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password, company);
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message.includes('email-already-in-use')
        ? 'An account with this email already exists.'
        : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="/images/service-products.jpg"
          alt="Industrial warehouse"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="text-white text-center">
            <h2 className="text-4xl font-semibold mb-4">Join Seagate Metals</h2>
            <p className="text-white/70 text-lg">Create an account to streamline your industrial supply procurement process.</p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-xs text-[#e4002b] font-semibold uppercase tracking-wider mb-2">Seagate Metals</p>
            <h1 className="text-3xl font-semibold text-black tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2">Register to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Company Name <span className="text-gray-400">(Optional)</span></label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company"
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 chars)"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 accent-[#e4002b]" required />
              <span className="text-gray-500">
                I agree to the <Link to="#" className="text-[#e4002b] font-medium hover:underline">Terms of Service</Link> and{' '}
                <Link to="#" className="text-[#e4002b] font-medium hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#e4002b] text-white py-4 text-sm font-semibold hover:bg-black transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#e4002b] font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
