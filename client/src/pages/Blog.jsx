import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FinalCTA from '../components/FinalCTA';
import { ArrowRight, Clock } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Do I Need an SEO Expert or Can I Do It Myself?",
      category: "SEO",
      readTime: "5 min read",
      excerpt: "Deciding between DIY SEO and hiring a professional? We break down the true cost of learning SEO versus the ROI of bringing in an expert to fast-track your rankings.",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "What's the Difference Between SEO and PPC Advertising?",
      category: "Digital Marketing",
      readTime: "4 min read",
      excerpt: "Unsure whether to invest in Search Engine Optimization or Pay-Per-Click ads? Discover the pros, cons, and timelines for each strategy to maximize your marketing budget.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Why Isn't My Website Converting Visitors Into Customers?",
      category: "Web Design",
      readTime: "6 min read",
      excerpt: "Traffic without conversions is a waste of money. Learn the top UX and design mistakes that are killing your sales and how to fix them immediately.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Should I Hire a Freelancer or an Agency for Digital Marketing?",
      category: "Business Strategy",
      readTime: "7 min read",
      excerpt: "The ultimate guide to structuring your marketing team. We compare the flexibility of freelancers against the comprehensive scale and reliability of a full-service agency.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Is Shopify or WordPress Better for My Online Store?",
      category: "E-commerce",
      readTime: "5 min read",
      excerpt: "Choosing the right platform is critical for e-commerce success. We analyze Shopify and WordPress (WooCommerce) based on scalability, cost, and ease of use.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "What's Included in Professional Website Development?",
      category: "Web Development",
      readTime: "4 min read",
      excerpt: "Demystifying the website development process. Find out exactly what services, from wireframing to SEO optimization, you should expect from a top-tier agency.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-16 md:mb-24 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              Insights & <span className="gold-gradient-text">Strategies</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Expert advice on digital marketing, web development, and scaling your business in the modern digital landscape.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={post.id} 
                className="group relative flex flex-col bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/90">{post.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-white/40 mb-4">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-medium mb-4 leading-snug group-hover:text-[#E8B84A] transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-white/60 leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity mt-auto"
                  >
                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Blog;
