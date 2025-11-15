import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className={`home-header ${isScrolled ? 'home-header-scrolled' : ''}`}>
        <div className="home-header-content">
          {/* Logo - Left Side */}
          <div className="home-logo">
            <div className="home-logo-icon">
              <i className="bi bi-check2-circle"></i>
            </div>
            <span className="home-logo-text">HabitHero</span>
          </div>

          {/* Navigation - Right Side */}
          <nav className="home-nav">
            <button 
              className="home-nav-link" 
              onClick={() => scrollToSection('home-about')}
            >
              About
            </button>
            <button 
              className="home-nav-link" 
              onClick={() => scrollToSection('home-features')}
            >
              Features
            </button>
            <button 
              className="home-nav-link" 
              onClick={() => scrollToSection('home-contact')}
            >
              Contact
            </button>
            <button 
              className="home-nav-btn home-nav-login" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="home-nav-btn home-nav-register" 
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home-hero" className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Build Better Habits
            <span className="home-hero-highlight"> Every Day</span>
          </h1>
          <p className="home-hero-subtitle">
            Transform your life one habit at a time. Track your progress, stay motivated, 
            and achieve your goals with our intuitive habit tracking platform.
          </p>
          <div className="home-hero-buttons">
            <button className="home-cta-btn primary" onClick={() => navigate('/register')}>
              <span>Start Your Journey</span>
              <i className="bi bi-arrow-right"></i>
            </button>
            <button className="home-cta-btn secondary" onClick={() => scrollToSection('home-features')}>
              <span>Learn More</span>
              <i className="bi bi-chevron-down"></i>
            </button>
          </div>
        </div>
        <div className="home-scroll-indicator" onClick={() => scrollToSection('home-about')}>
          <i className="bi bi-chevron-down"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="home-about" className="home-about">
        <div className="home-container-inner">
          <h2 className="home-section-title">Why HabitHero?</h2>
          <p className="home-section-desc">
            HabitHero is designed to help you build lasting habits through consistent tracking, 
            motivational insights, and personalized progress monitoring. Whether you're starting 
            a fitness routine, learning a new skill, or improving your daily productivity.
          </p>
          <div className="home-stats">
            <div className="home-stat-card">
              <div className="home-stat-number">21</div>
              <div className="home-stat-label">Days to Build a Habit</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-number">85%</div>
              <div className="home-stat-label">Success Rate</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-number">10K+</div>
              <div className="home-stat-label">Habits Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="home-features" className="home-features">
        <div className="home-container-inner">
          <h2 className="home-section-title">Powerful Features</h2>
          <p className="home-section-desc">
            Everything you need to build and maintain healthy habits
          </p>
          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <h3>Progress Tracking</h3>
              <p>Visualize your habit journey with detailed analytics and progress charts</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h3>Daily Reminders</h3>
              <p>Never forget your habits with smart notifications and daily check-ins</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-trophy"></i>
              </div>
              <h3>Achievement System</h3>
              <p>Earn badges and rewards for maintaining streaks and reaching milestones</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-lightbulb"></i>
              </div>
              <h3>Motivational Quotes</h3>
              <p>Get personalized inspirational quotes based on your progress and mood</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-bar-chart"></i>
              </div>
              <h3>Smart Analytics</h3>
              <p>Understand your patterns with detailed success rates and best performance days</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-phone"></i>
              </div>
              <h3>Mobile Friendly</h3>
              <p>Access your habits anywhere with our responsive design and mobile app</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="home-container-inner">
          <div className="home-cta-content">
            <h2>Ready to Transform Your Habits?</h2>
            <p>Join thousands of users who have successfully built lasting habits with HabitHero</p>
            <button className="home-cta-btn large" onClick={() => navigate('/register')}>
              <span>Create Your Account Now</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="home-contact" className="home-contact">
        <div className="home-container-inner">
          <h2 className="home-section-title">Get In Touch</h2>
          <p className="home-section-desc">
            Have questions or need support? We're here to help you on your habit-building journey.
          </p>
          <div className="home-contact-cards">
            <div className="home-contact-card">
              <div className="home-contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <h3>Email</h3>
              <p>habithero@gmail.com</p>
            </div>
            <div className="home-contact-card">
              <div className="home-contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h3>Location</h3>
              <p>Kochi, Kerala</p>
            </div>
            <div className="home-contact-card">
              <div className="home-contact-icon">
                <i className="bi bi-chat-dots-fill"></i>
              </div>
              <h3>Support</h3>
              <p>24/7 Customer Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-container-inner">
          <div className="home-footer-content">
            <div className="home-footer-logo">
              <i className="bi bi-check2-circle"></i>
              <span>HabitHero</span>
            </div>
            <p className="home-footer-text">
              &copy; 2024 HabitHero. Build better habits, build a better you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;