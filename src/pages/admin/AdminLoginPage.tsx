import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import logoImg from '../../assets/Logo.jpg';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@aldarmedia.ae');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // User specified password requirement: P@ssw0rd
      if (password === 'P@ssw0rd') {
        localStorage.setItem('aldar_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid password. Access denied.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />

      <div className="max-w-md w-full relative z-10 animate-scale-in">
        
        {/* Logo & Card Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 flex flex-col gap-6">
          
          <div className="flex flex-col items-center text-center gap-3">
            <img src={logoImg} alt="Aldar Media Logo" className="h-16 w-auto object-contain" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-black text-slate-900">Admin Portal Login</h2>
              <p className="text-xs text-slate-500 font-medium">Enter admin credentials to access Content Management Console.</p>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-bold animate-fade-in-up">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Admin Email / Username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aldarmedia.ae"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              required
            />

            <div className="relative">
              <Input
                label="Admin Password *"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="mt-2 w-full shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Log In to Admin Console
            </Button>
          </form>

        </div>

      </div>
    </div>
  );
};
