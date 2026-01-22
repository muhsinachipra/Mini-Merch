import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, User, Mail, Lock, ArrowRight, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [activeTab, setActiveTab] = useState('seller'); // 'seller' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mock Validation based on Tab
    if (activeTab === 'admin' && email !== 'admin@test.com') {
      toast.error('Invalid admin credentials');
      return;
    }
    
    // In a real app we'd validate password. Here any password works.
    login(email, password);
    toast.success('Logged in successfully!');
    
    if (activeTab === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background-light dark:bg-background-dark transition-colors">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
            <Store size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#101418] dark:text-white tracking-tight">Mini Merch Upload</h1>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white dark:bg-[#1e2730] rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden relative">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-gray-100 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('seller')}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all border-b-[3px] ${activeTab === 'seller' ? 'text-primary border-primary bg-primary/5 dark:bg-primary/10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              <Store size={20} />
              Seller Login
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all border-b-[3px] ${activeTab === 'admin' ? 'text-primary border-primary bg-primary/5 dark:bg-primary/10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              <LayoutDashboard size={20} />
              Admin Login
            </button>
          </div>

          <div className="p-8 pt-6">
            <div className="text-center mb-8">
              <h2 className="text-lg font-semibold text-[#101418] dark:text-white mb-1">Welcome back</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Please enter your details to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#101418] dark:text-gray-200">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-lg bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-[#101418] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px]" 
                    placeholder={activeTab === 'admin' ? "admin@test.com" : "name@company.com"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-[#101418] dark:text-gray-200">Password</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-lg bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-[#101418] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px]" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25 cursor-pointer" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
              </div>

              <button 
                type="submit"
                className="w-full h-12 mt-2 bg-primary hover:bg-primary/90 active:scale-[0.99] text-white font-semibold rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Log In
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account? 
                <a href="#" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors ml-1">Sign up</a>
              </p>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 text-center">
            © 2024 Mini Merch. All rights reserved.
        </p>
      </div>
    </div>
  );
}
