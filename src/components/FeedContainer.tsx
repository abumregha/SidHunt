"use client";

import { useEffect, useState } from "react";
import { Article } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Loader2, RefreshCw, Zap, Bookmark as BookmarkIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookmarks } from "@/hooks/use-bookmarks";

export function FeedContainer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSource, setActiveSource] = useState<string>("all");
  const [showBookmarks, setShowBookmarks] = useState(false);
  
  const { bookmarks } = useBookmarks();

  const fetchFeed = async () => {
    try {
      const res = await fetch('/api/rss');
      const data = await res.json();
      setArticles(data.items);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchFeed();
  };

  const filteredArticles = showBookmarks 
    ? bookmarks 
    : articles.filter(a => activeSource === "all" || a.source === activeSource);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-headline">جاري البحث عن الفرص...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={(val) => {
            setActiveSource(val);
            setShowBookmarks(false);
          }}>
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
              <TabsTrigger value="Side Hunts" className="text-xs">Side Hunts</TabsTrigger>
              <TabsTrigger value="Websites" className="text-xs">Websites</TabsTrigger>
              <TabsTrigger value="AI & Code" className="text-xs">AI & Code</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button 
            variant={showBookmarks ? "default" : "outline"} 
            size="sm" 
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="gap-2"
          >
            <BookmarkIcon className={`h-4 w-4 ${showBookmarks ? 'fill-primary-foreground' : ''}`} />
            {showBookmarks ? "عرض الكل" : "المفضلة"}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-primary"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-xl bg-secondary/20">
            <p className="text-muted-foreground italic font-medium">
              {showBookmarks ? "لا توجد منشورات في المفضلة بعد." : "لم يتم العثور على أفكار لهذا القسم اليوم."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
