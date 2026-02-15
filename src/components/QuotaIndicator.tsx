
"use client";

import { useAiQuota } from "@/hooks/use-ai-quota";
import { Progress } from "@/components/ui/progress";
import { Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function QuotaIndicator() {
  const { count, limit, percentage, remaining, isLoaded, reset } = useAiQuota();

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1.5 min-w-[120px] sm:min-w-[160px]">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className={`h-3 w-3 ${remaining === 0 ? 'text-destructive' : 'text-primary'}`} />
            <span>الحصة الذكية</span>
          </div>
          <span className={remaining === 0 ? "text-destructive font-bold" : ""}>
            {count} من {limit}
          </span>
        </div>
        <Progress 
          value={percentage} 
          className="h-1.5" 
          indicatorClassName={remaining === 0 ? "bg-destructive" : "bg-primary"}
        />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
              onClick={reset}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">إعادة تعيين الحصة</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
