import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaCloudUploadAlt } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Solar Insights',
    author: 'Orbed Engineering Team',
    readTime: '4 min read',
    excerpt: '',
    content: '',
    isFeatured: false,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState('');

  const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = (axiosInstance.defaults.baseURL || '').replace(/\/api\/?$/, '');
    return `${base}${url}`;
  };

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get('/blogs');
      setBlogs(res.data || []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Solar Insights',
      author: 'Orbed Engineering Team',
      readTime: '4 min read',
      excerpt: '',
      content: '',
      isFeatured: false,
    });
    setCoverFile(null);
    setPreview('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !coverFile) return alert('Please select a cover image.');
    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (coverFile) data.append('coverImage', coverFile);

    try {
      if (editingId) {
        await axiosInstance.put(`/blogs/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.post('/blogs', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert('Failed to save blog post.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      excerpt: blog.excerpt,
      content: blog.content,
      isFeatured: blog.isFeatured,
    });
    setCoverFile(null);
    setPreview(resolveImageUrl(blog.coverImage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFeatured = async (blog) => {
    try {
      await axiosInstance.put(`/blogs/${blog._id}`, { isFeatured: !blog.isFeatured });
      fetchBlogs();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post permanently?')) return;
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Blog &amp; Insights</h2>
        <p className="text-sm text-gray-500">Publish solar engineering guides, project case studies, and company news.</p>
      </div>

      {/* Create / Edit Blog Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
        <h3 className="font-bold text-gray-800">{editingId ? 'Edit Article' : 'Publish New Article'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. How Industrial Net Metering Reduces Factory Bills in BD"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            >
              <option value="Solar Insights">Solar Insights</option>
              <option value="EPC Engineering">EPC Engineering</option>
              <option value="Industry News">Industry News</option>
              <option value="Sustainability">Sustainability</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Read Time</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              placeholder="e.g. 5 min read"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Author Name</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Short Summary / Excerpt *</label>
            <input
              type="text"
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="1–2 sentence preview shown on the blog card..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Full Article Content *</label>
          <textarea
            rows="6"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write the full blog content here..."
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
          />
        </div>

        {/* Cover Image Upload */}
        <div className="relative border-2 border-dashed border-gray-200 hover:border-[#8ab645] rounded-2xl p-5 text-center bg-[#fafaf9] transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {preview ? (
            <img src={preview} alt="Cover Preview" className="h-36 mx-auto rounded-xl object-cover shadow-xs" />
          ) : (
            <div className="space-y-1">
              <FaCloudUploadAlt className="mx-auto text-3xl text-[#8ab645]" />
              <p className="text-sm font-semibold text-gray-700">Click or drag a cover image</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded text-[#8ab645]"
            />
            Pin as Featured Top Story
          </label>

          <div className="flex items-center gap-3">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[#8ab645] hover:bg-[#769e38] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors"
            >
              <FaPlus size={12} /> {submitting ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </div>
      </form>

      {/* Published Blogs List */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-44 bg-gray-100">
                  <img
                    src={resolveImageUrl(blog.coverImage)}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  {blog.isFeatured && (
                    <span className="absolute top-3 left-3 bg-[#8ab645] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      Featured Story
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold uppercase text-[#8ab645]">{blog.category}</span>
                  <h4 className="font-bold text-gray-900 text-base mt-1 line-clamp-1">{blog.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{blog.excerpt}</p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{blog.author} • {blog.readTime}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(blog)}
                    title="Pin Featured Story"
                    className={`p-2 rounded-lg border transition-colors ${
                      blog.isFeatured
                        ? 'border-[#8ab645] bg-green-50 text-[#8ab645]'
                        : 'border-gray-200 text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <FaStar size={13} />
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    title="Edit"
                    className="p-2 rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <FaEdit size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    title="Delete"
                    className="p-2 rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;