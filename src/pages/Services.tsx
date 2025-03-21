
import { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check } from "lucide-react";

const services = [
  {
    id: "bridal",
    title: "Bridal Services",
    subtitle: "Make your special day even more beautiful",
    description: "Our bridal services combine traditional patterns with personalized designs to create stunning mehndi art that complements your wedding attire and theme.",
    image: "https://images.unsplash.com/photo-1610749025296-056c45cb3ffe?w=800&auto=format&fit=crop&q=80",
    packages: [
      {
        title: "Essential Bridal",
        price: "$199",
        duration: "2-3 hours",
        description: "Classic bridal mehndi designs for hands and feet.",
        features: [
          "Traditional patterns",
          "Hands and feet coverage",
          "Natural organic henna",
          "Touch-up kit included"
        ]
      },
      {
        title: "Premium Bridal",
        price: "$349",
        duration: "4-5 hours",
        description: "Elaborate designs with premium detail and customization.",
        features: [
          "Full hands and arms coverage",
          "Full feet and legs coverage",
          "Personalized design consultation",
          "Premium organic henna",
          "Touch-up kit included",
          "Post-event care package"
        ],
        featured: true
      },
      {
        title: "Complete Bridal Package",
        price: "$499",
        duration: "6+ hours",
        description: "Comprehensive bridal mehndi experience with nail art.",
        features: [
          "Full hands, arms, feet and legs",
          "Custom design planning session",
          "Premium organic henna",
          "Bridal nail art included",
          "Touch-up kit and care package",
          "Digital design preview",
          "Take-home gift"
        ]
      }
    ]
  },
  {
    id: "regular",
    title: "Regular Mehndi",
    subtitle: "Beautiful designs for any occasion",
    description: "From festivals and celebrations to personal expression, our mehndi services offer a range of designs to suit any occasion.",
    image: "https://images.unsplash.com/photo-1596098862599-1a55ff475137?w=800&auto=format&fit=crop&q=80",
    packages: [
      {
        title: "Express Design",
        price: "$35",
        duration: "30 minutes",
        description: "Quick and beautiful designs for a single hand.",
        features: [
          "One hand coverage",
          "Simple elegant patterns",
          "Natural organic henna",
          "Care instructions"
        ]
      },
      {
        title: "Standard Session",
        price: "$65",
        duration: "1 hour",
        description: "More detailed designs for both hands or feet.",
        features: [
          "Both hands or feet",
          "Medium complexity patterns",
          "Natural organic henna",
          "Care instructions",
          "Touch-up service"
        ],
        featured: true
      },
      {
        title: "Deluxe Design",
        price: "$120",
        duration: "2 hours",
        description: "Elaborate designs for hands and feet with custom elements.",
        features: [
          "Hands and feet coverage",
          "Complex custom patterns",
          "Premium organic henna",
          "Digital design preview",
          "Touch-up kit included",
          "Aftercare products"
        ]
      }
    ]
  },
  {
    id: "nailart",
    title: "Nail Art",
    subtitle: "Express yourself through beautiful nail designs",
    description: "Our nail art services combine technical precision with creative flair to produce stunning designs that reflect your personal style.",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=800&auto=format&fit=crop&q=80",
    packages: [
      {
        title: "Basic Nail Art",
        price: "$45",
        duration: "45 minutes",
        description: "Essential nail art with simple designs on regular polish.",
        features: [
          "Nail preparation and shaping",
          "Basic design on 2-4 accent nails",
          "Regular polish application",
          "Topcoat for longevity"
        ]
      },
      {
        title: "Premium Nail Art",
        price: "$75",
        duration: "1.5 hours",
        description: "Detailed nail art with gel polish for extended wear.",
        features: [
          "Nail preparation and shaping",
          "Gel polish application",
          "Custom designs on all nails",
          "Hand-painted elements",
          "Rhinestones or foils (optional)"
        ],
        featured: true
      },
      {
        title: "Luxury 3D Nail Art",
        price: "$110",
        duration: "2+ hours",
        description: "Advanced nail art techniques with 3D elements and premium add-ons.",
        features: [
          "Nail preparation and shaping",
          "Gel or acrylic extensions (if desired)",
          "Complex custom designs",
          "3D elements and textures",
          "Premium embellishments",
          "Specialty finishes",
          "Nail strengthening treatment"
        ]
      }
    ]
  }
];

const ServicesPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const [headerVisible, setHeaderVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          servicesObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (servicesRef.current) servicesObserver.observe(servicesRef.current);

    return () => {
      headerObserver.disconnect();
      servicesObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {/* Header Section */}
        <div ref={headerRef} className="relative bg-secondary/30 py-20 md:py-28 overflow-hidden">
          {/* Background design element */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container-wide relative z-10">
            <div 
              className={cn(
                "max-w-3xl mx-auto text-center transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
            >
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Our Services
                </div>
              </div>
              <h1 className="heading-lg mb-6">Artistic Excellence at Your Fingertips</h1>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                From traditional bridal mehndi to contemporary nail art, our services blend cultural heritage 
                with modern aesthetics to create personalized beauty experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Services Tabs Section */}
        <section ref={servicesRef} className="section">
          <div className="container-wide">
            <Tabs defaultValue="bridal" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full max-w-xl">
                  {services.map((service) => (
                    <TabsTrigger 
                      key={service.id} 
                      value={service.id}
                      className={cn(
                        "transition-all duration-500",
                        servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      )}
                    >
                      {service.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {services.map((service) => (
                <TabsContent key={service.id} value={service.id}>
                  <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className={cn(
                      "rounded-lg overflow-hidden shadow-lg transition-all duration-700",
                      servicesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                    )}>
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </div>
                    <div className={cn(
                      "space-y-6 transition-all duration-700",
                      servicesVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                    )}>
                      <div className="inline-block">
                        <div className="px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                          {service.subtitle}
                        </div>
                      </div>
                      <h2 className="heading-md">{service.title}</h2>
                      <p className="text-foreground/80">
                        {service.description}
                      </p>
                      <Button className="group">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-6 text-center">Available Packages</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {service.packages.map((pkg, index) => (
                      <Card 
                        key={pkg.title}
                        className={cn(
                          "overflow-hidden transition-all duration-500 relative",
                          pkg.featured && "border-primary shadow-lg shadow-primary/10",
                          servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                        )}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                      >
                        {pkg.featured && (
                          <div className="absolute top-0 left-0 right-0 bg-primary text-white text-xs font-medium py-1 text-center">
                            Most Popular
                          </div>
                        )}
                        <CardContent className={cn("p-6", pkg.featured && "pt-8")}>
                          <h4 className="text-xl font-semibold mb-1">{pkg.title}</h4>
                          <div className="flex items-baseline mb-2">
                            <span className="text-3xl font-bold">{pkg.price}</span>
                            <span className="text-muted-foreground ml-1 text-sm">/ session</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{pkg.duration}</p>
                          <p className="text-sm mb-4">{pkg.description}</p>
                          
                          <div className="space-y-2 mb-6">
                            {pkg.features.map((feature) => (
                              <div key={feature} className="flex items-start">
                                <Check className="h-4 w-4 text-primary mr-2 mt-1 shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className={cn("w-full", pkg.featured ? "" : "variant-outline")}
                            variant={pkg.featured ? "default" : "outline"}
                          >
                            Select Package
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-secondary/10">
          <div className="container-tight">
            <div className="text-center mb-12">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Common Questions
                </div>
              </div>
              <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to know about our services and booking process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How long does mehndi last?</h3>
                <p className="text-muted-foreground">
                  Typically, mehndi lasts 1-3 weeks depending on placement and how well you care for it. 
                  We provide aftercare instructions to help maximize the longevity and color intensity.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Is a deposit required to book?</h3>
                <p className="text-muted-foreground">
                  Yes, we require a 50% deposit to secure your appointment, especially for bridal services 
                  and weekend slots that tend to book quickly.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Do you offer mobile services?</h3>
                <p className="text-muted-foreground">
                  Yes, we can come to your location for bridal services and group bookings with a 
                  travel fee based on distance. Please contact us for details.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How far in advance should I book?</h3>
                <p className="text-muted-foreground">
                  For bridal services, we recommend booking 2-3 months in advance. Regular appointments 
                  can usually be accommodated with 1-2 weeks' notice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container-tight text-center">
            <h2 className="heading-md mb-6">Ready to Book Your Service?</h2>
            <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
              Contact us today to schedule your appointment or consultation. We're excited to create 
              something beautiful just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
