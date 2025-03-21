
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "The bridal mehndi designs exceeded all my expectations. The artist was not only skilled but also made the experience so enjoyable. The patterns were intricate and stayed vibrant throughout my wedding.",
    author: "Priya Shah",
    role: "Bride",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    content:
      "I've been getting my nails done here for over a year now, and I'm always impressed by their attention to detail and creativity. The nail art designs are unique and last weeks without chipping.",
    author: "Maya Johnson",
    role: "Regular Client",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    content:
      "The henna tattoo I got for my birthday party was stunning. All my friends were asking where I got it done! The artist was professional and created exactly what I wanted.",
    author: "Zara Ahmed",
    role: "Birthday Celebration",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    content:
      "I attended their workshop and learned so much about the art of mehndi. The instructor was patient and knowledgeable. I've been practicing ever since, and my skills have improved tremendously.",
    author: "Aisha Patel",
    role: "Workshop Participant",
    avatar: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=120&auto=format&fit=crop&q=80",
  },
];

const Testimonials = () => {
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
    <section ref={sectionRef} className="section bg-secondary/10">
      <div className="container-wide">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-block">
            <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Client Stories
            </div>
          </div>
          <h2 className="heading-lg mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground">
            We pride ourselves on delivering exceptional experiences and stunning designs that our clients love to share.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={cn(
                "border shadow-sm hover:shadow-md transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)" 
              }}
            >
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
