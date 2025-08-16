import { Award, Users, BookOpen, Target, Heart, Zap, Shield, Globe, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useNavigation } from '../Router';
import { IMAGEKIT_URLS } from '../../utils/productData';

const stats = [
  { icon: Users, number: "5M+", label: "Happy Students", color: "text-primary" },
  { icon: BookOpen, number: "50K+", label: "Study Materials", color: "text-blue1" },
  { icon: Award, number: "98.5%", label: "Success Rate", color: "text-blue2" },
  { icon: Globe, number: "500+", label: "Cities Served", color: "text-blue3" }
];

const values = [
  {
    icon: Target,
    title: "Quality Education",
    description: "We believe every student deserves access to high-quality study materials that can transform their learning journey.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Heart,
    title: "Student Success",
    description: "Our primary focus is on student success. Every decision we make is centered around helping students achieve their goals.",
    color: "bg-blue1/10 text-blue1"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly innovate to provide better learning experiences and stay ahead in educational technology.",
    color: "bg-blue2/10 text-blue2"
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We maintain the highest standards of integrity and build trust through transparent and honest practices.",
    color: "bg-blue3/10 text-blue3"
  }
];

const timeline = [
  {
    year: "2020",
    title: "Foundation",
    description: "EduMall was founded with a vision to democratize access to quality educational resources for competitive exam preparation."
  },
  {
    year: "2021",
    title: "1M Students",
    description: "Reached our first million students and expanded our catalog to include digital study materials and test series."
  },
  {
    year: "2022",
    title: "Expert Network",
    description: "Built a network of top educators and IIT/AIIMS alumni to provide mentorship and guidance to students."
  },
  {
    year: "2023",
    title: "Technology Revolution",
    description: "Launched our AI-powered recommendation system and mobile app, making learning more personalized and accessible."
  },
  {
    year: "2024",
    title: "5M+ Community",
    description: "Proud to serve over 5 million students across India with the most comprehensive collection of study materials."
  }
];

export function AboutPage() {
  const { goToContact, goToProducts } = useNavigation();

  return (
    <div className="min-h-screen modern-gradient-bg">
      {/* Hero Section - Ultra-Vibrant Aqua Theme */}
      <section className="bg-gradient-to-br from-lightBg via-white to-blue1/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border border-primary/20 mb-4">About EduMall</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Empowering Dreams Through
              <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">
                {" "}Quality Education
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Since 2020, we've been India's most trusted platform for competitive exam preparation, 
              helping millions of students achieve their dreams with carefully curated study materials 
              and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => goToProducts()}
                className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 shadow-xl transform hover:scale-105"
              >
                Explore Our Books
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => goToContact()}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg transform hover:scale-105"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border border-primary/20 shadow-lg card-modern-bg">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-lightBg mb-4`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To democratize access to quality educational resources and make competitive exam 
                preparation affordable, accessible, and effective for every student in India.
              </p>
              <p className="text-gray-600 mb-8">
                We believe that with the right resources and guidance, every student can achieve 
                their dreams. That's why we've built a platform that brings together the best 
                study materials, expert guidance, and innovative technology to create an 
                unparalleled learning experience.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.9/5 Student Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                  <span className="text-sm font-medium">98.5% Success Rate</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue2/20 rounded-2xl overflow-hidden border border-primary/20">
                {/* Replace placeholder with authentic product image */}
                <ImageWithFallback
                  src={IMAGEKIT_URLS.COMPLETE_BIOLOGY_PACKAGE}
                  alt="EduMall Study Materials"
                  className="w-full h-full object-contain p-8"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-primary/20">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5M+</p>
                  <p className="text-sm text-gray-600">Students Trust Us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to student success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border border-primary/20 shadow-lg card-modern-bg">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.color} mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup to India's leading education platform - here's how we've grown.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue1 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{item.year}</span>
                    </div>
                  </div>
                  <Card className="flex-1 card-modern-bg border border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Featured Study Materials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Authentic study materials trusted by millions of NEET and JEE aspirants across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "NEET Gold Mine Combo", image: IMAGEKIT_URLS.DWAR_JKR_COMBO },
              { name: "Complete Biology Package", image: IMAGEKIT_URLS.COMPLETE_BIOLOGY_PACKAGE },
              { name: "NCERT Feel Series", image: IMAGEKIT_URLS.NCERT_FEEL_BIOLOGY },
              { name: "Zero Error PYQs", image: IMAGEKIT_URLS.ZERO_ERROR_PYQS }
            ].map((product, index) => (
              <Card key={index} className="text-center border border-primary/20 shadow-lg card-modern-bg cursor-pointer">
                <CardContent className="p-6">
                  <div className="relative mb-4 h-40 bg-lightBg rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600">Trusted by thousands of students</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra-Vibrant Aqua Theme */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue2">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Success Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of students who trust EduMall for their competitive exam preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => goToProducts()}
              className="bg-white text-primary hover:bg-lightBg shadow-xl transform hover:scale-105"
            >
              Browse Books
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => goToContact()}
              className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl transform hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}