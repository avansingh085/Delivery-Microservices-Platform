import React, { useState, useRef } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, ChevronLeft, KeyRound, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  
  const [step, setStep] = useState('request');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value !== '' && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'request':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                <KeyRound className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
              <p className="text-slate-500 mt-2">No worries, we'll send you reset instructions.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setStep('otp'); }} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold ml-1">Email Address</label>
                <div className="relative group">
                  <input required type="email" placeholder="Enter your email" className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Reset Password
              </button>
            </form>
          </div>
        );

      case 'otp':
        return (
          <div className="text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6"><ShieldCheck className="w-8 h-8" /></div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Password Reset OTP</h2>
            <p className="text-slate-500 text-sm mb-8 px-4">We sent a verification code to your email.</p>
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((data, index) => (
                <input key={index} type="text" maxLength="1" ref={(el) => (inputRefs.current[index] = el)} value={data} onChange={(e) => handleOtpChange(e.target, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-14 h-16 bg-slate-100 border border-slate-200 rounded-2xl text-center text-2xl font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" />
              ))}
            </div>
            <button onClick={() => setStep('reset')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              Verify Code
            </button>
          </div>
        );

      case 'reset':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Set New Password</h2>
            <p className="text-slate-500 text-sm text-center mb-8">Must be at least 8 characters.</p>
            <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold ml-1">New Password</label>
                <div className="relative group">
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold ml-1">Confirm Password</label>
                <div className="relative group">
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-4">
                Reset Password
              </button>
            </form>
          </div>
        );

      case 'success':
        return (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Password Reset!</h2>
            <p className="text-slate-500 text-sm mb-8">Your password has been successfully reset. Click below to log in magicially.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              Back to Login
            </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-10 border border-white">
        {step !== 'success' && step !== 'request' && (
          <button onClick={() => setStep(step === 'reset' ? 'otp' : 'request')} className="absolute top-10 left-8 p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {renderStep()}

        <p className="text-center text-slate-500 mt-10 text-sm">
          Remembered your password? <button className="font-bold text-indigo-600 hover:underline" onClick={() => window.location.href = '/login'}>Back to Login</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;