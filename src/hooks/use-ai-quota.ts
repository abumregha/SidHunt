
"use client";

import { useState, useEffect } from 'react';

const QUOTA_LIMIT = 10; // الحد الأقصى للطلبات المجانية
const STORAGE_KEY = 'ai_request_count';

export function useAiQuota() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCount(parseInt(saved, 10));
    }
    setIsLoaded(true);
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());
  };

  const reset = () => {
    setCount(0);
    localStorage.removeItem(STORAGE_KEY);
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
