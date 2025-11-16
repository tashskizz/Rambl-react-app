import React, { useState, useEffect } from 'react';

const AnalyticsScreen = ({ userId, showScreen, showNotification, currentScreen, BottomNav }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/journal/analytics/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
        showNotification?.('Failed to load analytics data ❌');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId, showNotification]);

  // Loading state
  if (loading) {
    return (
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

        <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '4px solid rgba(139, 92, 246, 0.2)', 
              borderTop: '4px solid #8b5cf6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 15px'
            }}></div>
            <p style={{ color: '#6b46c1', fontSize: '16px' }}>Loading your analytics...</p>
          </div>
        </div>

        <BottomNav currentScreen={currentScreen} showScreen={showScreen} />

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state or no data - show original placeholder design
  if (error || !analyticsData) {
    // Fall back to showing the original hardcoded data so the design is never broken
    return (
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
              <div className="metric-value">0</div>
              <div className="metric-label">Sessions</div>
              <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' }}>Start journaling</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">--</div>
              <div className="metric-label">Avg Mood</div>
              <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' }}>No data</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Min Spoken</div>
              <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' }}>No data</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">--</div>
              <div className="metric-label">Positivity</div>
              <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' }}>No data</div>
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
                <span style={{ fontSize: '20px', marginRight: '12px' }}>🎤</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b46c1' }}>Start Journaling</span>
              </div>
              <div style={{ fontSize: '14px', color: '#4c1d95', lineHeight: '1.5', marginBottom: '10px' }}>
                Record your first journal entry to start seeing personalized insights about your thoughts and growth.
              </div>
            </div>
          </div>
        </div>

        <BottomNav currentScreen={currentScreen} showScreen={showScreen} />
      </div>
    );
  }

  // Calculate real percentage changes (show no data if nothing)
  const sessionChange = analyticsData.totalSessions > 0 ? `${analyticsData.totalSessions} total` : 'No data';
  const minutesChange = analyticsData.totalMinutes > 0 ? `${Math.round(analyticsData.totalMinutes)} min total` : 'No data';

  return (
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
        {/* EXACT ORIGINAL METRIC GRID - Just with real data */}
        <div className="metric-grid">
          <div className="metric-card" onClick={() => showScreen('timelineScreen')}>
            <div className="metric-value">{analyticsData.totalSessions}</div>
            <div className="metric-label">Sessions</div>
            <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>{sessionChange}</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
              {analyticsData.avgMood != null ? analyticsData.avgMood.toFixed(1) : '--'}
            </div>
            <div className="metric-label">Avg Mood</div>
            <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: analyticsData.avgMood ? '#059669' : '#6b7280', background: analyticsData.avgMood ? 'rgba(5, 150, 105, 0.1)' : 'rgba(107, 114, 128, 0.1)' }}>
            {analyticsData.avgMood ? 'Real data' : 'No data'}
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{Math.round(analyticsData.totalMinutes)}</div>
            <div className="metric-label">Min Spoken</div>
            <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: '#059669', background: 'rgba(5, 150, 105, 0.1)' }}>{minutesChange}</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
            {analyticsData.avgPositivity != null ? `${analyticsData.avgPositivity}%` : '--'}
            </div>
            <div className="metric-label">Positivity</div>
            <div style={{ fontSize: '11px', marginTop: '5px', padding: '2px 8px', borderRadius: '8px', fontWeight: '600', color: analyticsData.avgPositivity ? '#059669' : '#6b7280', background: analyticsData.avgPositivity ? 'rgba(5, 150, 105, 0.1)' : 'rgba(107, 114, 128, 0.1)' }}>
            {analyticsData.avgPositivity ? 'Real data' : 'No data'}
            </div>
        </div>
      </div>

        {/* EXACT ORIGINAL EMOTIONAL JOURNEY SECTION */}
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

        {/* EXACT ORIGINAL AI INSIGHTS SECTION */}
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

       <BottomNav currentScreen={currentScreen} showScreen={showScreen} />
    </div>
  );
};

export default AnalyticsScreen;
