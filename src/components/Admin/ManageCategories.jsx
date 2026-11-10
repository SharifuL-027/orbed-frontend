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
import axiosInstance from '../../api/axiosInstance'; 

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

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Manage Categories</h1>
          <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">Add, edit, or delete product categories for your store.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="w-full sm:w-auto bg-[#0a192f] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#8ab645] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Categories Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] flex-shrink-0">
            <FaTags size={16} className="sm:text-lg" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">All Categories</h3>
          {!loading && (
            <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {categories.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
            <FaSpinner className="animate-spin text-[#8ab645] text-3xl sm:text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-xs sm:text-sm">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-4">
            <p className="text-gray-500 text-sm mb-4">No categories found. Create your first category!</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <ul className="md:hidden divide-y divide-gray-100">
              {categories.map((cat) => (
                <li key={cat._id} className="p-4 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 break-words">{cat.name}</p>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-3 break-words">
                      {cat.description || 'No description'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2.5 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                      aria-label="Edit Category"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                      aria-label="Delete Category"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Tablet & Desktop: Table layout */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold w-1/4">Name</th>
                    <th className="p-4 font-semibold w-2/4">Description</th>
                    <th className="p-4 font-semibold w-1/4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">
                        <div className="truncate max-w-[10rem] lg:max-w-[16rem]">{cat.name}</div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="truncate max-w-[14rem] lg:max-w-md">{cat.description || 'No description'}</div>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => handleOpenEdit(cat)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1 cursor-pointer"
                          title="Edit"
                          aria-label="Edit Category"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                          aria-label="Delete Category"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.97 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-lg max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 bg-[#fafaf9] shrink-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif">
                  {editId ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Close"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">Category Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-base sm:text-sm" 
                      placeholder="e.g. Solar Panels" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
                    <textarea 
                      name="description" 
                      rows="3" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-base sm:text-sm resize-none" 
                      placeholder="Brief description of this category..."
                    ></textarea>
                  </div>
                </div>

                {/* Modal Footer / Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 p-4 sm:p-6 border-t border-gray-100 bg-[#fafaf9] shrink-0">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-6 py-2.5 text-gray-600 font-bold text-xs sm:text-sm hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#8ab645] text-white px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#7a9d3d] shadow-[0_5px_15px_rgba(138,182,69,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ManageCategories;