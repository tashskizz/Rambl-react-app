// src/services/apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
  const url = `${this.baseURL}${endpoint}`;
  
  const config = {
    ...options,
  };

  // Only add JSON Content-Type if it's NOT FormData
  if (!(options.body instanceof FormData)) {
    config.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  } else {
    // For FormData, start with existing headers but don't add Content-Type
    config.headers = {
      ...options.headers,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

  // ==================== USER PROFILE ====================
  
  async createUserProfile(userId, profileData) {
    return this.request('/api/journal/profile', {
      method: 'POST',
      body: JSON.stringify({ userId, ...profileData }),
    });
  }

  async getUserProfile(userId) {
    return this.request(`/api/journal/profile/${userId}`);
  }

  async updateUserProfile(userId, updates) {
    return this.request(`/api/journal/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // ==================== JOURNAL ENTRIES ====================
  
  async uploadAudio(audioFile, userId, metadata) {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('userId', userId);
    formData.append('category', metadata.category);
    formData.append('difficulty', metadata.difficulty);
    formData.append('prompt', metadata.prompt);
    formData.append('duration', metadata.duration);

    return this.request('/api/journal/upload', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async uploadAudioEntry(audioBlob, metadata) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'journal-entry.webm');
  formData.append('userId', this.getCurrentUserId());
  formData.append('category', metadata.category);
  formData.append('difficulty', metadata.difficulty);
  formData.append('prompt', metadata.prompt);
  formData.append('duration', metadata.duration);

  return this.request('/api/journal/upload', {
    method: 'POST',
    body: formData,
  });
}
  async getUserEntries(userId, limit = 20, page = 1) {
    return this.request(`/api/journal/entries/${userId}?limit=${limit}&page=${page}`);
  }

  async getEntryById(entryId) {
    return this.request(`/api/journal/entries/entry/${entryId}`);
  }

  // ==================== ANALYTICS ====================
  
  async getUserAnalytics(userId, timeframe = '30d') {
    return this.request(`/api/journal/analytics/${userId}?timeframe=${timeframe}`);
  }

  // ==================== HEALTH CHECK ====================
  
  async healthCheck() {
    return this.request('/health');
  }

  // ==================== UTILITY METHODS ====================
  

getCurrentUserId() {
  // Get the actual Firebase user ID from your auth hook
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    console.error('No authenticated user ID found');
    return null;
  }
  
  return userId;
}

}

export default new ApiService();