
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const Hero = ({
  title = "Elevate Your Beauty With Artistic Expression",
  subtitle = "Experience the finest mehndi and nail art designs, where tradition meets modern aesthetics. Our skilled artists create personalized masterpieces that tell your unique story.",
  className,
}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative min-h-[90vh] flex items-center", className)}>
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613135020844-65e53fb1b942?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
      </div>

      {/* Hero Content */}
      <div className="container-wide relative z-20 pt-20">
        <div className="max-w-3xl space-y-8">
          <div className={cn(
            "space-y-4 transition-all duration-700 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="inline-block">
              <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                Premium Mehndi & Nail Art
              </div>
            </div>
            <h1 className="heading-xl text-foreground [text-wrap:balance]">
              {title}
            </h1>
            <p className="text-lg text-foreground/80 md:text-xl max-w-xl [text-wrap:balance]">
              {subtitle}
            </p>
          </div>

          <div className={cn(
            "flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <Button size="lg" className="group">
              Book a Session
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </div>

          <div className={cn(
            "grid grid-cols-2 sm:grid-cols-3 gap-8 pt-12 transition-all duration-700 delay-500",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="space-y-2">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">5 Years</p>
              <p className="text-sm text-muted-foreground">Experience</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
