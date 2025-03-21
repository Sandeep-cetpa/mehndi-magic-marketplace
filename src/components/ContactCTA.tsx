
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const ContactCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section relative overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592659762303-90081d34b277?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15"
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={cn(
              "space-y-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="inline-block">
              <div className="px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                Get In Touch
              </div>
            </div>
            <h2 className="heading-lg mb-4">Ready to Transform Your Look?</h2>
            <p className="text-foreground/80 text-lg max-w-xl mx-auto">
              Whether you're planning a wedding, special event, or simply want to treat yourself, our team is ready to create the perfect design for you.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
