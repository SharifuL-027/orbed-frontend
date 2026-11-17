import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-Time',
    location: 'Dhaka, Bangladesh',
    department: 'Engineering',
    description: '',
    isActive: true,
  });

  const fetchAllJobs = async () => {
    try {
      const res = await axiosInstance.get('/jobs?all=true');
      setJobs(res.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      type: 'Full-Time',
      location: 'Dhaka, Bangladesh',
      department: 'Engineering',
      description: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/jobs/${editingId}`, formData);
      } else {
        await axiosInstance.post('/jobs', formData);
      }
      resetForm();
      fetchAllJobs();
    } catch (err) {
      alert('Failed to save job post.');
      console.error(err);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setFormData({
      title: job.title,
      type: job.type,
      location: job.location,
      department: job.department || '',
      description: job.description || '',
      isActive: job.isActive,
    });
  };

  const handleToggleStatus = async (job) => {
    try {
      await axiosInstance.put(`/jobs/${job._id}`, { isActive: !job.isActive });
      fetchAllJobs();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job post?')) return;
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      fetchAllJobs();
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Job Openings</h2>
        <p className="text-sm text-gray-500">Create, edit, or close positions displayed on the Careers page.</p>
      </div>

      {/* Add / Edit Job Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-gray-800">{editingId ? 'Edit Job Post' : 'Post a New Job'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Solar Engineer"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Employment Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. EPC Engineering"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Short Role Summary</label>
          <textarea
            rows="2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief responsibilities or qualifications..."
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8ab645]"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded text-[#8ab645] focus:ring-[#8ab645]"
            />
            Visible on Careers Page (Active)
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
              className="inline-flex items-center gap-2 bg-[#8ab645] hover:bg-[#769e38] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
            >
              <FaPlus size={12} /> {editingId ? 'Update Job' : 'Publish Job'}
            </button>
          </div>
        </div>
      </form>

      {/* Jobs List Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No job posts found. Add your first position above.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <div key={job._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {job.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1.5">
                    <span className="flex items-center gap-1"><FaBriefcase className="text-[#8ab645]" /> {job.type}</span>
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-[#8ab645]" /> {job.location}</span>
                    {job.department && <span>• {job.department}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(job)}
                    title={job.isActive ? 'Close Position' : 'Reopen Position'}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-[#8ab645] hover:border-[#8ab645] transition-colors"
                  >
                    {job.isActive ? <FaTimesCircle /> : <FaCheckCircle />}
                  </button>
                  <button
                    onClick={() => handleEdit(job)}
                    title="Edit"
                    className="p-2 rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    title="Delete"
                    className="p-2 rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;