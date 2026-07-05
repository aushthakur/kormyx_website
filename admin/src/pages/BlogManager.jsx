import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Image as ImageIcon, Send } from 'lucide-react';

const BlogManager = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: 'Kormyx Editorial',
    readTime: '5 min read',
    description: '',
    content: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const token = localStorage.getItem('kormyx_admin_token');
    
    // Use FormData for file upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('readTime', formData.readTime);
    data.append('description', formData.description);
    data.append('content', formData.content);
    if (image) {
      data.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/admin/blogs', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setStatus('Blog published successfully!');
      setFormData({
        title: '',
        category: '',
        author: 'Kormyx Editorial',
        readTime: '5 min read',
        description: '',
        content: ''
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatus('Failed to publish blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <div className="p-8 md:p-12 max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light mb-2">Blog CMS</h1>
            <p className="text-white/50">Publish new articles directly to the Kormyx digital ecosystem.</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Blog Title</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                placeholder="e.g. The Future of SaaS"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Category</label>
              <input 
                type="text" 
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                placeholder="e.g. Web Development"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Author</label>
              <input 
                type="text" 
                name="author"
                required
                value={formData.author}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Read Time</label>
              <input 
                type="text" 
                name="readTime"
                required
                value={formData.readTime}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">SEO Description (Meta)</label>
            <textarea 
              name="description"
              required
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
              placeholder="Short summary for Google and social previews..."
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 flex items-center justify-between">
              <span>Main Content (HTML/Markdown Supported)</span>
              <span className="text-[10px] text-white/30">Use &lt;h2&gt; for AEO optimized questions</span>
            </label>
            <textarea 
              name="content"
              required
              rows="15"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors font-mono text-sm"
              placeholder="<h2>What is the future?</h2><p><strong>The future is bright.</strong> Here is more info...</p>"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Featured Image</label>
            <div className="border-2 border-dashed border-white/20 p-8 text-center flex flex-col items-center justify-center bg-[#0A0A0A] hover:bg-[#111] transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <ImageIcon className="w-8 h-8 text-white/30 mb-3" />
              <p className="text-sm font-medium text-white/70">
                {image ? image.name : "Click or drag to upload featured image"}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {status && (
              <p className={`text-sm font-bold ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </p>
            )}
            {!status && <div />}
            
            <button 
              type="submit" 
              disabled={loading}
              className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish to Live'}
              {!loading && <Send size={16} />}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};

export default BlogManager;
