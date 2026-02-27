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
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-sm">
              <Search className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-headline font-bold tracking-tight text-foreground leading-none">
                Side Hunt
              </h1>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
                Opportunity Catcher
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <FontSizeToggle />
            <ThemeToggle />
            <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" />
            <QuotaIndicator />
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative overflow-hidden pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-headline font-bold mb-4 leading-tight">
              صفحة شخصية تعرض اهم <span className="text-primary">45 منشوراً</span> يومياً من عدة مجتمعات مختارة بعناية من موقع <span className="text-muted-foreground">Reddit</span> لتجنب التصفح اللانهائي ومضيعة الوقت.
            </h2>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Main Feed */}
      <section className="container mx-auto px-4 pb-20">
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
