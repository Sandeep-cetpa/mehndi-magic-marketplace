
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    title: "Bridal Mehndi",
    description: "Intricate and beautiful designs for your special day, customized to match your wedding theme and attire.",
    image: "https://images.unsplash.com/photo-1610749025296-056c45cb3ffe?w=500&auto=format&fit=crop&q=80",
    price: "From $150",
  },
  {
    id: 2,
    title: "Arabic Mehndi",
    description: "Bold and beautiful patterns inspired by Arabic art traditions, perfect for special occasions.",
    image: "https://images.unsplash.com/photo-1596098862599-1a55ff475137?w=500&auto=format&fit=crop&q=80",
    price: "From $80",
  },
  {
    id: 3,
    title: "Nail Art Designs",
    description: "Express your unique style with our custom nail art designs, from minimal elegance to bold statements.",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&auto=format&fit=crop&q=80",
    price: "From $45",
  },
  {
    id: 4,
    title: "Henna Tattoos",
    description: "Beautiful temporary body art that lasts 1-3 weeks, perfect for events, festivals or personal expression.",
    image: "https://images.unsplash.com/photo-1591122947157-28866d03c0e4?w=500&auto=format&fit=crop&q=80",
    price: "From $35",
  },
];

const FeaturedServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="section bg-secondary/30">
      <div className="container-wide">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-block">
            <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Our Services
            </div>
          </div>
          <h2 className="heading-lg mb-4">Artistry That Tells Your Story</h2>
          <p className="text-muted-foreground">
            From traditional designs to contemporary trends, our skilled artists blend creativity with
            precision to create designs that reflect your personality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className={cn(
                "overflow-hidden border-0 shadow-md transition-all duration-500 hover:shadow-lg group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
              )}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)" 
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary font-medium">{service.price}</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <span className="text-sm flex items-center gap-1">
                      Learn more 
                      <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
