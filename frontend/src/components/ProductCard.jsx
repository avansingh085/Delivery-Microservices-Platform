import React from 'react';
import Tilt from 'react-parallax-tilt';
import { addToCart } from '../api/cartApi';

const ProductCard = ({ product }) => {
  return (
    <Tilt
      perspective={1200}
      glareEnable={true}
      glareMaxOpacity={0.25}
      scale={1.05}
      transitionSpeed={1500}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      className="w-full max-w-[320px]"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/60 border border-white transition-all hover:border-indigo-100">
        
       
        {product.offer && (
          <div className="absolute top-5 left-5 z-20 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg tracking-widest uppercase">
            {product.offer}
          </div>
        )}

      
        <div className="relative h-52 w-full mb-6 rounded-3xl overflow-hidden bg-slate-50">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110" 
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
            {product.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900">${product.price}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MSRP $199</span>
            </div>
            
            <button onClick={async ()=>await addToCart(product._id)} className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ProductCard;