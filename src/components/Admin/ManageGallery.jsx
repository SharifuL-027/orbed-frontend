import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrash, FaStar, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Solar Projects');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [isFeatured, setIsFeatured] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of { file, preview }

  const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = (axiosInstance.defaults.baseURL || '').replace(/\/api\/?$/, '');
    return `${base}${url}`;
  };

  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get('/gallery');
      setItems(res.data || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Select multiple files & append to existing selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...mapped]);
    e.target.value = ''; // Reset input so same file can be re-selected if removed
  };

  // Remove a single image before uploading
  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles((prev) => {
      const target = prev[indexToRemove];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Please select at least one image.');
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('isFeatured', isFeatured);

    selectedFiles.forEach(({ file }) => {
      formData.append('images', file);
    });

    try {
      await axiosInstance.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      selectedFiles.forEach(({ preview }) => URL.revokeObjectURL(preview));
      setTitle('');
      setSelectedFiles([]);
      fetchItems();
    } catch (err) {
      alert('Upload failed. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (item) => {
    try {
      await axiosInstance.put(`/gallery/${item._id}`, { isFeatured: !item.isFeatured });
      fetchItems();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    try {
      await axiosInstance.delete(`/gallery/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Project Gallery</h2>
        <p className="text-sm text-gray-500">
          Select and upload multiple project photos at once, and choose which ones highlight in the top carousel.
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Project / Batch Title <span className="text-gray-400 font-normal">(Optional for multi-upload)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 500kW Industrial Rooftop Solar"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            >
              <option value="Solar Projects">Solar Projects</option>
              <option value="Industrial EPC">Industrial EPC</option>
              <option value="Street Light & Pump">Street Light &amp; Pump</option>
              <option value="Events & Team">Events &amp; Team</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Gazipur, Dhaka"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>
        </div>

        {/* Multi-File Dropzone */}
        <div className="relative border-2 border-dashed border-gray-200 hover:border-[#8ab645] rounded-2xl p-6 text-center bg-[#fafaf9] transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="space-y-1">
            <FaCloudUploadAlt className="mx-auto text-3xl text-[#8ab645]" />
            <p className="text-sm font-semibold text-gray-700">
              Click or drag multiple images here to upload
            </p>
            <p className="text-xs text-gray-400">
              Select up to 20 images at once (JPG, PNG, WEBP • Max 10MB each)
            </p>
          </div>
        </div>

        {/* Selected Images Preview Grid */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">
                Selected Images ({selectedFiles.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  selectedFiles.forEach(({ preview }) => URL.revokeObjectURL(preview));
                  setSelectedFiles([]);
                }}
                className="text-xs text-red-500 hover:underline font-semibold"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {selectedFiles.map((item, idx) => (
                <div key={idx} className="relative group h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={item.preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(idx)}
                    title="Remove image"
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded text-[#8ab645]"
            />
            Show in Top Hero Carousel
          </label>

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0}
            className="bg-[#8ab645] hover:bg-[#769e38] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            {uploading
              ? `Uploading ${selectedFiles.length} Image${selectedFiles.length > 1 ? 's' : ''}...`
              : `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length}) ` : ''}to Gallery`}
          </button>
        </div>
      </form>

      {/* Existing Gallery Grid */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading gallery...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={resolveImageUrl(item.imageUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.isFeatured && (
                  <span className="absolute top-3 left-3 bg-[#8ab645] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    Carousel Slide
                  </span>
                )}
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase text-[#8ab645]">{item.category}</p>
                  <h4 className="font-bold text-gray-900 text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <FaMapMarkerAlt /> {item.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleFeatured(item)}
                    title="Toggle Carousel Featured"
                    className={`p-2 rounded-lg border transition-colors ${
                      item.isFeatured
                        ? 'border-[#8ab645] bg-green-50 text-[#8ab645]'
                        : 'border-gray-200 text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <FaStar size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete"
                    className="p-2 rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaTrash size={14} />
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

export default ManageGallery;