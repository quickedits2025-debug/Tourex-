import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Compass, ArrowRight, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { signInUser, signUpUser, signInWithGoogle } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, initialMode = 'signup', onClose, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);

    if (mode === 'signup') {
      const res = await signUpUser(email, password, { full_name: email.split('@')[0] });
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Account created successfully!');
        const userObj = res.user || { email, name: email.split('@')[0] };
        setTimeout(() => {
          onAuthSuccess(userObj);
        }, 800);
      } else {
        // Fallback for preview or confirmation required
        if (res.error?.includes('confirm') || res.error?.includes('verification')) {
          setSuccessMsg('Verification link sent to your email! (You can also use 1-Click Demo Login below)');
        } else {
          setErrorMsg(res.error || 'Failed to create account.');
        }
      }
    } else {
      const res = await signInUser(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Signed in successfully! Welcome back.');
        const userObj = res.user || { email, name: email.split('@')[0] };
        setTimeout(() => {
          onAuthSuccess(userObj);
        }, 600);
      } else {
        setErrorMsg(res.error || 'Invalid email or password.');
      }
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await signInWithGoogle();
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Google Sign-In is initializing or requires OAuth provider config in Supabase dashboard.');
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser = {
        email: 'traveler@tourex.com',
        user_metadata: { full_name: 'Rohit Sharma' },
        name: 'Rohit Sharma'
      };
      onAuthSuccess(demoUser);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Split Modal Card matching the user's reference image */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Scenic Visual Background with Brand (Matching reference image) */}
        <div className="hidden md:flex md:col-span-5 relative bg-slate-950 flex-col justify-between p-8 overflow-hidden">
          {/* Scenic Mountain Image (Sunlit stone pathway and peaks like the reference) */}
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
            alt="Scenic mountain fortress pathway"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/60" />

          {/* Top Brand Logo - Exact layout style of 'Travzy EXPLORE YOUR WAY' */}
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md">
                <Compass className="w-4 h-4 text-emerald-600 transform -rotate-12" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                tourex
              </span>
            </div>
            <p className="text-[10px] font-extrabold tracking-[0.25em] text-emerald-300 uppercase pl-1">
              Explore Your Way
            </p>
          </div>

          {/* Bottom Visual Highlights */}
          <div className="relative z-10 space-y-3 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-emerald-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Himachal & Uttarakhand
            </div>
            <h3 className="text-xl font-bold leading-snug">
              Begin your sacred peaks and pine valley journey.
            </h3>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Join thousands of Indian travelers booking personalized mountain packages with verified local Pahadi concierges.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Form (Direct replication of reference) */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full space-y-5">
            
            {/* Minimalist Top Logo Icon (Matching reference icon) */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-md">
                <div className="w-4 h-4 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                </div>
              </div>
            </div>

            {/* Headline and Subtitle */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {mode === 'signup' ? 'Welcome to Tourex' : 'Welcome back to Tourex'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {mode === 'signup'
                  ? 'Create your account and discover world-class tour packages.'
                  : 'Sign in to access your bookings, vouchers & travel history.'}
              </p>
            </div>

            {/* Social Logins: Continue with Google (Exact styling from reference) */}
            <div>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 active:scale-[0.99] text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 border border-slate-200/60 shadow-sm"
              >
                {/* Official Google Icon SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with google</span>
              </button>
            </div>

            {/* OR Divider with lines */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                OR
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Error or Success Alerts */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form Fields - Replicating input design */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Enter Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm Password (shown in Sign Up mode like reference) */}
              {mode === 'signup' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Forgot password link in sign-in mode */}
              {mode === 'signin' && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => alert('Password reset link will be sent to your registered email.')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Main Action Button - Dark Indigo/Navy Pill matching reference */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#1c1432] hover:bg-slate-900 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-950/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</span>
                  )}
                </button>
              </div>

              {/* Terms and Privacy Disclaimer (Exact text from reference) */}
              <p className="text-center text-[10px] text-slate-400 leading-tight pt-1">
                By continuing, you agree to our{' '}
                <a href="#terms" className="underline hover:text-slate-600">Terms</a> and{' '}
                <a href="#privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
              </p>

              {/* Switch Mode Link (Exact text from reference) */}
              <div className="text-center pt-2">
                {mode === 'signup' ? (
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
              </div>

              {/* Quick 1-Click Demo Login for Testing */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all"
                >
                  ⚡ Quick Demo Login (Instant Test)
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
