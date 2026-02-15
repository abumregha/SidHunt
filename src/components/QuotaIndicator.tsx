
"use client";

import { useAiQuota } from "@/hooks/use-ai-quota";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

export function QuotaIndicator() {
  const { count, limit, percentage, remaining, isLoaded } = useAiQuota();

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px] sm:min-w-[160px]">
      <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-primary" />
          <span>الحصة الذكية</span>
        </div>
        <span>{remaining} متبقي</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}
