import React,{useState} from 'react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react'; 
import { login } from '../api/authApi.js';
import { toast } from 'sonner';
import { Success } from '../utils/toast.jsx';

const LoginPage = () => {

    const [formData,setFormData]=useState({
        email:'',
        password:''
    })

    const onSubmit=async (e)=>{
        e.preventDefault();
       console.log(formData);
        const {message,success}=await login(formData);
       
        if(success){
         Success(message);
         window.location='/';
        }
        else{
            toast.error(message);
        }

    }
  

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
           
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
            </div>

          
            <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-indigo-100/50 p-10 border border-white">
                
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                        <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin-slow" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
                </div>

                <form className="space-y-5" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                        <div className="relative group">
                            <input 
                                type="email" 
                                className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700"
                                placeholder="name@company.com"
                                 onChange={(e)=>setFormData({...formData,email:e.target.value})}
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="text-sm font-semibold">Password</label>
                            <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</button>
                        </div>
                        <div className="relative group">
                            <input 
                                type="password" 
                                className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700"
                                placeholder="••••••••"
                                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]">
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold transition-colors">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold transition-colors">
                            <Github className="w-5 h-5" />
                            GitHub
                        </button>
                    </div>
                </div>

                <p className="text-center text-slate-500 mt-10 text-sm">
                    Don't have an account? <button className="font-bold text-indigo-600 hover:underline">Create account</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;