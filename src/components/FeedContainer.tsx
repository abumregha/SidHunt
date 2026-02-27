"use client";

import { useEffect, useState, useCallback } from "react";
import { Article } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Loader2, RefreshCw, Bookmark as BookmarkIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookmarks } from "@/hooks/use-bookmarks";

export function FeedContainer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSource, setActiveSource] = useState<string>("all");
  const [activeDay, setActiveDay] = useState<"today" | "yesterday">("today");
  const [showBookmarks, setShowBookmarks] = useState(false);
  
  const { bookmarks } = useBookmarks();

  const fetchFeed = useCallback(async (day: "today" | "yesterday") => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/rss?day=${day}`);
      const data = await res.json();
      setArticles(data.items);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed(activeDay);
  }, [activeDay, fetchFeed]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchFeed(activeDay);
  };

  const handleDayChange = (day: "today" | "yesterday") => {
    setActiveDay(day);
    setShowBookmarks(false);
  };

  const filteredArticles = showBookmarks 
    ? bookmarks 
    : articles.filter(a => activeSource === "all" || a.source === activeSource);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Date Selector and Refresher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-secondary/30 p-0.5 sm:p-1 rounded-lg border border-border/50">
            <Button 
              variant={activeDay === "today" && !showBookmarks ? "default" : "ghost"}
              size="sm"
              onClick={() => handleDayChange("today")}
              className="text-[11px] sm:text-xs h-7 sm:h-8 px-3 sm:px-4"
            >
              اليوم
            </Button>
            <Button 
              variant={activeDay === "yesterday" && !showBookmarks ? "default" : "ghost"}
              size="sm"
              onClick={() => handleDayChange("yesterday")}
              className="text-[11px] sm:text-xs h-7 sm:h-8 px-3 sm:px-4"
            >
              أمس
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button 
              variant={showBookmarks ? "default" : "outline"} 
              size="sm" 
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="gap-2 h-8 sm:h-9 px-3"
            >
              <BookmarkIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${showBookmarks ? 'fill-primary-foreground' : ''}`} />
              <span className="hidden xs:inline text-[11px] sm:text-xs">المفضلة</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRefresh} 
              disabled={isRefreshing || isLoading}
              className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-primary"
            >
              <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRefreshing || isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Source Filter Tabs */}
        {!showBookmarks && (
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveSource}>
            <TabsList className="bg-secondary/50 w-full justify-start overflow-x-auto h-9 sm:h-10 no-scrollbar">
              <TabsTrigger value="all" className="text-[11px] sm:text-xs flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-4">الكل (45)</TabsTrigger>
              <TabsTrigger value="Side Hunts" className="text-[11px] sm:text-xs flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-4">Side Hunts</TabsTrigger>
              <TabsTrigger value="Websites" className="text-[11px] sm:text-xs flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-4">Websites</TabsTrigger>
              <TabsTrigger value="AI & Code" className="text-[11px] sm:text-xs flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-4">AI & Code</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-headline text-sm sm:base">جاري البحث عن الفرص...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full py-16 sm:py-20 text-center border-2 border-dashed border-muted rounded-xl bg-secondary/10">
              <Calendar className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground italic font-medium text-sm sm:base px-4">
                {showBookmarks 
                  ? "لا توجد منشورات في المفضلة بعد." 
                  : `لم يتم العثور على منشورات في ${activeDay === "today" ? "اليوم" : "الأمس"}.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
