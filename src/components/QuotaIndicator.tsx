"use client";

import { useAiQuota } from "@/hooks/use-ai-quota";
import { Progress } from "@/components/ui/progress";
import { Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function QuotaIndicator() {
  const { count, limit, percentage, remaining, isLoaded, reset } = useAiQuota();

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      <div className="flex flex-col gap-1 min-w-[60px] xs:min-w-[80px] sm:min-w-[140px]">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${remaining === 0 ? 'text-destructive' : 'text-primary'}`} />
            <span className="hidden sm:inline">الحصة</span>
          </div>
          <span className={remaining === 0 ? "text-destructive font-bold" : ""}>
            {count}/{limit}
          </span>
        </div>
        <Progress 
          value={percentage} 
          className="h-1 sm:h-1.5" 
          indicatorClassName={remaining === 0 ? "bg-destructive" : "bg-primary"}
        />
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary transition-colors"
        onClick={reset}
      >
        <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </Button>
    </div>
  );
}
