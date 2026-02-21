import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, X, Image as ImageIcon, DollarSign, Tag, Package } from 'lucide-react';
import { addItem, deleteItem, getItems, updateItem } from '../api/itemsApi';

const INITIAL_ITEMS = [
  {
    _id: '1',
    title: 'Vintage Camera',
    description: 'A classic 35mm film camera in excellent condition.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    price: 150,
    offer: 10,
    stock: 5,
    userId: 'user_123'
  }
];

const AddItems = () => {
  
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    offer: '',
    stock: ''
  });

  const fetchItems=async ()=>{
    const {success,message,data}=await getItems();
    console.log(data)
    if(success)
    setItems(data);

  }
  useEffect(()=>{
    fetchItems();

  },[])

  
  const handleAddNew = () => {
    setEditingItem(null);

    setFormData({ title: '', description: '', image: '', price: '', offer: '0', stock: '' });
    setIsModalOpen(true);
  };

  
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      offer: item.offer,
      stock: item.stock
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
     const {success}=await deleteItem(id);
     if(success)
      setItems(items.filter(item => item._id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!formData.title || !formData.price || !formData.stock) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingItem) {
      
      await updateItem(editingItem._id,editingItem);
      const updatedItems = items.map(item => 
        item._id === editingItem._id ? { ...item, ...formData, price: Number(formData.price), offer: Number(formData.offer), stock: Number(formData.stock) } : item
      );

      setItems(updatedItems);
    } else {
      
      const newItem = {
        ...formData,
        price: Number(formData.price),
        offer: Number(formData.offer),
        stock: Number(formData.stock),
        userId: 'current_user_id' 
      };
     const {success,data}= await addItem(newItem);
     if(success)
      setItems([...items, data]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
       
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Manage your products, stock, and pricing.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Plus size={20} />
            Add New Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <Package className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">No items found. Click "Add New Item" to start.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
               
                <div className="h-48 w-full bg-gray-200 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {e.target.src='https://via.placeholder.com/400x300?text=No+Image'}}
                  />
                  {item.offer > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.offer}% OFF
                    </span>
                  )}
                </div>

              
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Price</span>
                        <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">Stock</span>
                        <span className={`text-sm font-medium px-2 py-0.5 rounded ${item.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
                        </span>
                    </div>
                  </div>

                  
                  <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 py-2 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

       
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

             
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. Wireless Headphones"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Describe the product..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      name="image"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offer (%)</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="offer"
                        min="0"
                        value={formData.offer}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="stock"
                        required
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    {editingItem ? 'Update Item' : 'Create Item'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddItems;