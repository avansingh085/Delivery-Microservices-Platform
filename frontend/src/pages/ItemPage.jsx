import React, { useEffect ,useState} from 'react';
import ProductCard from '../components/ProductCard';
import { getItems } from '../api/itemsApi';


const ItemPage = () => {

  const [items,setItems]=useState([]);
    useEffect(()=>{
      const fetchData=async ()=>{
        try{
            const {data,message}= await  getItems();
          
            setItems(data);
        }
        catch(err){

        }
      }
      fetchData();
          
    },[])
  return (
    <div className="min-h-screen bg-slate-50/50 py-20 px-6 sm:px-12">
      <div className="max-w-[1400px] mx-auto">
        
      
        <div className="mb-20 text-center space-y-4">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
            New Arrivals
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Explore the latest innovations in high-performance gear and minimalist design.
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 p-4">
          {items?.map((product) => (
            <div key={product.id} className="flex justify-center items-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ItemPage;