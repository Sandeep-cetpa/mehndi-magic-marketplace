
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, ShoppingBag, PenTool, GraduationCap, Mail, Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "About", path: "/about", icon: <User className="h-4 w-4" /> },
    { name: "Products", path: "/products", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Services", path: "/services", icon: <PenTool className="h-4 w-4" /> },
    { name: "Workshops", path: "/workshops", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight relative z-10"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Mehndi Magic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button size="sm" className="ml-4">
            Book Now
          </Button>
        </nav>

        {/* Mobile Nav Trigger */}
        <button
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-white/95 backdrop-blur-lg flex flex-col justify-center transition-all duration-300 ease-in-out md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center space-y-6 p-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300",
                  "transform hover:scale-105",
                  location.pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary",
                  isOpen ? "animate-fade-up" : "",
                  { "animation-delay-100": index % 6 === 1 },
                  { "animation-delay-200": index % 6 === 2 },
                  { "animation-delay-300": index % 6 === 3 },
                  { "animation-delay-400": index % 6 === 4 },
                  { "animation-delay-500": index % 6 === 5 }
                )}
                style={{
                  animationDelay: `${(index % 6) * 100}ms`
                }}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            <Button className="mt-4 w-full max-w-xs animate-fade-up" style={{ animationDelay: "600ms" }}>
              Book Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
