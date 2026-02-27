"use client";

import { Type, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const SIZES = ["small", "medium", "large", "extra-large"];

export function FontSizeToggle() {
  const [sizeIndex, setSizeIndex] = useState(1); // Default to "medium"

  useEffect(() => {
    const saved = localStorage.getItem("font-size") || "medium";
    const index = SIZES.indexOf(saved);
    const validIndex = index !== -1 ? index : 1;
    setSizeIndex(validIndex);
    document.documentElement.setAttribute("data-font-size", SIZES[validIndex]);
  }, []);

  const updateSize = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < SIZES.length) {
      setSizeIndex(newIndex);
      const sizeValue = SIZES[newIndex];
      document.documentElement.setAttribute("data-font-size", sizeValue);
      localStorage.setItem("font-size", sizeValue);
    }
  };

  return (
    <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 border border-border/50">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
        onClick={() => updateSize(sizeIndex - 1)}
        disabled={sizeIndex === 0}
        title="تصغير الخط"
      >
        <div className="relative">
          <Type className="h-4 w-4" />
          <Minus className="h-2 w-2 absolute -bottom-1 -right-1" />
        </div>
      </Button>
      <div className="w-px h-4 bg-border/50" />
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
        onClick={() => updateSize(sizeIndex + 1)}
        disabled={sizeIndex === SIZES.length - 1}
        title="تكبير الخط"
      >
        <div className="relative">
          <Type className="h-5 w-5" />
          <Plus className="h-2 w-2 absolute -bottom-1 -right-1" />
        </div>
      </Button>
    </div>
  );
}
