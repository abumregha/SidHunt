"use client";

import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FONT_SIZES = [
  { label: "صغير", value: "small" },
  { label: "متوسط", value: "medium" },
  { label: "كبير", value: "large" },
  { label: "كبير جداً", value: "extra-large" },
];

export function FontSizeToggle() {
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const saved = localStorage.getItem("font-size") || "medium";
    setFontSize(saved);
    document.documentElement.setAttribute("data-font-size", saved);
  }, []);

  const changeSize = (size: string) => {
    setFontSize(size);
    document.documentElement.setAttribute("data-font-size", size);
    localStorage.setItem("font-size", size);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary transition-colors">
          <Type className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {FONT_SIZES.map((size) => (
          <DropdownMenuItem 
            key={size.value} 
            onClick={() => changeSize(size.value)}
            className={fontSize === size.value ? "bg-accent" : ""}
          >
            {size.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
