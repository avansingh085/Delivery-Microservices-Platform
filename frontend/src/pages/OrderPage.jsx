import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/orderApi';
import { getItemById } from "../api/itemsApi"

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndItems = async () => {
      try {
        setLoading(true);
        
        const { data: orderData, success: orderSuccess } = await getOrders();

        if (orderSuccess && orderData) {
        
          const enrichedOrders = await Promise.all(
            orderData.map(async (order) => {
              try {
                const { data: itemData, success: itemSuccess } = await getItemById(order.itemId);
                if (itemSuccess) {
               
                  return { ...order, item: itemData };
                }
                return order; 
              } catch (err) {
                console.error(`Failed to fetch item ${order.itemId}`, err);
                return order;
              }
            })
          );
          
          setOrders(enrichedOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id || order.paymentId} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row p-6 gap-6">
                 
                  <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    {order.item?.image ? (
                      <img 
                        src={order.item.image} 
                        alt={order.item.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

               
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                          {order.item?.title || 'Unknown Item'}
                        </h2>
                        <span className="text-lg font-bold text-gray-900">
                          ${order.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {order.item?.description || 'No description available.'}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="font-medium">Qty:</span> {order.quantity}
                      </div>
                     
                      <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                        ${order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'}`}
                      >
                        Order: {order.orderStatus}
                      </div>

                     
                      <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                        ${order.paymentStatus === 'pending' ? 'bg-orange-100 text-orange-800' : 
                          'bg-green-100 text-green-800'}`}
                      >
                        Payment: {order.paymentStatus}
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                  <span>Order ID: {order._id || 'N/A'}</span>
                  <span>Payment ID: {order.paymentId}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;