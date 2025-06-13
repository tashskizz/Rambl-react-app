import React, { useState, useEffect } from 'react';

const RamblApp = () => {
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

  // Notification system
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation functions
  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  // Auth functions
  const doLogin = () => {
    showNotification('Welcome back to Rambl! 🎉');
    setTimeout(() => {
      setCurrentScreen('homeScreen');
    }, 1500);
  };

  const doSignup = () => {
    showNotification('Account created! Let\'s set up your profile 🎉');
    setTimeout(() => {
      setCurrentScreen('onboarding');
      setCurrentOnboardingStep(0);
    }, 2000);
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
      setCurrentScreen('promptScreen');
    }, 500);
  };

  // Prompt screen functions
  const selectDifficulty = (level) => {
    setSelectedLevel(level);
    showNotification(`${level.charAt(0).toUpperCase() + level.slice(1)} level selected! 🎯`);
  };

  const selectRandomDifficulty = () => {
    const levels = ['surface', 'medium', 'deep'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setSelectedLevel(randomLevel);
    showNotification(`🎲 Random ${randomLevel} question selected!`);
  };

  const resetSelection = () => {
    setSelectedLevel(null);
  };

  const shufflePrompt = () => {
    showNotification('🔄 New question selected!');
  };

  const startRecording = () => {
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

  const confirmLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setCurrentScreen('loginScreen');
      showNotification('Logged out successfully 👋');
    }
  };

  // Components
  const FloatingShapes = () => (
    <>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
    </>
  );

  const Logo = ({ size = 100 }) => (
    <div className="logo" style={{ width: size, height: size }}>
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

  const BottomNav = () => {
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

  // Auth Screens
  const LoginScreen = () => (
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

        <div>
          <div className="form-group">
            <input type="email" className="form-input" placeholder="Email address" />
          </div>
          <div className="form-group">
            <input type="password" className="form-input" placeholder="Password" />
          </div>
          <button type="button" className="primary-button" onClick={doLogin}>
            Sign In
          </button>
        </div>

        <div className="auth-switch">
          Don't have an account? 
          <button onClick={() => showScreen('signupScreen')}>Sign Up</button>
        </div>
      </div>
    </div>
  );

  const SignupScreen = () => (
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

        <div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Full name" />
          </div>
          <div className="form-group">
            <input type="email" className="form-input" placeholder="Email address" />
          </div>
          <div className="form-group">
            <input type="password" className="form-input" placeholder="Password" />
          </div>
          <button type="button" className="primary-button" onClick={doSignup}>
            Create Account
          </button>
        </div>

        <div className="auth-switch">
          Already have an account? 
          <button onClick={() => showScreen('loginScreen')}>Sign In</button>
        </div>
      </div>
    </div>
  );

  // Render the rest of the components (continuing in next part due to length)
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'loginScreen':
        return <LoginScreen />;
      case 'signupScreen':
        return <SignupScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="rambl-app">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Auth Container */}
      {(currentScreen === 'loginScreen' || currentScreen === 'signupScreen') && (
        <div className="app-container">
          {renderCurrentScreen()}
        </div>
      )}
    </div>
  );
};

export default RamblApp;