"use client";

import { useState } from "react";
import { Article } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Sparkles, Check, Loader2 } from "lucide-react";
import { generateArticleSummary } from "@/ai/flows/generate-article-summary";
import { useToast } from "@/hooks/use-toast";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (summary) return;
    setIsLoading(true);
    try {
      const result = await generateArticleSummary({ articleContent: article.description || article.title });
      setSummary(result.summary);
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

  return (
    <Card className="flex flex-col h-full bg-card hover:border-accent transition-all duration-300 shadow-xl overflow-hidden group">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded">
            {article.source}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {new Date(article.pubDate).toLocaleDateString('ar-EG')}
          </span>
        </div>
        <CardTitle className="text-lg font-headline leading-tight group-hover:text-accent transition-colors">
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
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              <p className="text-xs text-muted-foreground">جاري التلخيص بالذكاء الاصطناعي...</p>
            </div>
          )}

          {summary && (
            <div className="bg-primary/20 p-4 rounded-lg border border-accent/20 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 mb-2 text-accent">
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

      <CardFooter className="flex gap-2 pt-2 border-t border-border/50 bg-secondary/30">
        <div className="flex w-full gap-2">
          {!summary ? (
            <Button 
              variant="outline" 
              className="flex-1 gap-2 border-accent/30 hover:bg-accent/10 hover:text-accent"
              onClick={handleSummarize}
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4" />
              لخّص بالذكاء
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1 gap-2 border-accent/30 hover:bg-accent/10 hover:text-accent"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "تم النسخ" : "نسخ الملخص"}
            </Button>
          )}
          
          <Button 
            variant="secondary"
            className="flex-1 gap-2"
            onClick={() => window.open(article.link, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            فتح الرابط
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}