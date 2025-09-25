import { useAuth } from './hooks/useAuth';
import React, { useState, useEffect } from 'react';
import './RamblApp.css';

// Move all component definitions OUTSIDE of RamblApp
const FloatingShapes = () => (
  <>
    <div className="floating-shape"></div>
    <div className="floating-shape"></div>
    <div className="floating-shape"></div>
  </>
);

const Logo = ({ className = "logo" }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 80 L20 20 C20 20, 30 10, 55 20 C70 25, 75 35, 70 50 C65 60, 55 65, 40 60" 
              strokeDasharray="3,1" opacity="0.9"/>
        <path d="M23 18 L23 82 M40 60 L75 85" strokeWidth="3.5"/>
        <path d="M23 20 C23 20, 33 8, 58 18 C73 23, 80 33, 75 48 C70 58, 60 63, 45 58"
              strokeDasharray="2,3" opacity="0.7"/>
        <circle cx="35" cy="35" r="4" fill="#ffffff" opacity="0.8"/>
        <path d="M50 35 Q58 42, 50 50" strokeWidth="3" opacity="0.9"/>
      </g>
    </svg>
  </div>
);

const BottomNav = ({ currentScreen, showScreen }) => {
  const navItems = [
    { id: 'homeScreen', icon: '🏠', label: 'Home' },
    { id: 'analyticsScreen', icon: '📊', label: 'Analytics' },
    { id: 'libraryScreen', icon: '📚', label: 'Library' },
    { id: 'settingsScreen', icon: '⚙️', label: 'Settings' }
  ];

  const getActiveIndex = () => {
    const navMap = {
      'homeScreen': 0,
      'analyticsScreen': 1,
      'timelineScreen': 1,
      'libraryScreen': 2,
      'settingsScreen': 3,
      'promptScreen': 0
    };
    return navMap[currentScreen] ?? 0;
  };

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div 
          key={item.id}
          className={`nav-item ${getActiveIndex() === index ? 'active' : ''}`}
          onClick={() => showScreen(item.id)}
        >
          <div className="nav-icon">{item.icon}</div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const LoginScreen = ({ loginForm, setLoginForm, doLogin, showScreen, error, loading }) => (
  <div className="screen auth-screen active">
    <FloatingShapes />
    
    <div style={{ padding: '80px 30px 40px', textAlign: 'center' }}>
      <Logo />
      <h1 className="welcome-title">Welcome to Rambl</h1>
      <p className="welcome-subtitle">Your voice journaling journey starts here</p>
    </div>

    <div className="form-section">
      <h2 className="form-title">Sign In</h2>
      <p className="form-subtitle">Enter your details to continue</p>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#dc2626', 
          padding: '10px', 
          borderRadius: '8px', 
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={doLogin}>
        <div className="form-group">
          <input 
            type="email" 
            className="form-input" 
            placeholder="Email address" 
            name="email" 
            value={loginForm.email}
            onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-input" 
            placeholder="Password" 
            name="password" 
            value={loginForm.password}
            onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="primary-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-switch">
        Don't have an account? 
        <button onClick={() => showScreen('signupScreen')}>Sign Up</button>
      </div>
    </div>
  </div>
);

const SignupScreen = ({ signupForm, setSignupForm, doSignup, showScreen, error, loading }) => (
  <div className="screen auth-screen active">
    <FloatingShapes />
    
    <div style={{ padding: '80px 30px 40px', textAlign: 'center' }}>
      <Logo />
      <h1 className="welcome-title">Start Your Journey</h1>
      <p className="welcome-subtitle">Create your account and begin voice journaling</p>
    </div>

    <div className="form-section">
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">Join thousands discovering insights through voice</p>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#dc2626', 
          padding: '10px', 
          borderRadius: '8px', 
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={doSignup}>
        <div className="form-group">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Full name" 
            name="name" 
            value={signupForm.name}
            onChange={(e) => setSignupForm(prev => ({...prev, name: e.target.value}))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            className="form-input" 
            placeholder="Email address" 
            name="email"
            value={signupForm.email}
            onChange={(e) => setSignupForm(prev => ({...prev, email: e.target.value}))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-input" 
            placeholder="Password" 
            name="password" 
            value={signupForm.password}
            onChange={(e) => setSignupForm(prev => ({...prev, password: e.target.value}))}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="primary-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-switch">
        Already have an account? 
        <button onClick={() => showScreen('loginScreen')}>Sign In</button>
      </div>
    </div>
  </div>
);

const OnboardingScreen = ({ 
  currentOnboardingStep, 
  userData, 
  nextOnboardingStep, 
  selectOnboardingOption, 
  toggleOnboardingMultiOption, 
  finishOnboarding 
}) => {
  const steps = [
    {
      id: 'step0',
      content: (
        <div className="question-step active">
          <div className="intro-section">
            <div className="intro-icon">🎤</div>
            <h2 className="intro-title">Your Voice, Your Thoughts, Your Journey</h2>
            <p className="intro-description">
              Rambl is your personal voice journaling companion. Spend just 10 minutes speaking your thoughts to organize the chaos of your mind and discover insights about yourself.
            </p>
            <div className="intro-highlight">
              ⏱️ 10-minute sessions • 🧠 AI insights • 📈 Track your growth
            </div>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🗣️</div>
              <div className="benefit-text">
                <strong>Voice-first design:</strong> More natural than typing, captures emotion and tone
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <div className="benefit-text">
                <strong>Guided prompts:</strong> Never stare at a blank page again with thoughtful questions
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📊</div>
              <div className="benefit-text">
                <strong>Smart insights:</strong> Discover patterns in your thoughts and track your emotional journey
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <div className="benefit-text">
                <strong>Privacy-focused:</strong> Your thoughts stay yours with local processing and encryption
              </div>
            </div>
          </div>

          <button className="continue-button enabled" onClick={nextOnboardingStep}>
            Let's Get Started
          </button>
        </div>
      )
    },
    {
      id: 'step1',
      content: (
        <div className="question-step active">
          <h2 className="onboarding-section-title">What's your age range?</h2>
          <p className="onboarding-form-subtitle">This helps us tailor prompts and recommendations to your life stage</p>

          <div className="option-grid">
            {[
              { value: "18-25", icon: "🌱", title: "18-25", description: "Early career & discovery" },
              { value: "26-35", icon: "🚀", title: "26-35", description: "Building & growing" },
              { value: "36-45", icon: "🎯", title: "36-45", description: "Achieving & leading" },
              { value: "46-55", icon: "🌿", title: "46-55", description: "Reflecting & mentoring" },
              { value: "56-65", icon: "🏔️", title: "56-65", description: "Wisdom & transition" },
              { value: "65+", icon: "🌟", title: "65+", description: "Legacy & fulfillment" }
            ].map((option) => (
              <div 
                key={option.value}
                className={`option-card ${userData.age === option.value ? 'selected' : ''}`}
                onClick={() => selectOnboardingOption(option.value, 'age')}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-title">{option.title}</div>
                <div className="option-description">{option.description}</div>
              </div>
            ))}
          </div>

          <div className="progress-indicators">
            <div className="progress-dot"></div>
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>

          <button 
            className={`continue-button ${userData.age ? 'enabled' : ''}`} 
            onClick={nextOnboardingStep}
          >
            Continue
          </button>
          <button className="skip-button" onClick={nextOnboardingStep}>Skip this question</button>
        </div>
      )
    },
    {
      id: 'step2',
      content: (
        <div className="question-step active">
          <h2 className="onboarding-section-title">How often do you plan to journal?</h2>
          <p className="onboarding-form-subtitle">We'll customize reminders and content based on your goals</p>

          <div className="option-grid single-column">
            {[
              { value: "daily", icon: "☀️", title: "Daily (Most effective)", description: "Build a consistent habit for maximum insight and growth" },
              { value: "few-times-week", icon: "📅", title: "A few times a week", description: "Regular check-ins to stay connected with your thoughts" },
              { value: "weekly", icon: "🗓️", title: "Weekly", description: "Weekly reflection to process the week's experiences" },
              { value: "monthly", icon: "📊", title: "Monthly", description: "Monthly deep dives to track longer-term patterns" },
              { value: "as-needed", icon: "🎯", title: "As needed", description: "Flexible journaling when you feel like processing thoughts" }
            ].map((option) => (
              <div 
                key={option.value}
                className={`option-card ${userData.frequency === option.value ? 'selected' : ''}`}
                onClick={() => selectOnboardingOption(option.value, 'frequency')}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-title">{option.title}</div>
                <div className="option-description">{option.description}</div>
              </div>
            ))}
          </div>

          <div className="progress-indicators">
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
          </div>

          <button 
            className={`continue-button ${userData.frequency ? 'enabled' : ''}`} 
            onClick={nextOnboardingStep}
          >
            Continue
          </button>
          <button className="skip-button" onClick={nextOnboardingStep}>Skip this question</button>
        </div>
      )
    },
    {
      id: 'step3',
      content: (
        <div className="question-step active">
          <h2 className="onboarding-section-title">What brings you to Rambl?</h2>
          <p className="onboarding-form-subtitle">Select all that resonate with you - we'll prioritize relevant prompts</p>

          <div className="option-grid single-column">
            {[
              { value: "self-awareness", icon: "🪞", title: "Better self-awareness", description: "Understand your thoughts, feelings, and patterns better" },
              { value: "stress-management", icon: "🧘‍♀️", title: "Stress management", description: "Process difficult emotions and find mental clarity" },
              { value: "goal-clarity", icon: "🎯", title: "Goal clarity", description: "Get clear on what you want and track your progress" },
              { value: "personal-growth", icon: "🌱", title: "Personal growth", description: "Develop insights and wisdom from your experiences" },
              { value: "daily-reflection", icon: "💭", title: "Daily reflection", description: "Regular check-ins to stay mindful and intentional" },
              { value: "mental-health", icon: "❤️", title: "Mental health support", description: "Complement therapy or self-care with regular journaling" }
            ].map((option) => (
              <div 
                key={option.value}
                className={`option-card ${userData.goals.includes(option.value) ? 'selected' : ''}`}
                onClick={() => toggleOnboardingMultiOption(option.value, 'goals')}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-title">{option.title}</div>
                <div className="option-description">{option.description}</div>
              </div>
            ))}
          </div>

          <div className="progress-indicators">
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot active"></div>
          </div>

          <button 
            className={`continue-button ${userData.goals.length > 0 ? 'enabled' : ''}`} 
            onClick={finishOnboarding}
          >
            Start Journaling
          </button>
          <button className="skip-button" onClick={finishOnboarding}>Skip and start journaling</button>
        </div>
      )
    }
  ];

  if (currentOnboardingStep >= steps.length) {
    return (
      <div className="onboarding-container" style={{ display: 'flex' }}>
        <FloatingShapes />
        <div className="onboarding-header">
          <Logo className="onboarding-logo" />
          <h1 className="onboarding-title">🎉 You're all set!</h1>
          <p className="onboarding-subtitle">Welcome to Rambl. Let's start your first journal entry.</p>
        </div>
        <div className="content-section">
          <button className="continue-button enabled" onClick={finishOnboarding}>
            Start Journaling
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container" style={{ display: 'flex' }}>
      <FloatingShapes />

      <div className="onboarding-header">
        <Logo className="onboarding-logo" />
        <h1 className="onboarding-title">Welcome to Rambl!</h1>
        <p className="onboarding-subtitle">Let's personalize your voice journaling journey</p>
      </div>

      <div className="content-section">
        {steps[currentOnboardingStep]?.content}
      </div>
    </div>
  );
};

const HomeScreen = ({ selectedCategory, categoryInfo, selectCategory, showScreen, showNotification }) => (
  <div className="screen active">
    <div className="header">
      <div className="header-content home-header">
        <Logo style={{ width: '80px', height: '80px' }} />
        <h1 className="app-title">Rambl</h1>
        <p className="app-subtitle">Your voice, your thoughts, your journey</p>
      </div>
    </div>

    <div className="main-content">
      <div className="section">
        <h2 className="section-title">Choose Your Prompt</h2>
        <div className="prompt-categories">
          {Object.entries(categoryInfo).map(([key, category]) => (
            <div 
              key={key}
              className={`category-card ${selectedCategory === key ? 'selected' : ''}`}
              onClick={() => selectCategory(key)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-title">{category.title}</div>
              <div className="category-levels">5-7 Levels</div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="voice-button" 
        onClick={() => {
          if (!selectedCategory) {
            showNotification('Please select a category first, then choose your prompt depth 📝');
            return;
          }
          showNotification('Please choose your question depth first 🎯');
          setTimeout(() => {
            showScreen('promptScreen');
          }, 1000);
        }}
      >
        🎤
      </button>

      <div style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3f0ff 100%)', borderRadius: '20px', padding: '25px', marginTop: '30px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#6b46c1' }}>Your Recent Insights</h3>
        <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '20px' }}>📈</span>
          <span style={{ flex: '1', fontSize: '14px', color: '#4c1d95' }}>Positivity trending upward</span>
          <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500' }}>+12%</span>
        </div>
        <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '20px' }}>🎯</span>
          <span style={{ flex: '1', fontSize: '14px', color: '#4c1d95' }}>Goal clarity improving</span>
          <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500' }}>+8%</span>
        </div>
        <div style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '20px' }}>💡</span>
          <span style={{ flex: '1', fontSize: '14px', color: '#4c1d95' }}>New reading suggestion ready</span>
          <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500' }}>New</span>
        </div>
      </div>
    </div>

    <BottomNav currentScreen="homeScreen" showScreen={showScreen} />
  </div>
);

const PromptScreen = ({ 
  currentPromptCategory, 
  categoryInfo, 
  selectedLevel, 
  prompts, 
  showScreen, 
  selectDifficulty, 
  selectRandomDifficulty, 
  showNotification, 
  shuffleMainPrompt, 
  startMainRecording, 
  resetMainSelection 
}) => {
  const getCurrentPrompt = () => {
    if (!selectedLevel) return '';
    const prompts_array = prompts[currentPromptCategory][selectedLevel];
    return prompts_array[0]; // For demo, show first prompt
  };

  return (
    <div className="screen active">
      <div className="header">
        <div className="header-content">
          <button className="back-button" onClick={() => showScreen('homeScreen')}>
            <span>←</span>
            <span>Back to Categories</span>
          </button>
          
          <div className="selected-category">
            <div className="category-icon">{categoryInfo[currentPromptCategory].icon}</div>
            <div className="category-info">
              <h3>{categoryInfo[currentPromptCategory].title}</h3>
              <p>{categoryInfo[currentPromptCategory].description}</p>
            </div>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Choose Your Depth</h1>
          <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>How deep do you want to go today?</p>
        </div>
      </div>

      <div className="main-content">
        <div className="section">
          <div className={`difficulty-grid ${selectedLevel ? 'compact' : ''}`}>
            {[
              { level: 'surface', icon: '🌱', title: 'Surface Level', description: 'Quick check-ins and simple reflections', example: '"What\'s one thing that went well today?"' },
              { level: 'medium', icon: '🌿', title: 'Medium Depth', description: 'Thoughtful exploration of your experiences', example: '"What patterns do you notice in your goal-setting?"' },
              { level: 'deep', icon: '🌳', title: 'Deep Dive', description: 'Profound self-discovery and insight', example: '"How do your current goals align with your core values?"' }
            ].map((difficulty) => (
              <div 
                key={difficulty.level}
                className={`difficulty-card ${selectedLevel === difficulty.level ? 'selected' : ''} ${selectedLevel && selectedLevel !== difficulty.level ? 'hidden' : ''} ${selectedLevel ? 'compact' : ''}`}
                onClick={() => selectDifficulty(difficulty.level)}
              >
                <div className="difficulty-header">
                  <div className="difficulty-icon">{difficulty.icon}</div>
                  <div className="difficulty-info">
                    <h3 className="difficulty-title">{difficulty.title}</h3>
                    <p className="difficulty-description">{difficulty.description}</p>
                  </div>
                </div>
                <div className="difficulty-examples">{difficulty.example}</div>
              </div>
            ))}
          </div>

          <button 
            className={`random-option ${selectedLevel ? 'hidden' : ''}`}
            onClick={selectRandomDifficulty}
          >
            <div className="random-header">
              <div className="random-icon">🎲</div>
              <div className="random-title">Surprise Me</div>
            </div>
            <p className="random-description">Let Rambl choose a question at any depth for you</p>
          </button>
        </div>

        {selectedLevel && (
          <div className="prompt-display visible">
            <div className="prompt-level">
              <span className={`level-badge ${selectedLevel}`}>
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
              </span>
              <span>{categoryInfo[currentPromptCategory].title} Question</span>
            </div>
            <div className="prompt-text">{getCurrentPrompt()}</div>
            <div className="prompt-actions">
              <button className="action-button" onClick={shuffleMainPrompt}>
                <span>🔄</span>
                <span>New Question</span>
              </button>
              <button className="action-button primary" onClick={startMainRecording}>
                <span>🎤</span>
                <span>Start Recording</span>
              </button>
            </div>
          </div>
        )}

        {selectedLevel && (
          <div className="change-selection">
            <button className="change-button" onClick={resetMainSelection}>
              ← Change difficulty level
            </button>
          </div>
        )}
      </div>

      <BottomNav currentScreen="promptScreen" showScreen={showScreen} />
    </div>
  );
};

const AnalyticsScreen = ({ showScreen }) => (
  <div className="screen active">
    <div className="header">
      <div className="header-content">
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Your Journey</h1>
        <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>Insights from your voice</p>
        <div className="time-selector">
          <div className="time-option">7D</div>
          <div className="time-option active">30D</div>
          <div className="time-option">90D</div>
          <div className="time-option">All</div>
        </div>
      </div>
    </div>

    <div className="main-content">
      <div className="metric-grid">
        <div className="metric-card" onClick={() => showScreen('timelineScreen')}>
          <div className="metric-value">23</div>
          <div className="metric-label">Sessions</div>
          <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>+18%</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">4.2</div>
          <div className="metric-label">Avg Mood</div>
          <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>+0.8</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">156</div>
          <div className="metric-label">Min Spoken</div>
          <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>+12%</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">78%</div>
          <div className="metric-label">Positivity</div>
          <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>+15%</div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', fontSize: '22px' }}>📈</span>
          Emotional Journey
        </h2>
        <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
          <div style={{ height: '120px', background: 'linear-gradient(to right, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.15) 25%, rgba(139, 92, 246, 0.2) 50%, rgba(168, 85, 247, 0.15) 75%, rgba(139, 92, 246, 0.1) 100%)', borderRadius: '8px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30%', left: '0', right: '0', height: '3px', background: 'linear-gradient(to right, #8b5cf6, #a855f7, #8b5cf6, #a855f7)', borderRadius: '2px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', color: '#8b5cf6' }}>
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', fontSize: '22px' }}>🧠</span>
          AI Insights
        </h2>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px', marginRight: '12px' }}>🌅</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b46c1' }}>Morning Clarity</span>
          </div>
          <div style={{ fontSize: '14px', color: '#4c1d95', lineHeight: '1.5', marginBottom: '10px' }}>
            Your morning sessions show 40% higher positivity and clearer goal articulation.
          </div>
          <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500', background: 'rgba(139, 92, 246, 0.08)', padding: '6px 12px', borderRadius: '20px', display: 'inline-block' }}>Set morning reminder</div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px', marginRight: '12px' }}>📚</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b46c1' }}>Growth Themes</span>
          </div>
          <div style={{ fontSize: '14px', color: '#4c1d95', lineHeight: '1.5', marginBottom: '10px' }}>
            You've mentioned "learning" and "improvement" 15 times this month.
          </div>
          <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500', background: 'rgba(139, 92, 246, 0.08)', padding: '6px 12px', borderRadius: '20px', display: 'inline-block' }}>Explore growth resources</div>
        </div>
      </div>
    </div>

    <BottomNav currentScreen="analyticsScreen" showScreen={showScreen} />
  </div>
);

const LibraryScreen = ({ showScreen }) => (
  <div className="screen active">
    <div className="header">
      <div className="header-content">
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Library</h1>
        <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>Meditations to support your journey</p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" className="search-input" placeholder="Search meditations..." />
        </div>
      </div>
    </div>

    <div className="main-content">
      <div className="featured-meditation">
        <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Featured Today</div>
        <h3 className="featured-title">Morning Intention Setting</h3>
        <p className="featured-description">Start your day with clarity and purpose. Perfect before journaling your goals.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '13px', opacity: '0.8' }}>
          <span>⏱️ 5 minutes</span>
          <span>🌱 Beginner</span>
          <span>🎯 Goals</span>
        </div>
        <button className="featured-play">
          <span style={{ marginRight: '8px' }}>▶️</span>
          <span>Start Meditation</span>
        </button>
      </div>

      <div style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🧘‍♀️</span>
          Categories
        </h2>
        <div className="prompt-categories">
          <div className="category-card selected">
            <div className="category-icon">🎯</div>
            <div className="category-title">Goals</div>
            <div style={{ fontSize: '11px', opacity: '0.8' }}>8 meditations</div>
          </div>
          <div className="category-card">
            <div className="category-icon">❤️</div>
            <div className="category-title">Emotions</div>
            <div style={{ fontSize: '11px', opacity: '0.8' }}>12 meditations</div>
          </div>
          <div className="category-card">
            <div className="category-icon">💭</div>
            <div className="category-title">Reflection</div>
            <div style={{ fontSize: '11px', opacity: '0.8' }}>10 meditations</div>
          </div>
          <div className="category-card">
            <div className="category-icon">🌱</div>
            <div className="category-title">Growth</div>
            <div style={{ fontSize: '11px', opacity: '0.8' }}>15 meditations</div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🎯</span>
          Goals Meditations
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { title: 'Clarity & Focus', duration: '3 min', level: 'Beginner', description: 'Center yourself before setting intentions. Perfect for morning journaling sessions.' },
            { title: 'Future Self Visualization', duration: '10 min', level: 'Intermediate', description: 'Connect with your future self and gain insights into your path forward.' },
            { title: 'Motivation Boost', duration: '5 min', level: 'Beginner', description: 'Reconnect with your why and reignite passion for your goals.' }
          ].map((meditation, index) => (
            <div key={index} className="meditation-item">
              <div className="meditation-header">
                <button className="meditation-play">▶️</button>
                <div style={{ flex: '1' }}>
                  <h3 className="meditation-title">{meditation.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#8b5cf6' }}>
                    <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>⏱️ {meditation.duration}</span>
                    <span style={{ background: meditation.level === 'Beginner' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)', color: meditation.level === 'Beginner' ? '#059669' : '#d97706', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>{meditation.level}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#6b46c1', lineHeight: '1.4', marginTop: '8px' }}>{meditation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <BottomNav currentScreen="libraryScreen" showScreen={showScreen} />
  </div>
);

const SettingsScreen = ({ settingsUserData, toggleNotification, confirmLogout, showNotification, showScreen }) => (
  <div className="screen active">
    <div className="header">
      <div className="header-content">
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Settings</h1>
        <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>Manage your account and preferences</p>
      </div>
    </div>

    <div className="main-content">
      {/* Profile Section */}
      <div style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3f0ff 100%)', borderRadius: '20px', padding: '25px', marginBottom: '30px', border: '1px solid rgba(139, 92, 246, 0.1)', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'white', fontWeight: '700', border: '4px solid white', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)' }}>
            JD
          </div>
          <div style={{ position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', background: '#8b5cf6', border: '3px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            📸
          </div>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#2d1b69', marginBottom: '5px' }}>{settingsUserData.name}</h2>
        <p style={{ fontSize: '14px', color: '#8b5cf6', marginBottom: '15px' }}>{settingsUserData.email}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#6b46c1' }}>23</div>
            <div style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '2px' }}>Sessions</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#6b46c1' }}>156</div>
            <div style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '2px' }}>Minutes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#6b46c1' }}>15</div>
            <div style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '2px' }}>Days Active</div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>👤</span>
          Account
        </h3>
        
        {[
          { icon: '✏️', title: 'Edit Profile', subtitle: 'Update your name and email' },
          { icon: '🔐', title: 'Change Password', subtitle: 'Update your account password' }
        ].map((item, index) => (
          <div key={index} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', marginBottom: '12px', boxShadow: '0 2px 15px rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e2ff 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#8b5cf6' }}>{item.icon}</div>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b69', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#8b5cf6', opacity: '0.8' }}>{item.subtitle}</div>
              </div>
            </div>
            <div style={{ color: '#8b5cf6', fontSize: '16px' }}>→</div>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🔔</span>
          Notifications
        </h3>
        
        {[
          { key: 'daily', icon: '📅', title: 'Daily Reminders', subtitle: 'Get reminded to journal each day' },
          { key: 'insights', icon: '🧠', title: 'Weekly Insights', subtitle: 'Receive AI-generated insights' },
          { key: 'milestone', icon: '🎉', title: 'Milestones', subtitle: 'Celebrate your journaling achievements' }
        ].map((item) => (
          <div key={item.key} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', marginBottom: '12px', boxShadow: '0 2px 15px rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => toggleNotification(item.key)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e2ff 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#8b5cf6' }}>{item.icon}</div>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b69', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#8b5cf6', opacity: '0.8' }}>{item.subtitle}</div>
              </div>
            </div>
            <div style={{ position: 'relative', width: '50px', height: '28px', background: settingsUserData.notifications[item.key] ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ position: 'absolute', top: '2px', left: '2px', width: '24px', height: '24px', background: 'white', borderRadius: '50%', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', transform: settingsUserData.notifications[item.key] ? 'translateX(22px)' : 'translateX(0)' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Support */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>💬</span>
          Support
        </h3>
        
        {[
          { icon: '❓', title: 'Help Center', subtitle: 'FAQs and guides', onClick: () => showNotification('Opening help center... ❓') },
          { icon: 'ℹ️', title: 'About Rambl', subtitle: 'Version 1.0.0', onClick: () => showNotification('Rambl v1.0.0 - Built with ❤️') }
        ].map((item, index) => (
          <div key={index} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', marginBottom: '12px', boxShadow: '0 2px 15px rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={item.onClick}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e2ff 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#8b5cf6' }}>{item.icon}</div>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b69', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#8b5cf6', opacity: '0.8' }}>{item.subtitle}</div>
              </div>
            </div>
            <div style={{ color: '#8b5cf6', fontSize: '16px' }}>→</div>
          </div>
        ))}
      </div>

      {/* Account Actions */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#6b46c1', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>⚠️</span>
          Account Actions
        </h3>
        
        <div style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', borderRadius: '16px', padding: '18px 20px', marginBottom: '12px', boxShadow: '0 2px 15px rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={confirmLogout}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#dc2626' }}>🚪</div>
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626', marginBottom: '2px' }}>Log Out</div>
              <div style={{ fontSize: '13px', color: '#dc2626', opacity: '0.8' }}>Return to login screen</div>
            </div>
          </div>
          <div style={{ color: '#dc2626', fontSize: '16px' }}>→</div>
        </div>
      </div>
    </div>

    <BottomNav currentScreen="settingsScreen" showScreen={showScreen} />
  </div>
);

const TimelineScreen = ({ showScreen }) => (
  <div className="screen active">
    <div className="header">
      <div className="header-content">
        <button className="back-button" onClick={() => showScreen('analyticsScreen')}>
          <span>←</span>
          <span>Back to Analytics</span>
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Your Journal Sessions</h1>
        <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>Listen to your voice journey</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px', fontSize: '14px', opacity: '0.9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📊</span>
            <span>23 total sessions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⏱️</span>
            <span>156 min total</span>
          </div>
        </div>
      </div>
    </div>

    <div className="main-content">
      <div className="timeline">
        <div className="timeline-group">
          <div className="date-header">Today, June 5</div>
          
          <div className="journal-entry">
            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '500' }}>7:42 / 10:00</div>
            <div className="entry-header">
              <div className="entry-meta">
                <span className="entry-time">8:30 AM</span>
                <span className="entry-category">🎯 Goals</span>
              </div>
              <h3 className="entry-title">Morning Goal Setting</h3>
              <p style={{ fontSize: '14px', color: '#6b46c1', fontStyle: 'italic', opacity: '0.8' }}>"What are three things you want to accomplish today?"</p>
            </div>
            <div className="audio-player">
              <div className="player-controls">
                <button className="play-button">▶️</button>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '14px', color: '#6b46c1', fontWeight: '500' }}>7:42 minutes</div>
                  <div style={{ fontSize: '12px', color: '#8b5cf6', opacity: '0.8' }}>Good quality • Clear speech</div>
                </div>
              </div>
              <div style={{ height: '40px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', position: 'relative', marginTop: '10px' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a855f7)', width: '0%', borderRadius: '8px' }}></div>
              </div>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderRadius: '12px', padding: '15px', margin: '20px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b46c1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🧠</span>
                <span>AI Insights</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500' }}>Productivity Focus</span>
                <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500' }}>Goal Setting</span>
              </div>
              <div style={{ fontSize: '13px', color: '#4c1d95' }}>Mood: Focused and Determined (4.2/5)</div>
            </div>
          </div>
        </div>

        <div className="timeline-group">
          <div className="date-header">Yesterday, June 4</div>
          
          <div className="journal-entry">
            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(251, 191, 36, 0.1)', color: '#d97706', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '500' }}>9:15 / 10:00</div>
            <div className="entry-header">
              <div className="entry-meta">
                <span className="entry-time">9:45 PM</span>
                <span className="entry-category">💭 Reflection</span>
              </div>
              <h3 className="entry-title">Evening Reflection</h3>
              <p style={{ fontSize: '14px', color: '#6b46c1', fontStyle: 'italic', opacity: '0.8' }}>"What went well today and what could be improved?"</p>
            </div>
            <div className="audio-player">
              <div className="player-controls">
                <button className="play-button">▶️</button>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '14px', color: '#6b46c1', fontWeight: '500' }}>9:15 minutes</div>
                  <div style={{ fontSize: '12px', color: '#8b5cf6', opacity: '0.8' }}>Good quality • Some background noise</div>
                </div>
              </div>
              <div style={{ height: '40px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', position: 'relative', marginTop: '10px' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a855f7)', width: '0%', borderRadius: '8px' }}></div>
              </div>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderRadius: '12px', padding: '15px', margin: '20px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b46c1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🧠</span>
                <span>AI Insights</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500' }}>Self-Awareness</span>
                <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500' }}>Gratitude</span>
              </div>
              <div style={{ fontSize: '13px', color: '#4c1d95' }}>Mood: Contemplative and Peaceful (3.8/5)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav currentScreen="timelineScreen" showScreen={showScreen} />
  </div>
);

// Main RamblApp component
const RamblApp = () => {
  const { user, loading, error, signup, login, logout } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', name: '' });

  // Main app state
  const [currentScreen, setCurrentScreen] = useState('loginScreen');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentPromptCategory, setCurrentPromptCategory] = useState('goals');
  
  // Onboarding state
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [userData, setUserData] = useState({
    age: null,
    frequency: null,
    goals: []
  });
  
  // Settings state
  const [settingsUserData, setSettingsUserData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    notifications: {
      daily: true,
      insights: true,
      milestone: false
    }
  });

  // Prompt database
  const prompts = {
    goals: {
      surface: [
        "What's one goal you're excited about today?",
        "Name a small win you had this week.",
        "What's one task you want to complete today?",
        "How are you feeling about your progress lately?",
        "What's motivating you right now?"
      ],
      medium: [
        "What's one goal you've been putting off, and what's the first small step you could take today?",
        "How do you typically celebrate when you reach a milestone?",
        "What patterns do you notice in your goal-setting process?",
        "Which goal would make the biggest difference in your life right now?",
        "What's one limiting belief that's holding you back from your goals?"
      ],
      deep: [
        "How do your current goals align with your core values and who you want to become?",
        "What would you pursue if you knew you couldn't fail, and what does that reveal about your true desires?",
        "How has your definition of success evolved over the years?",
        "What legacy do you want to leave, and how do your current goals contribute to that?",
        "If you could only achieve three things in your lifetime, what would they be and why?"
      ]
    },
    reflection: {
      surface: [
        "What's one thing that went well today?",
        "What are you grateful for right now?",
        "What's one lesson you learned recently?",
        "How did you grow today?",
        "What's one positive change you've noticed in yourself?"
      ],
      medium: [
        "What's a recent experience that challenged your perspective?",
        "How have you changed in the last month?",
        "What's a pattern in your life you're becoming more aware of?",
        "What would you tell your past self from a year ago?",
        "What's something you used to believe that you no longer hold true?"
      ],
      deep: [
        "What themes keep appearing in your life, and what might they be trying to teach you?",
        "How do the different aspects of your identity influence each other?",
        "What would your wisest self advise you about your current situation?",
        "What parts of yourself are you still discovering?",
        "How has adversity shaped who you are today?"
      ]
    },
    growth: {
      surface: [
        "What's one skill you'd like to improve?",
        "What did you learn today?",
        "How did you step outside your comfort zone recently?",
        "What's one area where you see yourself improving?",
        "What's inspiring your growth right now?"
      ],
      medium: [
        "What's a challenge that's actually helping you grow?",
        "How do you know when you're ready for the next level?",
        "What growth mindset shift has made the biggest difference for you?",
        "Where do you feel stuck, and what might help you move forward?",
        "What's something you're learning to accept about yourself?"
      ],
      deep: [
        "How do you define personal growth, and how has this definition evolved?",
        "What would growth look like if you weren't comparing yourself to others?",
        "How do your struggles contribute to your becoming?",
        "What aspects of yourself are you still integrating or accepting?",
        "If growth meant letting go rather than acquiring, what would you release?"
      ]
    },
    future: {
      surface: [
        "What are you looking forward to this week?",
        "What's one thing you want to try soon?",
        "How do you picture your ideal day?",
        "What's exciting you about the future?",
        "What's one hope you have for tomorrow?"
      ],
      medium: [
        "Where do you see yourself in five years, and what steps are you taking to get there?",
        "What kind of person do you want to become?",
        "What legacy do you want to leave behind?",
        "How do you balance planning with staying present?",
        "What's one dream you're afraid to pursue?"
      ],
      deep: [
        "If you could design your life with no limitations, what would it look like?",
        "How do you want to be remembered by those closest to you?",
        "What would you regret not exploring or experiencing?",
        "How do your past experiences inform your vision for the future?",
        "What calling or purpose feels most authentic to you?"
      ]
    }
  };

  // Category information
  const categoryInfo = {
    goals: { icon: '🎯', title: 'Goals', description: 'Focus on your aspirations and achievements' },
    reflection: { icon: '💭', title: 'Reflection', description: 'Look back and find meaning in your experiences' },
    growth: { icon: '🌱', title: 'Growth', description: 'Discover how you\'re evolving and learning' },
    future: { icon: '🔮', title: 'Future', description: 'Envision and plan for what\'s ahead' }
  };

  // Add this useEffect after your useState declarations
  useEffect(() => {
    if (user && currentScreen === 'loginScreen') {
      setCurrentScreen('homeScreen');
    }
  }, [user, currentScreen]);

  // Navigation functions
  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  // Auth functions
  const doLogin = async (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      showNotification('Please fill in all fields');
      return;
    }
  
    try {
      await login(loginForm.email, loginForm.password);
      showNotification('Welcome back to Rambl! 🎉');
      setTimeout(() => {
        setCurrentScreen('homeScreen');
      }, 1500);
    } catch (error) {
      showNotification(`Login failed: ${error.message}`);
    }
  };

  const doSignup = async (e) => {
    e.preventDefault();
    
    if (!signupForm.email || !signupForm.password || !signupForm.name) {
      showNotification('Please fill in all fields');
      return;
    }
  
    try {
      await signup(signupForm.email, signupForm.password, signupForm.name);
      showNotification('Account created! Let\'s set up your profile 🎉');
      setTimeout(() => {
        setCurrentScreen('onboarding');
        setCurrentOnboardingStep(0);
      }, 2000);
    } catch (error) {
      showNotification(`Signup failed: ${error.message}`);
    }
  };

  const quickLogin = () => {
    showNotification('Welcome to Rambl Demo! 🎉');
    setCurrentScreen('homeScreen');
  };

  // Onboarding functions
  const nextOnboardingStep = () => {
    setCurrentOnboardingStep(prev => prev + 1);
  };

  const selectOnboardingOption = (value, category) => {
    setUserData(prev => ({ ...prev, [category]: value }));
    setTimeout(() => {
      nextOnboardingStep();
    }, 800);
  };

  const toggleOnboardingMultiOption = (value, category) => {
    setUserData(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const finishOnboarding = () => {
    showNotification('Welcome to Rambl! Let\'s start your first journal entry 🎉');
    setTimeout(() => {
      setCurrentScreen('homeScreen');
    }, 1500);
  };

  // Category selection
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPromptCategory(category);
    showNotification(`Selected: ${categoryInfo[category].title} 📝`);
    setTimeout(() => {
      initializePromptScreen(category);
      setCurrentScreen('promptScreen');
    }, 500);
  };

  // Initialize prompt screen with selected category
  const initializePromptScreen = (category) => {
    setCurrentPromptCategory(category);
    resetMainSelection();
  };

  // Prompt screen functions
  const selectDifficulty = (level) => {
    setSelectedLevel(level);
    setTimeout(() => {
      showMainPrompt(level);
    }, 250);
  };

  const selectRandomDifficulty = () => {
    const levels = ['surface', 'medium', 'deep'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setSelectedLevel(randomLevel);
    showNotification(`🎲 Random ${randomLevel} question selected!`);
    setTimeout(() => {
      showMainPrompt(randomLevel);
    }, 250);
  };

  const showMainPrompt = (level) => {
    const prompts_array = prompts[currentPromptCategory][level];
    const randomPrompt = prompts_array[Math.floor(Math.random() * prompts_array.length)];
    // Prompt will be displayed based on selectedLevel state
  };

  const shuffleMainPrompt = () => {
    if (selectedLevel) {
      showNotification('🔄 New question selected!');
      showMainPrompt(selectedLevel);
    }
  };

  const resetMainSelection = () => {
    setSelectedLevel(null);
  };

  const startMainRecording = () => {
    showNotification('🎤 Recording started! (10 minute limit)');
    setTimeout(() => {
      showNotification('📝 Recording saved! Check Analytics for insights');
      setTimeout(() => {
        setCurrentScreen('homeScreen');
      }, 1500);
    }, 3000);
  };

  // Settings functions
  const toggleNotification = (type) => {
    setSettingsUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
    
    const enabled = !settingsUserData.notifications[type];
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    showNotification(`${typeCapitalized} notifications ${enabled ? 'enabled' : 'disabled'} ${enabled ? '🔔' : '🔕'}`);
  };

  const confirmLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
        setCurrentScreen('loginScreen');
        showNotification('Logged out successfully 👋');
      } catch (error) {
        showNotification(`Logout failed: ${error.message}`);
      }
    }
  };

  // Notification system
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 3000);
  };

  // Skip button effect
  useEffect(() => {
    const skipButton = document.createElement('button');
    skipButton.textContent = '⚡ Skip to Demo';
    skipButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;
    skipButton.onmouseover = function() {
      this.style.background = 'rgba(255,255,255,0.3)';
    };
    skipButton.onmouseout = function() {
      this.style.background = 'rgba(255,255,255,0.2)';
    };
    skipButton.onclick = quickLogin;
    document.body.appendChild(skipButton);

    return () => {
      if (skipButton.parentNode) {
        skipButton.parentNode.removeChild(skipButton);
      }
    };
  }, []);

  // Render current screen with proper container management
  const renderCurrentScreen = () => {
    // Auth screens
    if (currentScreen === 'loginScreen' || currentScreen === 'signupScreen') {
      return (
        <div className="app-container" style={{ display: 'block' }}>
          {currentScreen === 'loginScreen' ? (
            <LoginScreen 
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              doLogin={doLogin}
              showScreen={showScreen}
              error={error}
              loading={loading}
            />
          ) : (
            <SignupScreen 
              signupForm={signupForm}
              setSignupForm={setSignupForm}
              doSignup={doSignup}
              showScreen={showScreen}
              error={error}
              loading={loading}
            />
          )}
        </div>
      );
    }
    
    // Onboarding screens
    if (currentScreen === 'onboarding') {
      return (
        <OnboardingScreen 
          currentOnboardingStep={currentOnboardingStep}
          userData={userData}
          nextOnboardingStep={nextOnboardingStep}
          selectOnboardingOption={selectOnboardingOption}
          toggleOnboardingMultiOption={toggleOnboardingMultiOption}
          finishOnboarding={finishOnboarding}
        />
      );
    }
    
    // Main app screens
    return (
      <div className="app-container" style={{ display: 'block' }}>
        {currentScreen === 'homeScreen' && (
          <HomeScreen 
            selectedCategory={selectedCategory}
            categoryInfo={categoryInfo}
            selectCategory={selectCategory}
            showScreen={showScreen}
            showNotification={showNotification}
          />
        )}
        {currentScreen === 'promptScreen' && (
          <PromptScreen 
            currentPromptCategory={currentPromptCategory}
            categoryInfo={categoryInfo}
            selectedLevel={selectedLevel}
            prompts={prompts}
            showScreen={showScreen}
            selectDifficulty={selectDifficulty}
            selectRandomDifficulty={selectRandomDifficulty}
            showNotification={showNotification}
            shuffleMainPrompt={shuffleMainPrompt}
            startMainRecording={startMainRecording}
            resetMainSelection={resetMainSelection}
          />
        )}
        {currentScreen === 'analyticsScreen' && <AnalyticsScreen showScreen={showScreen} />}
        {currentScreen === 'libraryScreen' && <LibraryScreen showScreen={showScreen} />}
        {currentScreen === 'settingsScreen' && (
          <SettingsScreen 
            settingsUserData={settingsUserData}
            toggleNotification={toggleNotification}
            confirmLogout={confirmLogout}
            showNotification={showNotification}
            showScreen={showScreen}
          />
        )}
        {currentScreen === 'timelineScreen' && <TimelineScreen showScreen={showScreen} />}
      </div>
    );
  };

  return (
    <div className="rambl-app">
      {renderCurrentScreen()}
    </div>
  );
};

export default RamblApp;