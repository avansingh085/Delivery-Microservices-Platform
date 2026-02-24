import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AutoLocationSender from './AutoLocationSender';

const Header = ({ user, cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between">
        <AutoLocationSender/>
      
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-black text-white px-3 py-1 font-black text-2xl tracking-tighter">
            F.
          </div>
          <span className="text-2xl font-black uppercase tracking-tight hidden sm:block">
            FoodGo
          </span>
        </Link>

      
        <div className="hidden md:flex items-center gap-12">
          {['Home', 'Items', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase()}`} 
              className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

      
        <div className="flex items-center gap-6">
          
          <Link 
            to="/cart" 
            className="group relative p-1 hover:bg-gray-100 rounded-full transition-all"
          >
         
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 text-black group-hover:scale-105 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            {cartCount > 0 && (
              <div className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartCount}
              </div>
            )}
          </Link>
       


          {!user ? (
             <>
               <Link to="/login" className="text-sm font-bold uppercase tracking-widest hidden lg:block hover:opacity-60">
                 Login
               </Link>
               <Link 
                 to="/signup" 
                 className="bg-black text-white px-8 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
               >
                 Sign Up
               </Link>
             </>
          ) : (
             <Link 
               to="/profile" 
               className="bg-black text-white px-8 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
             >
               Profile
             </Link>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <div className={`w-6 h-[2px] bg-black transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-[2px] bg-black ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-[2px] bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>

   
      <div className={`
        fixed inset-0 top-[80px] bg-white z-[999] p-10 flex flex-col gap-10 transition-all duration-500 md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {['Home', 'Items', 'About', 'Contact'].map((item) => (
          <Link 
            key={item} 
            to={`/${item.toLowerCase()}`} 
            onClick={() => setIsOpen(false)}
            className="text-4xl font-black uppercase italic tracking-tighter border-b border-gray-100 pb-4"
          >
            {item}
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-center font-bold uppercase tracking-widest py-4 border-2 border-black">Login</Link>
              <Link to="/signup" className="text-center font-bold uppercase tracking-widest py-4 bg-black text-white">Sign Up</Link>
            </>
          ) : (
            <Link to="/profile" className="text-center font-bold uppercase tracking-widest py-4 bg-black text-white">Profile</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;