import { FeedContainer } from "@/components/FeedContainer";
import { Toaster } from "@/components/ui/toaster";
import { Search } from "lucide-react";
import { QuotaIndicator } from "@/components/QuotaIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontSizeToggle } from "@/components/FontSizeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-primary p-1.5 sm:p-2 rounded-lg shadow-sm">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-headline font-bold tracking-tight text-foreground leading-none">
                Side Hunt
              </h1>
              <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.1em] hidden xs:block">
                Opportunity Catcher
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-4">
            <FontSizeToggle />
            <ThemeToggle />
            <div className="w-px h-6 bg-border/50 mx-0.5 hidden sm:block" />
            <QuotaIndicator />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 pt-4 sm:pt-8 pb-20">
        <FeedContainer />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Side Hunt - صائد الفرص الجانبية.
          </p>
        </div>
      </footer>

      <Toaster />
    </main>
  );
}
