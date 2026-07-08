import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-REDERSJF3F';

export default function AnalyticsTracker() {
  const location = useLocation();
  const scrolledDepths = useRef(new Set());

  // 1. Track SPA Route Changes (Page Views)
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    
    // Reset scroll depths on new page
    scrolledDepths.current.clear();
  }, [location]);

  // 2. Global Event Listeners
  useEffect(() => {
    // Helper to safely send events
    const sendEvent = (eventName, params) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    };

    // --- Scroll Tracking ---
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;
      const depths = [25, 50, 75, 100];

      depths.forEach((depth) => {
        if (scrollPercentage >= depth && !scrolledDepths.current.has(depth)) {
          scrolledDepths.current.add(depth);
          sendEvent('scroll', { percent_scrolled: depth });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Click Tracking ---
    const handleClick = (e) => {
      const target = e.target.closest('a, button, input[type="submit"]');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.textContent || target.value || '').toLowerCase().trim();
      
      // CTA Button Tracking
      const ctaKeywords = ['book now', 'contact us', 'get quote', 'schedule', 'get started', 'learn more', 'submit'];
      const isCTA = ctaKeywords.some(keyword => text.includes(keyword)) || target.classList.contains('cta-button');
      
      if (isCTA) {
        sendEvent('cta_click', { button_text: text, link_url: href });
      }

      // WhatsApp Tracking
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        sendEvent('whatsapp_click', { link_url: href });
      }
      
      // Email Tracking
      if (href.startsWith('mailto:')) {
        sendEvent('email_click', { email_address: href.replace('mailto:', '') });
      }

      // Phone Tracking
      if (href.startsWith('tel:')) {
        sendEvent('phone_click', { phone_number: href.replace('tel:', '') });
      }

      // File Download Tracking
      const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar', '.txt', '.csv'];
      if (fileExtensions.some(ext => href.toLowerCase().endsWith(ext))) {
        sendEvent('file_download', { file_name: href, file_extension: href.split('.').pop() });
      }

      // Outbound Link Tracking
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        sendEvent('outbound_click', { link_url: href });
      }
    };
    document.addEventListener('click', handleClick);

    // --- Form Tracking ---
    const handleFormFocus = (e) => {
      const form = e.target.closest('form');
      if (form && !form.dataset.started) {
        form.dataset.started = 'true';
        sendEvent('form_start', { form_id: form.id || form.name || 'unnamed_form' });
      }
    };
    
    const handleFormSubmit = (e) => {
      const form = e.target.closest('form');
      if (form) {
        sendEvent('form_submit', { form_id: form.id || form.name || 'unnamed_form' });
      }
    };
    
    document.addEventListener('focusin', handleFormFocus);
    document.addEventListener('submit', handleFormSubmit);

    // --- Video Tracking ---
    const handleVideoEvent = (e) => {
      const video = e.target;
      if (video.tagName !== 'VIDEO') return;
      
      let eventName = '';
      if (e.type === 'play') eventName = 'video_start';
      if (e.type === 'pause') eventName = 'video_progress';
      if (e.type === 'ended') eventName = 'video_complete';

      if (eventName) {
        sendEvent(eventName, { 
          video_title: video.title || 'unnamed_video', 
          video_url: video.currentSrc 
        });
      }
    };

    document.addEventListener('play', handleVideoEvent, true);
    document.addEventListener('pause', handleVideoEvent, true);
    document.addEventListener('ended', handleVideoEvent, true);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFormFocus);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('play', handleVideoEvent, true);
      document.removeEventListener('pause', handleVideoEvent, true);
      document.removeEventListener('ended', handleVideoEvent, true);
    };
  }, []);

  return null;
}
