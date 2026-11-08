import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaSpinner, 
  FaTimes, 
  FaTags 
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance'; // Apnar axios file er sothik path din

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Open Modal for Add/Edit
  const handleOpenAdd = () => {
    setFormData({ name: '', description: '' });
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setFormData({ name: category.name, description: category.description || '' });
    setEditId(category._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', description: '' });
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editId) {
        // Update Category
        await axiosInstance.put(`/categories/${editId}`, formData);
      } else {
        // Create Category
        await axiosInstance.post('/categories', formData);
      }
      fetchCategories(); // Refresh data
      handleCloseModal();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Delete Category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axiosInstance.delete(`/categories/${id}`);
        fetchCategories(); // Refresh data
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Manage Categories</h1>
          <p className="text-gray-500 mt-2 text-sm">Add, edit, or delete product categories for your store.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#0a192f] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#8ab645] transition-colors shadow-lg flex items-center gap-2"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Categories Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645]">
            <FaTags size={18} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">All Categories</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No categories found. Create your first category!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold w-1/4">Name</th>
                  <th className="p-4 font-semibold w-2/4">Description</th>
                  <th className="p-4 font-semibold w-1/4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{cat.name}</td>
                    <td className="p-4 text-gray-600 text-sm truncate max-w-xs">{cat.description || 'No description'}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleOpenEdit(cat)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id)}
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

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#fafaf9]">
                <h3 className="text-xl font-bold text-gray-900 font-serif">
                  {editId ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" 
                    placeholder="e.g. Solar Panels" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
                  <textarea 
                    name="description" 
                    rows="3" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm resize-none" 
                    placeholder="Brief description of this category..."
                  ></textarea>
                </div>

                {/* Modal Footer / Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100 mt-6">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 text-gray-600 font-bold text-sm hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#8ab645] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#7a9d3d] shadow-[0_5px_15px_rgba(138,182,69,0.3)] transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><FaSpinner className="animate-spin" /> Saving...</>
                    ) : (
                      <>{editId ? 'Update Category' : 'Save Category'}</>
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

export default ManageCategories;