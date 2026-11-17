import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaArrowRight,
  FaTimes,
  FaSearch,
  FaNewspaper
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = (axiosInstance.defaults.baseURL || '').replace(/\/api\/?$/, '');
    return `${base}${url}`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blogs');
        setBlogs(res.data || []);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Featured post (first featured or latest post)
  const featuredPost = blogs.find((b) => b.isFeatured) || blogs[0];

  // Dynamic categories
  const categories = ['All', ...new Set(blogs.map((b) => b.category).filter(Boolean))];

  // Filter + Search
  const filteredBlogs = blogs.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
  };

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 1. Fixed Parallax Hero Section (Matches Gallery & Careers) --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-[#8ab645] text-xs dm-sans-bold uppercase tracking-[0.25em] mb-3"
          >
            Knowledge &amp; Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl dm-sans-bold text-white leading-[1.2]"
          >
            Solar Energy Insights &amp; Industry Updates
          </motion.h1>
        </div>
      </section>

      {/* --- 2. Sharp Architectural Section: Featured Story + Articles Grid --- */}
      <section className="relative z-10 bg-white -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.18)] py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            <div className="space-y-12">
              <div className="w-full h-[420px] bg-gray-100 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-96 bg-gray-100 animate-pulse" />
                ))}
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="w-full py-24 bg-[#fafaf9] border border-gray-200 text-center">
              <FaNewspaper className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-700 dm-sans-bold text-lg">No Articles Published Yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Blog posts published from the admin dashboard will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              
              {/* Featured Editorial Spotlight */}
              {featuredPost && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => setSelectedBlog(featuredPost)}
                  className="grid grid-cols-1 lg:grid-cols-12 border border-gray-200 hover:border-[#061325] bg-[#fafaf9] shadow-[0_25px_60px_rgba(6,19,37,0.08)] transition-all duration-500 cursor-pointer group"
                >
                  {/* Image Left */}
                  <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-[#061325]">
                    <img
                      src={resolveImageUrl(featuredPost.coverImage)}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-6 left-6 bg-[#8ab645] text-[#061325] text-xs dm-sans-bold uppercase tracking-[0.2em] px-4 py-1.5">
                      Featured Story
                    </span>
                  </div>

                  {/* Content Right */}
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-6 h-[2px] bg-[#8ab645]" />
                        <span className="text-[#8ab645] text-xs dm-sans-bold uppercase tracking-[0.2em]">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl dm-sans-bold text-gray-900 group-hover:text-[#8ab645] transition-colors leading-snug mb-4">
                        {featuredPost.title}
                      </h2>

                      <p className="text-gray-600 sans-medium text-sm sm:text-base leading-relaxed line-clamp-4">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between gap-4">
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="font-bold text-gray-800">{featuredPost.author}</p>
                        <p className="flex items-center gap-3">
                          <span>{formatDate(featuredPost.createdAt)}</span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 bg-[#061325] group-hover:bg-[#8ab645] text-white group-hover:text-[#061325] px-5 py-3 text-xs dm-sans-bold uppercase tracking-widest transition-colors duration-300 shrink-0">
                        Read Article <FaArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Filter & Search Header */}
              <div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[2px] bg-[#8ab645]" />
                      <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-[0.22em]">
                        Latest Publications ({String(filteredBlogs.length).padStart(2, '0')})
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 leading-tight">
                      Explore All Articles
                    </h3>
                  </div>

                  {/* Search + Sharp Filter Tabs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="border border-gray-300 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#8ab645] w-full sm:w-56"
                      />
                    </div>

                    <div className="flex flex-wrap border border-gray-300 bg-white">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2.5 text-xs dm-sans-bold uppercase tracking-wider transition-all cursor-pointer border-r last:border-r-0 border-gray-200 ${
                            activeCategory === cat
                              ? 'bg-[#061325] text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-[#8ab645]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Articles Grid */}
                {filteredBlogs.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">No articles match your filter.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((post, idx) => (
                      <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                        onClick={() => setSelectedBlog(post)}
                        className="group bg-white border border-gray-200 hover:border-[#061325] shadow-xs hover:shadow-[0_25px_50px_rgba(6,19,37,0.12)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          {/* Cover Image */}
                          <div className="relative h-64 overflow-hidden bg-[#061325]">
                            <img
                              src={resolveImageUrl(post.coverImage)}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute top-4 left-4 bg-[#061325]/85 backdrop-blur-md border-l-2 border-[#8ab645] text-white text-[10px] dm-sans-bold uppercase tracking-[0.2em] px-3 py-1.5">
                              {post.category}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                              <span className="flex items-center gap-1.5">
                                <FaCalendarAlt className="text-[#8ab645]" />
                                {formatDate(post.createdAt)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <FaClock className="text-[#8ab645]" />
                                {post.readTime}
                              </span>
                            </div>

                            <h4 className="text-xl dm-sans-bold text-gray-900 group-hover:text-[#8ab645] transition-colors leading-snug mb-3">
                              {post.title}
                            </h4>

                            <p className="text-gray-600 sans-medium text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div>
                          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium truncate">
                              <FaUserTie className="text-[#8ab645] shrink-0" />
                              <span className="truncate">{post.author}</span>
                            </span>

                            <span className="text-[11px] dm-sans-bold uppercase tracking-widest text-[#061325] group-hover:text-[#8ab645] transition-colors shrink-0">
                              Read More →
                            </span>
                          </div>
                          <div className="h-[3px] w-0 group-hover:w-full bg-[#8ab645] transition-all duration-500" />
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* --- 3. Full Article Reader Modal --- */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="sticky top-4 float-right mr-4 mt-4 z-20 w-11 h-11 bg-[#061325] hover:bg-[#8ab645] text-white hover:text-[#061325] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <FaTimes size={16} />
              </button>

              {/* Cover Banner */}
              <div className="w-full h-72 sm:h-96 bg-[#061325] relative -mt-15">
                <img
                  src={resolveImageUrl(selectedBlog.coverImage)}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#061325]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 sm:left-10 right-6">
                  <span className="inline-block bg-[#8ab645] text-[#061325] text-xs dm-sans-bold uppercase tracking-widest px-3 py-1 mb-3">
                    {selectedBlog.category}
                  </span>
                  <h2 className="text-2xl sm:text-4xl dm-sans-bold text-white leading-tight">
                    {selectedBlog.title}
                  </h2>
                </div>
              </div>

              {/* Article Meta & Body */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider text-gray-500 pb-6 border-b border-gray-200">
                  <span className="flex items-center gap-2 font-bold text-gray-800">
                    <FaUserTie className="text-[#8ab645]" /> {selectedBlog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#8ab645]" /> {formatDate(selectedBlog.createdAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-[#8ab645]" /> {selectedBlog.readTime}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-800 leading-relaxed border-l-4 border-[#8ab645] pl-4">
                  {selectedBlog.excerpt}
                </p>

                <div className="text-gray-700 sans-medium text-base leading-relaxed whitespace-pre-line space-y-4">
                  {selectedBlog.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;