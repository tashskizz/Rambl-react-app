import React, { useState, useEffect } from 'react';

const JournalSessions = ({ userId, showScreen, showNotification }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});

  // Fetch journal entries
  useEffect(() => {
    const fetchSessions = async () => {
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/journal/entries/${userId}?limit=50`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSessions(data.entries || []);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load journal sessions');
        showNotification?.('Failed to load sessions ❌');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId, showNotification]);

  // Format date for display
const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown date';
  
  let date;
  
  // Handle Firestore Timestamp object
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    date = timestamp.toDate();
  }
  // Handle Firestore Timestamp with seconds/nanoseconds
  else if (timestamp._seconds) {
    date = new Date(timestamp._seconds * 1000);
  }
  // Handle ISO string or number
  else {
    date = new Date(timestamp);
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Unknown date';
  }
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
};

 const formatTime = (timestamp) => {
  if (!timestamp) return '--:--';
  
  let date;
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    date = timestamp.toDate();
  } else if (timestamp._seconds) {
    date = new Date(timestamp._seconds * 1000);
  } else {
    date = new Date(timestamp);
  }
  
  if (isNaN(date.getTime())) {
    return '--:--';
  }
  
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

};

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio playback functions
  const handlePlayPause = (entryId, audioUrl) => {
    // Audio element management
    const audioElement = document.getElementById(`audio-${entryId}`);
    
    if (!audioElement) {
      console.error('Audio element not found');
      return;
    }

    if (playingAudio === entryId) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      // Pause any currently playing audio
      if (playingAudio) {
        const currentAudio = document.getElementById(`audio-${playingAudio}`);
        if (currentAudio) currentAudio.pause();
      }
      
      audioElement.play();
      setPlayingAudio(entryId);
    }
  };

  const handleTimeUpdate = (entryId, currentTime, duration) => {
    setAudioProgress(prev => ({
      ...prev,
      [entryId]: {
        current: currentTime,
        duration: duration,
        percentage: (currentTime / duration) * 100
      }
    }));
  };

  const handleAudioEnd = (entryId) => {
    setPlayingAudio(null);
    setAudioProgress(prev => ({
      ...prev,
      [entryId]: { current: 0, duration: 0, percentage: 0 }
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="screen active">
        <div className="header">
          <div className="header-content">
            <button className="back-button" onClick={() => showScreen('analyticsScreen')}>
              <span>←</span>
              <span>Back to Analytics</span>
            </button>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Your Journal Sessions</h1>
            <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>Loading...</p>
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
            <p style={{ color: '#6b46c1', fontSize: '16px' }}>Loading your sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error or empty state
  if (error || sessions.length === 0) {
    return (
      <div className="screen active">
        <div className="header">
          <div className="header-content">
            <button className="back-button" onClick={() => showScreen('analyticsScreen')}>
              <span>←</span>
              <span>Back to Analytics</span>
            </button>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Your Journal Sessions</h1>
            <p style={{ fontSize: '16px', opacity: '0.9', fontWeight: '400' }}>No sessions yet</p>
          </div>
        </div>
        <div className="main-content">
          <div style={{ textAlign: 'center', padding: '60px 30px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎤</div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#6b46c1', marginBottom: '10px' }}>
              Start Your First Session
            </h2>
            <p style={{ fontSize: '16px', color: '#8b5cf6', marginBottom: '30px' }}>
              Record your thoughts to see them here
            </p>
            <button 
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px'
              }}
              onClick={() => showScreen('homeScreen')}
            >
              Create Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups, session) => {
    const dateKey = formatDate(session.createdAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(session);
    return groups;
  }, {});

  return (
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
              <span>{sessions.length} total sessions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="timeline">
          {Object.entries(groupedSessions).map(([date, dateSessions]) => (
            <div key={date} className="timeline-group">
              <div className="date-header">{date}</div>
              
              {dateSessions.map((session) => {
                const progress = audioProgress[session.id] || { current: 0, duration: session.duration || 0, percentage: 0 };
                const isPlaying = playingAudio === session.id;
                
                return (
                  <div key={session.id} className="journal-entry">
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(139, 92, 246, 0.1)', color: '#6b46c1', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '500' }}>
                      {formatDuration(progress.current)} / {formatDuration(session.duration || 0)}
                    </div>
                    
                    <div className="entry-header">
                      <div className="entry-meta">
                        <span className="entry-time">{formatTime(session.createdAt)}</span>
                        <span className="entry-category">
                          {session.category === 'goals' && '🎯 Goals'}
                          {session.category === 'reflection' && '💭 Reflection'}
                          {session.category === 'growth' && '🌱 Growth'}
                          {session.category === 'future' && '🔮 Future'}
                          {!session.category && '📝 Journal'}
                        </span>
                      </div>
                      <h3 className="entry-title">
                        {session.category ? session.category.charAt(0).toUpperCase() + session.category.slice(1) : 'Journal Entry'}
                      </h3>
                      {session.prompt && (
                        <p style={{ fontSize: '14px', color: '#6b46c1', fontStyle: 'italic', opacity: '0.8' }}>
                          "{session.prompt}"
                        </p>
                      )}
                    </div>

                    {/* Audio Player */}
                    <div className="audio-player">
                      <div className="player-controls">
                        <button 
                          className="play-button"
                          onClick={() => handlePlayPause(session.id, session.audioUrl)}
                        >
                          {isPlaying ? '⏸️' : '▶️'}
                        </button>
                        <div style={{ flex: '1' }}>
                          <div style={{ fontSize: '14px', color: '#6b46c1', fontWeight: '500' }}>
                            {formatDuration(session.duration || 0)} minutes
                          </div>
                          <div style={{ fontSize: '12px', color: '#8b5cf6', opacity: '0.8' }}>
                            Audio recording
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{ height: '40px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', position: 'relative', marginTop: '10px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #8b5cf6, #a855f7)', 
                          width: `${progress.percentage}%`, 
                          borderRadius: '8px',
                          transition: 'width 0.1s linear'
                        }}></div>
                      </div>

                      {/* Hidden Audio Element */}
                      <audio 
                        id={`audio-${session.id}`}
                        src={session.audioUrl}
                        onTimeUpdate={(e) => handleTimeUpdate(session.id, e.target.currentTime, e.target.duration)}
                        onEnded={() => handleAudioEnd(session.id)}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Transcript Preview */}
                    {session.transcript && (
                      <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderRadius: '12px', padding: '15px', margin: '20px', borderLeft: '4px solid #8b5cf6' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b46c1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>📝</span>
                          <span>Transcript</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#4c1d95', lineHeight: '1.6' }}>
                          {session.transcript.length > 200 
                            ? `${session.transcript.substring(0, 200)}...` 
                            : session.transcript
                          }
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalSessions;