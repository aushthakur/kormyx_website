import React, { useState } from 'react';
import './LeadCapture.css';

const LeadCapture = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    volume: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally handle submission here
    console.log(formData);
  };

  return (
    <section id="contact" className="section-padding lead-section">
      <div className="container">
        <div className="lead-container glass-panel">
          <div className="lead-content">
            <h2 className="section-title">Check Your <span className="gold-gradient-text">Eligibility</span></h2>
            <p className="lead-description">
              Kormyx works with high-growth enterprises processing over $1M in annual volume. Tell us about your infrastructure to see if we're a match.
            </p>
            <div className="lead-perks">
              <div className="perk">✓ Custom integration blueprint</div>
              <div className="perk">✓ Dedicated engineering team</div>
              <div className="perk">✓ Priority 24/7 support</div>
            </div>
          </div>
          
          <div className="lead-form-wrapper">
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className={formData.name ? 'has-value' : ''}
                />
                <label htmlFor="name">Full Name</label>
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className={formData.email ? 'has-value' : ''}
                />
                <label htmlFor="email">Work Email</label>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                  required 
                  className={formData.company ? 'has-value' : ''}
                />
                <label htmlFor="company">Company Name</label>
              </div>

              <div className="form-group">
                <select 
                  id="volume" 
                  name="volume" 
                  value={formData.volume}
                  onChange={handleChange}
                  required
                  className={formData.volume ? 'has-value' : ''}
                >
                  <option value="" disabled hidden></option>
                  <option value="1M-10M">$1M - $10M</option>
                  <option value="10M-50M">$10M - $50M</option>
                  <option value="50M+">$50M+</option>
                </select>
                <label htmlFor="volume">Monthly Volume</label>
              </div>

              <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem', marginTop: '1rem' }}>
                Request Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
