import React, { useState, useRef } from 'react';
import { Mail, Lock, ArrowRight, Github, User, ShieldCheck, ChevronLeft, Loader2 } from 'lucide-react';
import { sendOtp, register } from '../api/authApi.js';
import { toast } from 'sonner';

const AuthFlow = () => {
  const [step, setStep] = useState('signup'); 
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSignupSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const { success, message } = await sendOtp(formData.email);
      if (success) {
        setStep('otp');
        toast.success('Verification code sent to your email!');
      } else {
        toast.error(message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      toast.error("Please enter the complete 4-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await register({ ...formData, otp: otpValue });
      if (response.success) {
        toast.success('Account created successfully!');
     
      } else {
        toast.error(response.message || "Invalid OTP or registration failed");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').slice(0, 4).split('');
    if (data.length === 4 && data.every(char => !isNaN(char))) {
      setOtp(data);
      inputRefs.current[3].focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 relative overflow-hidden">
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-10 border border-white">

        {step === 'signup' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                <User className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
              <p className="text-slate-500 mt-2">Join the community today</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold ml-1">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John"
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold ml-1">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Doe"
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold ml-1">Email Address</label>
                <div className="relative group">
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold ml-1">Password</label>
                <div className="relative group">
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </div>
        ) : (
          
          <div className="text-center animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setStep('signup')}
              className="absolute top-10 left-8 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight mb-2">Verify Email</h2>
            <p className="text-slate-500 text-sm mb-8 px-4">We've sent a code to <b>{formData.email}</b>.</p>

            <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-14 h-16 bg-slate-100 border border-slate-200 rounded-2xl text-center text-2xl font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyAndRegister}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Complete"}
            </button>

            <p className="mt-8 text-sm text-slate-500">
              Didn't receive the code? <button onClick={handleSignupSubmit} className="font-bold text-indigo-600 hover:underline">Resend</button>
            </p>
          </div>
        )}

        <p className="text-center text-slate-500 mt-10 text-sm">
          Already have an account? <button className="font-bold text-indigo-600 hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
};

export default AuthFlow;