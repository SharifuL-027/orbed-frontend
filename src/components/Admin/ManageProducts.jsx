import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaSpinner, 
  FaTimes, 
  FaBoxOpen,
  FaImage
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance'; 

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🔥 Form State for Multiple Images
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    description: '',
    images: [] // Array for multiple files
  });
  const [editId, setEditId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]); // Array for multiple previews

 // 1. Fetch Products & Categories
  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        axiosInstance.get('/products'),
        axiosInstance.get('/categories')
      ]);

      const productsArray = Array.isArray(prodRes.data) 
        ? prodRes.data 
        : (prodRes.data.products || prodRes.data.data || []);

      const categoriesArray = Array.isArray(catRes.data) 
        ? catRes.data 
        : (catRes.data.categories || catRes.data.data || []);

      setProducts(productsArray);
      setCategories(categoriesArray);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Open Modal for Add/Edit
  const handleOpenAdd = () => {
    setFormData({ name: '', category: '', price: '', description: '', images: [] });
    setPreviewImages([]);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setFormData({ 
      name: product.name, 
      category: product.category?._id || product.category, 
      price: product.price, 
      description: product.description || '',
      images: [] // Ekhane faka thakbe, jodi notun image na dey tahole agertai backend e thakbe
    });
    // 🔥 Backend theke asha imageUrls array take preview te set kora
    setPreviewImages(product.imageUrls || []); 
    setEditId(product._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', category: '', price: '', description: '', images: [] });
    setPreviewImages([]);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔥 Handle Multiple File Selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    if (files.length > 0) {
      setFormData(prev => ({ ...prev, images: files }));
      
      // Local preview URLs toiri kora
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(previews); 
    }
  };

  // 3. Submit Form (Create or Update with FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('category', formData.category);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
    
    // 🔥 Multiple images append kora
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(image => {
        submitData.append('imageUrls', image); // Backend er sathe match korte hobe
      });
    }

    try {
      if (editId) {
        await axiosInstance.put(`/products/${editId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post('/products', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchData(); 
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        fetchData(); 
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="w-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Manage Products</h1>
          <p className="text-gray-500 mt-2 text-sm">Add, edit, or delete items from your solar inventory.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#0a192f] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#8ab645] transition-colors shadow-lg flex items-center gap-2"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* Products Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645]">
            <FaBoxOpen size={18} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Inventory List</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No products found. Add your first product!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold w-16">Image</th>
                  <th className="p-4 font-semibold">Product Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      {/* 🔥 Table-e first image ta show korabo */}
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                          <FaImage />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-gray-900">{product.name}</td>
                    <td className="p-4 text-gray-600 text-sm">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 font-bold">${product.price}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#fafaf9] sticky top-0 z-10">
                <h3 className="text-xl font-bold text-gray-900 font-serif">
                  {editId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleInputChange} 
                      className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" 
                      placeholder="e.g. 500W Solar Panel" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                    <select 
                      name="category" required value={formData.category} onChange={handleInputChange}
                      className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm text-gray-700"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($) *</label>
                  <input 
                    type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleInputChange} 
                    className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" 
                    placeholder="e.g. 299.99" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea 
                    name="description" rows="4" value={formData.description} onChange={handleInputChange} 
                    className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm resize-none" 
                    placeholder="Detailed product description..."
                  ></textarea>
                </div>

                {/* Multiple Image Upload Area */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Images (Up to 5)</label>
                  <div className="flex flex-col gap-4">
                    {/* Image Previews Grid */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {previewImages.length > 0 ? (
                        previewImages.map((src, index) => (
                          <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 shadow-sm">
                            <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                          </div>
                        ))
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-[#fafaf9] border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                          <FaImage size={24} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <input 
                        type="file" 
                        name="imageUrls" 
                        onChange={handleFileChange} 
                        accept="image/*"
                        multiple // 🔥 Allows selecting multiple files
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#8ab645] hover:file:bg-green-100 transition-colors cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-2">Hold Ctrl/Cmd to select multiple images (Max 5, 2MB each).</p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer / Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
                  <button 
                    type="button" onClick={handleCloseModal}
                    className="px-6 py-2.5 text-gray-600 font-bold text-sm hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="bg-[#8ab645] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#7a9d3d] shadow-[0_5px_15px_rgba(138,182,69,0.3)] transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><FaSpinner className="animate-spin" /> Saving...</>
                    ) : (
                      <>{editId ? 'Update Product' : 'Save Product'}</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ManageProducts;