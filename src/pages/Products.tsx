
import { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Product categories
const categories = [
  { id: "all", name: "All Products" },
  { id: "henna", name: "Henna Products" },
  { id: "nail", name: "Nail Art" },
  { id: "kits", name: "DIY Kits" },
];

// Product data
const products = [
  {
    id: 1,
    name: "Premium Natural Henna Powder",
    description: "High-quality natural henna powder for vibrant color and long-lasting results.",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593301685108-522cc4e8a775?w=500&auto=format&fit=crop&q=80",
    category: "henna",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Professional Henna Cones (Set of 5)",
    description: "Ready-to-use professional henna cones for precise application and detailed designs.",
    price: 18.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600423115367-87ea7661688f?w=500&auto=format&fit=crop&q=80",
    category: "henna"
  },
  {
    id: 3,
    name: "Organic Essential Oil Blend",
    description: "Special blend of essential oils to enhance henna staining and provide a pleasant aroma.",
    price: 12.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80",
    category: "henna",
    badge: "Organic"
  },
  {
    id: 4,
    name: "Deluxe Nail Art Brush Set",
    description: "Professional-grade brushes in various sizes for creating detailed nail art designs.",
    price: 29.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1575998013359-2ca0df916b5c?w=500&auto=format&fit=crop&q=80",
    category: "nail",
    badge: "Premium"
  },
  {
    id: 5,
    name: "Nail Art Stamping Kit",
    description: "Complete kit with plates, stamper, and scraper for creating perfect nail art patterns.",
    price: 35.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&auto=format&fit=crop&q=80",
    category: "nail"
  },
  {
    id: 6,
    name: "Rhinestone and Decoration Set",
    description: "Assorted nail decorations including rhinestones, studs, and glitter for 3D nail art.",
    price: 15.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=500&auto=format&fit=crop&q=80",
    category: "nail"
  },
  {
    id: 7,
    name: "Beginner's Mehndi Kit",
    description: "Everything needed to start practicing mehndi art, including stencils and instructions.",
    price: 39.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583917024328-a113a5a6f089?w=500&auto=format&fit=crop&q=80",
    category: "kits",
    badge: "Beginner Friendly"
  },
  {
    id: 8,
    name: "Advanced Nail Art DIY Kit",
    description: "Complete set for creating salon-quality nail art designs at home.",
    price: 49.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1632345595182-3e66211ae36d?w=500&auto=format&fit=crop&q=80",
    category: "kits",
    badge: "New"
  }
];

const ProductsPage = () => {
  const { toast } = useToast();
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  const [headerVisible, setHeaderVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

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

    const productsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProductsVisible(true);
          productsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (productsRef.current) productsObserver.observe(productsRef.current);

    return () => {
      headerObserver.disconnect();
      productsObserver.disconnect();
    };
  }, []);

  const filteredProducts = currentCategory === "all" 
    ? products 
    : products.filter(product => product.category === currentCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

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
                  Our Store
                </div>
              </div>
              <h1 className="heading-lg mb-6">Quality Products for Beauty Enthusiasts</h1>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                Discover our carefully curated collection of premium mehndi supplies and nail art products
                to elevate your beauty routine or creative practice.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section ref={productsRef} className="section">
          <div className="container-wide">
            <Tabs 
              defaultValue="all" 
              value={currentCategory}
              onValueChange={setCurrentCategory}
              className="w-full"
            >
              <div className="flex justify-center mb-12">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className={cn(
                        "transition-all duration-500",
                        productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      )}
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={currentCategory}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Card 
                      key={product.id}
                      className={cn(
                        "group overflow-hidden border shadow-sm hover:shadow-md transition-all duration-500",
                        productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      )}
                      style={{ transitionDelay: `${(index % 8) * 100}ms` }}
                    >
                      <div className="relative h-56 overflow-hidden">
                        {product.badge && (
                          <Badge className="absolute top-2 right-2 z-10">{product.badge}</Badge>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-3.5 w-3.5", 
                                  i < Math.floor(product.rating) 
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                )} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="group-hover:bg-primary group-hover:text-white transition-colors"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Shopping Info Section */}
        <section className="section bg-secondary/10">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on all orders over $50. Expedited options available.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                    <path d="M16.5 9.4 7.55 4.24"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                    <circle cx="18.5" cy="15.5" r="2.5"></circle>
                    <path d="M20.27 17.27 22 19"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  All our products are carefully tested to ensure the highest quality and satisfaction.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m9 11-6 6v3h9l3-3"></path>
                    <path d="m22 12-4.2 4.2a1 1 0 0 1-1.4 0l-3.6-3.6a1 1 0 0 0-1.4 0l-.8.8"></path>
                    <circle cx="16.5" cy="7.5" r="2.5"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is available to answer questions and provide usage guidance for all products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial/CTA Section */}
        <section className="section bg-primary/5">
          <div className="container-tight">
            <div className="text-center mb-8">
              <h2 className="heading-md mb-4">What Our Customers Say</h2>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                  />
                ))}
              </div>
              <blockquote className="text-lg italic max-w-2xl mx-auto mb-4">
                "The premium henna powder gave me the most vibrant color I've ever achieved. 
                All the products I've tried from Mehndi Magic have exceeded my expectations in quality."
              </blockquote>
              <p className="font-medium">— Priya S., Verified Customer</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="group">
                Shop All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                View Bestsellers
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
