import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogData } from '../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(blogData[id] || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If it's a hardcoded blog (ID 1-6), we already set it initially
    if (blogData[id]) {
      setLoading(false);
      return;
    }

    // Otherwise, attempt to fetch from DB (MongoDB ObjectId)
    const fetchDbBlog = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/blogs/${id}`);
        const b = response.data;
        setPost({
          id: b._id,
          title: b.title,
          category: b.category,
          author: b.author || 'Kormyx Editorial',
          date: b.date || new Date(b.createdAt).toLocaleDateString(),
          readTime: b.readTime,
          description: b.description,
          image: b.imageUrl ? `${apiUrl}${b.imageUrl}` : "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
          // Map DB content directly
          content: b.content
        });
      } catch (err) {
        console.error("Failed to fetch blog post", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDbBlog();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/50">Loading post...</div>;
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <SEO 
        title={`${post.title} | Kormyx`}
        description={post.description}
        canonicalUrl={`/blog/${id}`}
        ogType="article"
      />

      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        
        <Link to="/blog" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Back to Insights
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-white/10 pb-16">
          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
             <span className="text-white">{post.category}</span>
             <span>•</span>
             <span>{post.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>Answer Engine Optimized</span>
            </div>
          </div>
        </header>

        {/* Content Body - Rendered from HTML String */}
        <article 
          className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-light prose-h2:text-3xl prose-h3:text-2xl prose-a:text-white hover:prose-a:text-gray-300 prose-p:text-white/70 prose-strong:text-white prose-strong:font-medium"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action */}
        <div className="mt-24 p-12 border border-white/10 bg-[#0A0A0A] text-center">
           <h3 className="text-2xl font-light mb-4">Execute this strategy.</h3>
           <p className="text-white/60 mb-8 max-w-md mx-auto">Kormyx partners with elite brands to engineer high-end digital experiences and growth systems.</p>
           <Link to="/" className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Partner with Kormyx
           </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
