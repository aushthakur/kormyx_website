import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import { Target, Zap, Shield, Users, Layers, Activity } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const methodology = [
    {
      icon: Layers,
      title: "Deep Discovery",
      description: "We begin by dissecting your market, analyzing competitors, and understanding your core business mechanics to find the ultimate leverage points."
    },
    {
      icon: Target,
      title: "Strategic Blueprinting",
      description: "We construct a comprehensive architecture—from UI/UX wireframes to database schemas and multi-channel acquisition funnels."
    },
    {
      icon: Zap,
      title: "Agile Execution",
      description: "Our engineering and marketing teams work in rapid sprints, deploying scalable solutions and iterating based on real-time feedback."
    },
    {
      icon: Activity,
      title: "Continuous Scaling",
      description: "Post-launch, we shift focus to aggressive growth. We optimize conversion rates, refine ad spend, and scale your infrastructure to handle massive traffic."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Data-Driven Strategy",
      description: "We don't guess. Every campaign, design choice, and line of code is backed by hard data and rigorous testing to ensure maximum ROI."
    },
    {
      icon: Zap,
      title: "Uncompromising Execution",
      description: "Speed without sacrificing quality. We build robust, scalable architectures that load instantly and perform flawlessly under pressure."
    },
    {
      icon: Shield,
      title: "Absolute Transparency",
      description: "No black-box tactics. You get complete visibility into our processes, performance metrics, and the strategies driving your growth."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20">
      <SEO 
        title="About Kormyx | Premium Digital Marketing & Web Development Agency"
        description="Discover how Kormyx redefines digital excellence. We are a premier agency specializing in high-performance web development, SaaS, and data-driven marketing."
        canonicalUrl="/company/about"
        breadcrumbs={[{ name: "Company", url: "#" }, { name: "About", url: "/company/about" }]}
      />
      <Navbar />

      <main className="pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 mb-20 md:mb-32 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight mb-8">
            Redefining <span className="text-white font-medium">Digital Excellence</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            We are an elite collective of engineers, designers, and growth hackers dedicated to building scalable solutions and dominating market verticals.
          </p>
        </section>

        {/* Mission Split Section */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight">Built for scale.<br/>Designed to convert.</h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                Founded with a singular vision, Kormyx bridges the gap between stunning aesthetic design and ruthless backend performance. We recognized that most digital agencies excel at one but completely fail at the other.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                Whether we are engineering a complex SaaS architecture from the ground up, redesigning an enterprise e-commerce platform, or launching a high-converting paid media campaign, our approach is identical: aggressive growth fueled by pristine, uncompromising execution.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
                We act as a technical co-founder and a hyper-growth marketing team rolled into one. We don't just build websites; we build digital empires.
              </p>
              
              <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl md:text-5xl font-medium text-white mb-2">98%</div>
                  <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">Client Retention</div>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-medium text-white mb-2">150+</div>
                  <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">Projects Shipped</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 h-[400px] md:h-[600px] relative animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 border border-white/10 bg-[#0A0A0A] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kormyx team collaborating" 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Our <span className="font-medium">Methodology</span></h2>
            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">A systematic, proven approach to building and scaling high-performance digital assets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="bg-transparent border-l-2 border-white/10 pl-6 py-2 hover:border-white/50 transition-colors duration-300 animate-fade-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="text-white/30 font-serif text-3xl mb-4">0{index + 1}</div>
                  <Icon className="text-white mb-4" size={24} />
                  <h3 className="text-lg font-medium mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Our Core <span className="font-medium">Values</span></h2>
            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">The principles that dictate our engineering, design, and growth strategies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 hover:border-white/30 transition-colors duration-300 animate-fade-up"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Culture / Team snippet */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 mb-20 md:mb-24">
           <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-24 text-center relative overflow-hidden animate-fade-up">
              <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[150%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
              
              <Users className="mx-auto text-white/30 mb-6 md:mb-8" size={48} />
              <h2 className="text-3xl md:text-5xl font-light mb-6 md:mb-8 relative z-10">
                Join the <span className="font-medium">Collective</span>
              </h2>
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8 md:mb-10 relative z-10">
                We are always looking for top-tier talent. If you are obsessed with pushing the boundaries of digital experiences and scaling businesses, we want to talk.
              </p>
              <a href="/company/careers" className="inline-block bg-white text-black px-6 md:px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors relative z-10 w-full md:w-auto">
                View Open Positions
              </a>
           </div>
        </section>

      </main>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default About;
