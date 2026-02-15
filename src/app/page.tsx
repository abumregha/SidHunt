
import { FeedContainer } from "@/components/FeedContainer";
import { Toaster } from "@/components/ui/toaster";
import { BrainCircuit } from "lucide-react";
import { QuotaIndicator } from "@/components/QuotaIndicator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-sm">
              <BrainCircuit className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-headline font-bold tracking-tight text-foreground leading-none">
                IdeaDigest
              </h1>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
                Soft Edition
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <QuotaIndicator />
            <div className="hidden lg:flex items-center text-xs text-muted-foreground font-medium border-r pr-4 mr-4">
              تغذية من Reddit • مدعوم بـ AI
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Banner section */}
      <section className="relative overflow-hidden pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-4 leading-tight">
              اكتشف <span className="text-muted-foreground">أفضل الأفكار</span> والمواقع الجديدة يومياً.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-2">
              نقوم بجمع أهم المنشورات من Reddit ونلخصها لك باستخدام الذكاء الاصطناعي لتوفير وقتك.
            </p>
          </div>
        </div>
        
        {/* Subtle decorative background blur */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-muted/50 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Main Feed */}
      <section className="container mx-auto px-4 pb-20">
        <FeedContainer />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IdeaDigest - صائد الأفكار الذكي. 
            <br className="sm:hidden" /> 
            تم التطوير لدعم البحث عن الفرص الجانبية والتقنيات الجديدة.
          </p>
        </div>
      </footer>

      <Toaster />
    </main>
  );
}
