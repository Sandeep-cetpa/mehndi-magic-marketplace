
import { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2,
  GraduationCap 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Workshop data
const upcomingWorkshops = [
  {
    id: 1,
    title: "Beginner's Mehndi Workshop",
    description: "Learn the fundamentals of mehndi art, including basic patterns, techniques, and proper application methods.",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=800&auto=format&fit=crop&q=80",
    date: new Date("2023-12-10T10:00:00"),
    duration: "3 hours",
    location: "Studio Location",
    capacity: 12,
    spotsLeft: 5,
    price: 75,
    level: "Beginner"
  },
  {
    id: 2,
    title: "Advanced Bridal Mehndi Techniques",
    description: "Master intricate bridal designs and learn professional techniques for creating stunning mehndi patterns.",
    image: "https://images.unsplash.com/photo-1583917024622-d3955f15ad3c?w=800&auto=format&fit=crop&q=80",
    date: new Date("2023-12-17T14:00:00"),
    duration: "4 hours",
    location: "Studio Location",
    capacity: 10,
    spotsLeft: 2,
    price: 120,
    level: "Advanced"
  },
  {
    id: 3,
    title: "Creative Nail Art Workshop",
    description: "Explore creative nail art techniques using various tools and materials to create stunning designs.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80",
    date: new Date("2023-12-23T11:00:00"),
    duration: "3 hours",
    location: "Online (Zoom)",
    capacity: 15,
    spotsLeft: 8,
    price: 65,
    level: "Intermediate",
    isOnline: true
  },
  {
    id: 4,
    title: "Arabic Mehndi Intensive",
    description: "Focus on the bold and beautiful patterns of Arabic mehndi style with hands-on practice and feedback.",
    image: "https://images.unsplash.com/photo-1560393141-6c44ef758b4b?w=800&auto=format&fit=crop&q=80",
    date: new Date("2024-01-07T10:00:00"),
    duration: "3.5 hours",
    location: "Studio Location",
    capacity: 12,
    spotsLeft: 10,
    price: 85,
    level: "Intermediate"
  },
];

// Benefits of workshops
const workshopBenefits = [
  {
    title: "Expert Instruction",
    description: "Learn directly from professional artists with years of experience in the industry."
  },
  {
    title: "Hands-on Practice",
    description: "Apply techniques with immediate feedback and guidance to improve your skills."
  },
  {
    title: "Small Group Setting",
    description: "Enjoy personalized attention in our limited-capacity workshops."
  },
  {
    title: "All Materials Included",
    description: "We provide high-quality supplies so you can focus on learning."
  },
  {
    title: "Take-Home Resources",
    description: "Receive digital guides and templates to continue practicing at home."
  },
  {
    title: "Community Building",
    description: "Connect with fellow enthusiasts and build your creative network."
  }
];

const WorkshopsPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const workshopsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  const [headerVisible, setHeaderVisible] = useState(false);
  const [workshopsVisible, setWorkshopsVisible] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);

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

    const workshopsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorkshopsVisible(true);
          workshopsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const benefitsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBenefitsVisible(true);
          benefitsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (workshopsRef.current) workshopsObserver.observe(workshopsRef.current);
    if (benefitsRef.current) benefitsObserver.observe(benefitsRef.current);

    return () => {
      headerObserver.disconnect();
      workshopsObserver.disconnect();
      benefitsObserver.disconnect();
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
                  Learn With Us
                </div>
              </div>
              <h1 className="heading-lg mb-6">Master the Art of Mehndi & Nail Design</h1>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                Join our expert-led workshops to develop your skills, explore creative techniques, 
                and connect with a community of fellow enthusiasts.
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Workshops Section */}
        <section ref={workshopsRef} className="section">
          <div className="container-wide">
            <div className="max-w-xl mx-auto text-center mb-16">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Calendar
                </div>
              </div>
              <h2 className="heading-lg mb-4">Upcoming Workshops</h2>
              <p className="text-muted-foreground">
                Browse our schedule and reserve your spot in one of our popular workshops.
                Both in-person and online options available.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingWorkshops.map((workshop, index) => (
                <Card 
                  key={workshop.id}
                  className={cn(
                    "overflow-hidden border shadow-sm transition-all duration-500",
                    workshopsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant={workshop.spotsLeft <= 3 ? "destructive" : "secondary"}>
                        {workshop.spotsLeft} {workshop.spotsLeft === 1 ? 'spot' : 'spots'} left
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                        {workshop.level}
                      </Badge>
                    </div>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={workshop.image}
                        alt={workshop.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{workshop.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{format(workshop.date, "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{format(workshop.date, "h:mm a")} ({workshop.duration})</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{workshop.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Limited to {workshop.capacity} attendees</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xl">${workshop.price}</div>
                      <Button>
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Workshop Benefits Section */}
        <section ref={benefitsRef} className="section bg-secondary/10">
          <div className="container-wide">
            <div className="max-w-xl mx-auto text-center mb-16">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Why Join
                </div>
              </div>
              <h2 className="heading-lg mb-4">Benefits of Our Workshops</h2>
              <p className="text-muted-foreground">
                Our workshops are designed to provide a comprehensive learning experience in a supportive environment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopBenefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className={cn(
                    "bg-white/90 backdrop-blur-sm p-6 rounded-lg border shadow-sm transition-all duration-500",
                    benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-8 w-8 text-primary/80 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Workshop Section */}
        <section className="section">
          <div className="container-tight">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <GraduationCap className="h-12 w-12 text-primary/80 mx-auto mb-6" />
                <h2 className="heading-md mb-4">Looking for a Private Workshop?</h2>
                <p className="text-foreground/80 mb-8">
                  We offer customized workshops for groups, corporate events, and special occasions. 
                  Create a personalized learning experience for your team or celebration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group">
                    Inquire Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="section bg-secondary/30">
          <div className="container-tight">
            <div className="text-center">
              <h2 className="heading-md mb-8">What Workshop Participants Say</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/90 backdrop-blur-sm shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80" 
                          alt="Testimonial" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Aisha P.</h4>
                        <p className="text-sm text-muted-foreground">Beginner's Workshop</p>
                      </div>
                    </div>
                    <p className="text-sm italic">
                      "As someone with no prior experience, I was nervous about attending. The instructor 
                      was so patient and supportive! I left with skills I never thought I could develop in 
                      just one session. Highly recommend for beginners."
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/90 backdrop-blur-sm shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=120&auto=format&fit=crop&q=80" 
                          alt="Testimonial" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Maya J.</h4>
                        <p className="text-sm text-muted-foreground">Advanced Techniques</p>
                      </div>
                    </div>
                    <p className="text-sm italic">
                      "Even though I've been doing mehndi for years, I learned so many new techniques 
                      and shortcuts. The small class size meant I got personalized feedback that has 
                      really elevated my work. Worth every penny!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container-tight text-center">
            <h2 className="heading-md mb-6">Ready to Enhance Your Skills?</h2>
            <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
              Join one of our upcoming workshops and learn from expert artists in a supportive, 
              creative environment. Limited spots available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                View All Workshops
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkshopsPage;
