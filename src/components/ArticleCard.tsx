"use client";

import { useState } from "react";
import { Article } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Sparkles, Check, Loader2, AlertCircle, Bookmark, BookmarkCheck } from "lucide-react";
import { generateArticleSummary } from "@/ai/flows/generate-article-summary";
import { useToast } from "@/hooks/use-toast";
import { useAiQuota } from "@/hooks/use-ai-quota";
import { useBookmarks } from "@/hooks/use-bookmarks";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { isOverQuota, increment } = useAiQuota();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const handleSummarize = async () => {
    if (summary) return;
    
    if (isOverQuota) {
      toast({
        title: "نفدت الحصة",
        description: "لقد استهلكت جميع طلبات الذكاء الاصطناعي المجانية لهذا اليوم.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateArticleSummary({ articleContent: article.description || article.title });
      setSummary(result.summary);
      increment();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إنشاء الملخص. يرجى المحاولة لاحقاً.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(article.pubDate).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    numberingSystem: 'latn'
  });

  const bookmarked = isBookmarked(article.id);

  return (
    <Card className="flex flex-col h-full bg-card hover:border-muted-foreground/30 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden group border-border">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-secondary px-2 py-0.5 rounded">
            {article.source}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">
              {formattedDate}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-muted-foreground hover:text-primary"
              onClick={() => toggleBookmark(article)}
            >
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary fill-primary" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg font-headline leading-tight transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {!summary && !isLoading && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.description || "لا يوجد وصف متاح لهذا المنشور."}
            </p>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-xs text-muted-foreground">جاري التلخيص بالذكاء الاصطناعي...</p>
            </div>
          )}

          {summary && (
            <div className="bg-secondary p-4 rounded-lg border border-border animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 mb-2 text-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold">ملخص ذكي:</span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90 font-medium">
                {summary}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2 border-t border-border/50 bg-secondary/20">
        <div className="flex w-full gap-2">
          {!summary ? (
            <Button 
              variant={isOverQuota ? "secondary" : "outline"}
              className={`flex-1 gap-2 border-border ${isOverQuota ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary'}`}
              onClick={handleSummarize}
              disabled={isLoading}
            >
              {isOverQuota ? (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-bold text-xs">انتهت الحصة</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs">لخص بالذكاء</span>
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1 gap-2 border-border hover:bg-secondary"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="text-xs">{copied ? "تم النسخ" : "نسخ الملخص"}</span>
            </Button>
          )}
          
          <Button 
            variant="secondary"
            className="flex-1 gap-2"
            onClick={() => window.open(article.link, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-xs">فتح الرابط</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
