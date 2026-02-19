"use client";

import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types';

const STORAGE_KEY = 'side_hunt_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        setBookmarks([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleBookmark = useCallback((article: Article) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.id === article.id);
      let next;
      if (isBookmarked) {
        next = prev.filter((b) => b.id !== article.id);
      } else {
        next = [...prev, article];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some((b) => b.id === id);
  }, [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked, isLoaded };
}
