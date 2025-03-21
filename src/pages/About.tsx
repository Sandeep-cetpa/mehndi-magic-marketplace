
import { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const [storyVisible, setStoryVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);

  useEffect(() => {
    const storyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          storyObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const valuesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesVisible(true);
          valuesObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
          teamObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) storyObserver.observe(sectionRef.current);
    if (valuesRef.current) valuesObserver.observe(valuesRef.current);
    if (teamRef.current) teamObserver.observe(teamRef.current);

    return () => {
      storyObserver.disconnect();
      valuesObserver.disconnect();
      teamObserver.disconnect();
    };
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Aisha Sharma",
      role: "Founder & Lead Artist",
      bio: "With over 15 years of experience, Aisha combines traditional techniques with modern designs.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Priya Patel",
      role: "Senior Mehndi Artist",
      bio: "Specializing in bridal mehndi, Priya is known for her intricate and detailed designs.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Maya Johnson",
      role: "Nail Art Specialist",
      bio: "A certified nail technician who creates stunning custom nail art designs.",
      image: "https://images.unsplash.com/photo-1580894732930-0babd100d356?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Sonia Khan",
      role: "Workshop Instructor",
      bio: "Passionate about teaching the art of mehndi to enthusiasts of all skill levels.",
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&auto=format&fit=crop&q=80"
    },
  ];

  // Our values data
  const values = [
    {
      title: "Artistic Excellence",
      description: "We strive for perfection in every design, combining traditional techniques with innovative approaches."
    },
    {
      title: "Personalized Service",
      description: "Each client receives a customized experience tailored to their unique style and preferences."
    },
    {
      title: "Quality Products",
      description: "We use only the finest quality henna and nail products that are safe and long-lasting."
    },
    {
      title: "Continuous Learning",
      description: "Our artists regularly update their skills and stay current with the latest trends and techniques."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {/* Header Section */}
        <div className="bg-secondary/30 py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  About Us
                </div>
              </div>
              <h1 className="heading-lg mb-6">Our Story of Art & Passion</h1>
              <p className="text-lg text-muted-foreground">
                Discover the people and values behind Mehndi Magic, where tradition meets innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <section ref={sectionRef} className="section">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div 
                className={cn(
                  "relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl transition-all duration-700",
                  storyVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                )}
              >
                <img 
                  src="https://images.unsplash.com/photo-1591122947157-28866d03c0e4?w=800&auto=format&fit=crop&q=80" 
                  alt="Mehndi artist at work" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded text-xs font-medium">
                    Est. 2018
                  </div>
                </div>
              </div>
              
              <div 
                className={cn(
                  "space-y-6 transition-all duration-700",
                  storyVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                )}
              >
                <div className="inline-block">
                  <div className="px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                    Our Journey
                  </div>
                </div>
                <h2 className="heading-md">A Blend of Tradition & Innovation</h2>
                <p className="text-foreground/80">
                  Mehndi Magic began in 2018 when our founder, Aisha Sharma, decided to transform her 
                  lifelong passion for mehndi art into a business. With a deep appreciation for the cultural 
                  significance of henna and a vision to create modern designs, she opened a small studio 
                  that quickly gained popularity.
                </p>
                <p className="text-foreground/80">
                  What started as a one-woman operation has grown into a team of skilled artists specializing 
                  in various forms of body art and nail design. Today, we serve clients for weddings, cultural 
                  celebrations, and everyday beauty enhancement, while also sharing our knowledge through workshops.
                </p>
                <Button className="group mt-4">
                  Meet Our Team
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section ref={valuesRef} className="section bg-secondary/10">
          <div className="container-wide">
            <div className="max-w-xl mx-auto text-center mb-16">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Our Values
                </div>
              </div>
              <h2 className="heading-lg mb-4">What We Stand For</h2>
              <p className="text-muted-foreground">
                Our core values guide everything we do, from customer interactions to artistic creation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className={cn(
                    "bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-sm transition-all duration-500",
                    valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section ref={teamRef} className="section">
          <div className="container-wide">
            <div className="max-w-xl mx-auto text-center mb-16">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Our Team
                </div>
              </div>
              <h2 className="heading-lg mb-4">Meet The Artists</h2>
              <p className="text-muted-foreground">
                Our talented team combines years of experience with a passion for artistic expression.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name}
                  className={cn(
                    "group transition-all duration-500",
                    teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 shadow-md">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container-tight text-center">
            <h2 className="heading-md mb-6">Ready to Experience Our Artistry?</h2>
            <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
              Book a consultation with one of our talented artists to discuss your vision 
              and create a personalized design that reflects your style.
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

export default AboutPage;
