
import { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Facebook,
  Clock,
  Send
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [sectionVisible, setSectionVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const infoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInfoVisible(true);
          infoObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (infoRef.current) infoObserver.observe(infoRef.current);

    return () => {
      sectionObserver.disconnect();
      infoObserver.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Form submitted!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setService("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {/* Header Section */}
        <div className="relative bg-secondary/30 py-20 md:py-28 overflow-hidden">
          {/* Background design element */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  Contact Us
                </div>
              </div>
              <h1 className="heading-lg mb-6">Get In Touch</h1>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                We'd love to hear from you! Whether you have questions about our services, 
                want to book an appointment, or are interested in collaboration opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & Info Section */}
        <section ref={sectionRef} className="section">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className={cn(
                "transition-all duration-700",
                sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              )}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                    
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name <span className="text-primary">*</span>
                          </label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address <span className="text-primary">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="service" className="text-sm font-medium">
                            Service of Interest
                          </label>
                          <select
                            id="service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">Select a service</option>
                            <option value="bridal">Bridal Mehndi</option>
                            <option value="regular">Regular Mehndi</option>
                            <option value="nail">Nail Art</option>
                            <option value="workshop">Workshops</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Your Message <span className="text-primary">*</span>
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you're looking for..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full group" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div 
                ref={infoRef} 
                className={cn(
                  "space-y-8 transition-all duration-700",
                  infoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                )}
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-muted-foreground">info@mehndimagic.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Studio Location</h3>
                        <p className="text-muted-foreground">
                          123 Beauty Lane, Suite 101<br />
                          San Francisco, CA 94103
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Business Hours</h3>
                        <div className="grid grid-cols-2 gap-x-4 text-sm text-muted-foreground">
                          <div>Monday - Friday</div>
                          <div>10:00 AM - 7:00 PM</div>
                          <div>Saturday</div>
                          <div>10:00 AM - 5:00 PM</div>
                          <div>Sunday</div>
                          <div>Closed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Instagram className="h-6 w-6 text-primary" />
                    </a>
                    <a 
                      href="#" 
                      className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Facebook className="h-6 w-6 text-primary" />
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
                  <p className="text-muted-foreground mb-4">
                    Need a quick response? Message us directly on WhatsApp for the fastest service.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2" size="lg">
                    <svg 
                      className="h-5 w-5 text-green-500" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section bg-secondary/10 py-12">
          <div className="container-wide">
            <h2 className="text-2xl font-semibold mb-6 text-center">Find Our Studio</h2>
            <div className="rounded-xl overflow-hidden shadow-md h-96">
              {/* Placeholder for map - in a real application, you would integrate Google Maps or another service */}
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-10 w-10 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Mehndi Magic Studio</h3>
                  <p className="text-muted-foreground mb-4">123 Beauty Lane, Suite 101, San Francisco, CA 94103</p>
                  <Badge variant="outline" className="bg-white/80">
                    Map integration would appear here
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container-tight">
            <div className="text-center mb-12">
              <div className="inline-block">
                <div className="px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  FAQ
                </div>
              </div>
              <h2 className="heading-md mb-4">Common Questions</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find quick answers to frequently asked questions about our services and booking process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How far in advance should I book?</h3>
                  <p className="text-muted-foreground">
                    For bridal services, we recommend booking 2-3 months in advance. Regular appointments 
                    can usually be accommodated with 1-2 weeks' notice, but weekends fill up quickly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Do you offer mobile services?</h3>
                  <p className="text-muted-foreground">
                    Yes, we can come to your location for bridal services and group bookings with a 
                    travel fee based on distance. Please contact us for details.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">What methods of payment do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, cash, and digital payment methods like Venmo 
                    and PayPal. For bookings, a 50% deposit is required.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">What should I do to prepare for my appointment?</h3>
                  <p className="text-muted-foreground">
                    For mehndi, we recommend avoiding lotions or oils on the application area on the day 
                    of your appointment. For nail services, please remove any existing polish beforehand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container-tight text-center">
            <h2 className="heading-md mb-6">Ready to Transform Your Look?</h2>
            <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
              Contact us today to book your appointment or consultation. We look forward to creating 
              beautiful designs that reflect your personal style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
