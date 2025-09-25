// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile  // Add this line
  } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Sign up new user
const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    
    console.log('🔧 Debug: Starting signup with:', { email, displayName });
    console.log('🔧 Debug: Auth object:', auth);
    
    try {
      console.log('🔧 Debug: Calling createUserWithEmailAndPassword...');
      // First create the user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('🔧 Debug: Signup successful!', result.user);
      
      // Then update the profile with display name
      if (displayName && result.user) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }
      
      return result.user;
    } catch (error) {
      console.error('🔧 Debug: Signup failed with error:', error);
      console.error('🔧 Debug: Error code:', error.code);
      console.error('🔧 Debug: Error message:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in existing user
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout
  };
};