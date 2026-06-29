import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Check admin role after login
      // Small delay to let auth state propagate
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/admin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message.includes('invalid-credential') || message.includes('user-not-found')
        ? 'Invalid email or password.'
        : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#e4002b] flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#e4002b] font-bold text-lg tracking-tight">HERITAGE</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-sm font-medium">ADMIN PORTAL</span>
          </div>
          <p className="text-white/40 text-sm">Authorized personnel only</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@heritage.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e4002b] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e4002b] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#e4002b] text-white py-4 text-sm font-semibold hover:bg-[#c40024] transition-all duration-300 disabled:bg-white/10 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
            {loading ? 'Authenticating...' : 'Access Admin Dashboard'}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 border border-white/5">
          <p className="text-white/20 text-xs text-center leading-relaxed">
            This is a restricted admin portal. All access attempts are logged and monitored.
            Unauthorized access is prohibited.
          </p>
        </div>

        {/* Back to Main Site */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            ← Back to Heritage Industrial Supply
          </button>
        </div>
      </div>
    </div>
  );
}
