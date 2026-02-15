
"use client";

import { useState, useEffect, useCallback } from 'react';

const QUOTA_LIMIT = 10; 
const STORAGE_KEY = 'ai_request_count';
const QUOTA_EVENT = 'quota-updated';

export function useAiQuota() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateFromStorage = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCount(parseInt(saved, 10));
    } else {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    updateFromStorage();
    setIsLoaded(true);

    const handleUpdate = () => {
      updateFromStorage();
    };

    window.addEventListener(QUOTA_EVENT, handleUpdate);
    return () => window.removeEventListener(QUOTA_EVENT, handleUpdate);
  }, [updateFromStorage]);

  const increment = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const currentCount = saved ? parseInt(saved, 10) : 0;
    const newCount = currentCount + 1;
    
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    setCount(newCount);
    
    // إرسال تنبيه لكل المكونات التي تستخدم هذا الـ Hook
    window.dispatchEvent(new Event(QUOTA_EVENT));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCount(0);
    window.dispatchEvent(new Event(QUOTA_EVENT));
  };

  const isOverQuota = count >= QUOTA_LIMIT;
  const percentage = Math.min((count / QUOTA_LIMIT) * 100, 100);
  const remaining = Math.max(QUOTA_LIMIT - count, 0);

  return { 
    count, 
    limit: QUOTA_LIMIT, 
    percentage, 
    remaining,
    increment, 
    isOverQuota, 
    reset,
    isLoaded 
  };
}
