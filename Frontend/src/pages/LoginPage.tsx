import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { authApi } from '../services/api';
import { useAppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, setUsername } = useAppContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await authApi.authenticate(authForm);
      setToken(res.data.token);
      setUsername(authForm.email.split('@')[0]);
      navigate('/selectCharacter');
    } catch (err: any) {
      const msgs: string[] = err?.response?.data?.validationErrors
        ?? (err?.response?.data?.errorMsg ? [err.response.data.errorMsg] : ['Login failed. Please try again.']);
      setErrors(msgs);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      await authApi.register(registerForm);
      setIsSignUp(false);
      setErrors([]);
      alert('Account created! Please sign in.');
    } catch (err: any) {
      const msgs: string[] = err?.response?.data?.validationErrors ?? ['Registration failed. Please try again.'];
      setErrors(msgs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="page-container flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Card */}
          <div className="glass-card p-8 shadow-2xl shadow-accent-900/20">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent-500/40 mx-auto mb-4 animate-float">
                UA
              </div>
              <h1 className="text-2xl font-bold gradient-text">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-white/50 text-sm mt-1">
                {isSignUp ? 'Join UttarakhandSpeaks AI' : 'Sign in to continue your journey'}
              </p>
            </div>

            {/* Error messages */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm space-y-1">
                {errors.map((e, i) => <p key={i}>• {e}</p>)}
              </div>
            )}

            {/* Forms */}
            {!isSignUp ? (
              <form id="login-form" onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="label">Email address</label>
                  <input
                    id="login-email"
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className="label">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    placeholder="Your password"
                    required
                    className="input-field"
                  />
                </div>
                <a href="#" className="block text-right text-xs text-accent-400 hover:text-accent-300 transition-colors">
                  Forgot Password?
                </a>
                <button id="login-submit" type="submit" disabled={loading} className="btn-primary w-full mt-2">
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form id="register-form" onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reg-firstname" className="label">First Name</label>
                    <input
                      id="reg-firstname"
                      type="text"
                      value={registerForm.firstname}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstname: e.target.value })}
                      placeholder="First name"
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-lastname" className="label">Last Name</label>
                    <input
                      id="reg-lastname"
                      type="text"
                      value={registerForm.lastname}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastname: e.target.value })}
                      placeholder="Last name"
                      required
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reg-email" className="label">Email address</label>
                  <input
                    id="reg-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="reg-password" className="label">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Create a password"
                    required
                    className="input-field"
                  />
                </div>
                <button id="register-submit" type="submit" disabled={loading} className="btn-primary w-full mt-2">
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Toggle */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                {' '}
                <button
                  id="auth-toggle-btn"
                  onClick={() => { setIsSignUp((p) => !p); setErrors([]); }}
                  className="text-accent-400 hover:text-accent-300 font-medium transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
