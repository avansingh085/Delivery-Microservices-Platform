import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCart, getCartItems, updateCart } from '../api/cartApi';
import { Error, Success } from '../utils/toast';
import { getItemById } from '../api/itemsApi';
import Checkout from '../components/CheckOut';

const CartPage = () => {
 
  const [cartItems, setCartItems] = useState([]);
  const [range,setRange]=useState({start:1,limit:20});

  useEffect(() => {
  const fetchData = async () => {
    const { success, data, message } = await getCartItems(range.start, range.limit);

    if (success) {
      const carts = await Promise.all(
        data.map(async (c) => {
          const res = await getItemById(c.itemId);
          return { ...c, itemId: { ...res.data } };
        })
      );

      setCartItems(carts);
      Success(message);
    } else {
      Error(message);
    }
  };

  fetchData();
}, []);
 

  const deliveryFee = 5.00;

 
  const subtotal = cartItems.reduce((acc, item) => acc + (item.itemId.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handleIncrease = async (id) => {
    const {success,message}= await updateCart(id);
    setCartItems(prev => prev.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
   
  };

  const handleDecrease = async (id) => {
    if((item.quantity)>1)
    {
     const {success,message}= await updateCart(id,{quantity:item.quantity-1});
     if(success)
     {
    setCartItems(prev => prev.map(item => 
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));

     }
  }
  else{

  }
   
  };

  const handleRemove = async (id) => {
     const {success,message}= await deleteCart(id);
     if(success)
     {
    setCartItems(prev => prev.filter(item => item._id !== id));
        Success(message);
     }
     else
     {
       Error(message);
     }
   
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-black uppercase">Your Cart is Empty</h2>
        <Link to="/items" className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:opacity-80">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
     
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cartItems.map((cartItem) => (
            <div 
              key={cartItem._id} 
              className="flex gap-6 p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 items-center bg-white"
            >
            
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={cartItem.itemId.image} 
                  alt={cartItem.itemId.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between h-24 sm:h-32 py-1">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase leading-tight">
                    {cartItem.itemId.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    ${cartItem?.itemId?.price?.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                
                  <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-1">
                    <button 
                      onClick={() => handleDecrease(cartItem._id)}
                      className="text-lg font-bold hover:text-gray-500 w-4"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{cartItem.quantity}</span>
                    <button 
                      onClick={() => handleIncrease(cartItem._id)}
                      className="text-lg font-bold hover:text-gray-500 w-4"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => handleRemove(cartItem._id)}
                    className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700 border-b border-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-28">
            <h2 className="text-xl font-black uppercase tracking-wide mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6">
              <span className="text-xl font-black uppercase">Total</span>
              <span className="text-2xl font-black">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-xl">
              <Checkout amount={99} cartItems={cartItems}/>
            </button>

            <p className="text-xs text-center text-gray-400 mt-4 uppercase tracking-wide">
              Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;