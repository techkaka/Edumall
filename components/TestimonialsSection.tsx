import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Star, 
  Quote, 
  Users, 
  Trophy, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  TrendingUp
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    achievement: "NEET AIR 145",
    year: "2024",
    exam: "NEET",
    college: "AIIMS Delhi",
    rating: 5,
    image: "", // Will use initials
    testimonial: "The AIR Gold Mine series from EduMall was my game-changer! The content quality is exceptional and exactly what NEET demands. Got 680/720 marks!",
    products: ["AIR Gold Mine Combo", "NEET in 20 Minutes"],
    location: "Delhi",
    verified: true,
    category: "NEET Success",
    bgGradient: "from-lightBg to-white",
    accent: "primary"
  },
  {
    id: 2,
    name: "Rohit Kumar",
    achievement: "JEE Advanced AIR 89",
    year: "2024", 
    exam: "JEE",
    college: "IIT Bombay CSE",
    rating: 5,
    image: "",
    testimonial: "EduMall's study materials are incredibly well-structured. The Physics and Chemistry books helped me crack JEE Advanced with confidence. Worth every penny!",
    products: ["Complete JEE Package", "Previous Year Papers"],
    location: "Mumbai",
    verified: true,
    category: "JEE Success",
    bgGradient: "from-blue1/10 to-blue2/10", 
    accent: "blue2"
  },
  {
    id: 3,
    name: "Anjali Patel",
    achievement: "UPSC CSE Rank 47",
    year: "2023",
    exam: "UPSC",
    college: "IAS Officer",
    rating: 5,
    image: "",
    testimonial: "The NCERT Nichod series is pure gold! Comprehensive yet concise - exactly what UPSC preparation needs. Cleared prelims and mains both in first attempt!",
    products: ["UPSC NCERT Nichod Combo", "Geography Guide"],
    location: "Gujarat",
    verified: true,
    category: "UPSC Success",
    bgGradient: "from-blue2/10 to-blue3/10",
    accent: "blue3"
  },
  {
    id: 4,
    name: "Arjun Reddy",
    achievement: "NEET AIR 234",
    year: "2024",
    exam: "NEET", 
    college: "JIPMER",
    rating: 5,
    image: "",
    testimonial: "Dr. Eklavya Perfect Combo is absolutely perfect! 3500 pages of pure knowledge. The way concepts are explained makes even complex topics crystal clear.",
    products: ["Dr. Eklavya Perfect Combo", "Biology Charts"],
    location: "Hyderabad",
    verified: true,
    category: "NEET Success",
    bgGradient: "from-primary/10 to-blue1/10",
    accent: "primary"
  },
  {
    id: 5,
    name: "Sneha Iyer",
    achievement: "NEET AIR 67",
    year: "2024",
    exam: "NEET",
    college: "AIIMS Rishikesh", 
    rating: 5,
    image: "",
    testimonial: "The study tools and charts from EduMall made revision so effective! The 75 Hell Days Register kept me disciplined. Highly recommend to all aspirants!",
    products: ["Study Tools", "Physics Formula Chart", "Timer"],
    location: "Bangalore",
    verified: true,
    category: "NEET Success", 
    bgGradient: "from-blue1/10 to-blue2/10",
    accent: "blue1"
  },
  {
    id: 6,
    name: "Vikram Singh",
    achievement: "JEE Main 99.8 percentile",
    year: "2024",
    exam: "JEE",
    college: "NIT Trichy",
    rating: 5,
    image: "",
    testimonial: "JEET Ki Raneeti book changed my entire approach to preparation. The motivation and strategy tips are phenomenal. Cleared JEE Main with flying colors!",
    products: ["JEET Ki Raneeti", "JEE Question Banks"],
    location: "Rajasthan", 
    verified: true,
    category: "JEE Success",
    bgGradient: "from-blue2/10 to-blue3/10",
    accent: "blue2"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentIndex, currentIndex + itemsPerView);
  };

  const getAccentClasses = (accent: string) => {
    switch (accent) {
      case 'primary':
        return {
          bg: 'bg-gradient-to-br from-primary to-blue1',
          badge: 'bg-gradient-to-r from-primary to-blue1',
          button: 'bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2'
        };
      case 'blue1':
        return {
          bg: 'bg-gradient-to-br from-blue1 to-blue2',
          badge: 'bg-gradient-to-r from-blue1 to-blue2',
          button: 'bg-gradient-to-r from-blue1 to-blue2 hover:from-blue2 hover:to-blue3'
        };
      case 'blue2':
        return {
          bg: 'bg-gradient-to-br from-blue2 to-blue3',
          badge: 'bg-gradient-to-r from-blue2 to-blue3',
          button: 'bg-gradient-to-r from-blue2 to-blue3 hover:from-blue3 hover:to-blue4'
        };
      case 'blue3':
        return {
          bg: 'bg-gradient-to-br from-blue3 to-blue4',
          badge: 'bg-gradient-to-r from-blue3 to-blue4',
          button: 'bg-gradient-to-r from-blue3 to-blue4 hover:from-blue4 hover:to-primary'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-primary to-blue1',
          badge: 'bg-gradient-to-r from-primary to-blue1',
          button: 'bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2'
        };
    }
  };

  return (
    <section className="section-tight modern-gradient-bg relative overflow-hidden">
      {/* Ultra-Vibrant Aqua background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-32 h-32 bg-primary/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-blue1/5 rounded-full animate-bounce delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Ultra-Vibrant Aqua Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/15 to-blue1/15 rounded-full px-4 py-2 mb-4 border border-primary/20">
            <Trophy className="h-4 w-4 mr-2 text-primary" />
            <span className="text-primary font-bold text-sm">Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">
              Real Results
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-gray-800">from Real Students</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover how students achieved their dreams with EduMall materials
          </p>
        </div>

        {/* Compact Testimonials Carousel */}
        <div className="relative">
          {/* Compact Carousel Controls with Ultra-Vibrant Aqua Theme */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900">Student Success Stories</h3>
              <Badge className="bg-primary/10 text-primary border border-primary/20 font-semibold px-2 py-1 text-xs">
                ✅ Verified Results
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="hidden sm:flex text-xs px-2 py-1 border-primary/30 text-primary hover:bg-primary/10"
              >
                {isAutoPlaying ? '⏸️' : '▶️'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="w-8 h-8 p-0 rounded-full border-primary/30 text-primary hover:bg-primary/10"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="w-8 h-8 p-0 rounded-full border-primary/30 text-primary hover:bg-primary/10"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Ultra-Vibrant Aqua Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {getVisibleTestimonials().map((testimonial, index) => {
              const accentClasses = getAccentClasses(testimonial.accent);
              return (
                <Card
                  key={`${testimonial.id}-${currentIndex}`}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 border border-primary/20 shadow-md overflow-hidden bg-gradient-to-br ${testimonial.bgGradient}`}
                  onMouseEnter={() => setHoveredCard(testimonial.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0 h-full">
                    {/* Compact Header with Ultra-Vibrant Aqua Theme */}
                    <div className="p-4 bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback className={`${accentClasses.bg} text-white font-bold text-sm`}>
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                              {testimonial.verified && (
                                <Badge className="ml-1 bg-primary/10 text-primary border border-primary/20 text-xs px-1.5 py-0.5">
                                  ✅
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 font-medium">{testimonial.location}</p>
                          </div>
                        </div>
                        <Quote className="h-6 w-6 text-gray-300 group-hover:text-primary transition-colors" />
                      </div>

                      {/* Compact Achievement with Ultra-Vibrant Aqua Theme */}
                      <div className="bg-gradient-to-r from-white to-lightBg rounded-lg p-3 mb-3 border border-primary/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-black text-sm text-gray-900">{testimonial.achievement}</p>
                            <p className="text-xs text-gray-600 font-semibold">{testimonial.college}</p>
                          </div>
                          <Badge className={`${accentClasses.badge} text-white font-bold px-2 py-0.5 text-xs`}>
                            {testimonial.exam} {testimonial.year}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Compact Testimonial Content */}
                    <div className="p-4">
                      <blockquote className="text-gray-700 font-medium leading-relaxed mb-3 line-clamp-3 text-sm">
                        "{testimonial.testimonial}"
                      </blockquote>

                      {/* Compact Products Used with Ultra-Vibrant Aqua Theme */}
                      <div className="mb-3">
                        <p className="text-xs font-bold text-gray-800 mb-1">Products Used:</p>
                        <div className="flex flex-wrap gap-1">
                          {testimonial.products.slice(0, 2).map((product, idx) => (
                            <Badge
                              key={idx}
                              className="bg-white/80 text-primary border border-primary/20 font-medium text-xs px-1.5 py-0.5"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>


                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Ultra-Vibrant Aqua Carousel Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary to-blue1 w-6'
                    : 'bg-gray-300 hover:bg-primary/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Ultra-Vibrant Aqua Bottom CTA */}
        <div className="text-center mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-primary/20">
          <h3 className="text-2xl font-black text-gray-900 mb-3">
            Ready to Join Our <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">Success Stories?</span>
          </h3>
          <p className="text-base text-gray-600 mb-4 font-medium">
            Start your journey with authentic study materials for competitive exams
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 hover:shadow-xl transform hover:scale-105 transition-all font-bold px-6 py-3 text-base"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Start Your Success Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-3 text-base"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}