import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Zap,
  ChevronRight,
  Stethoscope,
  Settings,
  Crown,
} from "lucide-react";
import { useNavigation } from "./Router";
import { useCategories } from "../services/useApi";

export function CategoriesSection() {
  const navigation = useNavigation();
  const [hoveredCategory, setHoveredCategory] = useState<
    string | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);
  const { data: categories, loading, error } = useCategories();

  // Responsive logic to determine number of categories to show
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show 4 categories on mobile, 6 on desktop
  const maxCategories = isMobile ? 4 : 6;

  const handleCategoryClick = (categoryId: string) => {
    const category = categories?.find(
      (cat) => cat.id === categoryId,
    );
    if (category?.title) {
      navigation.goToProducts({
        category: category.title,
      });
    } else {
      navigation.goToCategories();
    }
  };

  const handleExploreAll = () => {
    navigation.goToCategories();
  };

  // Ultra-Vibrant Aqua themed icons
  const renderCategoryIcon = (
    iconName: string,
  ): React.ReactNode => {
    const iconProps = {
      className: "w-5 h-5 text-white",
      strokeWidth: 2,
    };

    // Use the actual icon from the category data if available
    if (iconName && iconName !== '📚') {
      // If it's a custom icon name, use the switch statement
      switch (iconName) {
        case "Stethoscope":
          return <Stethoscope {...iconProps} />;
        case "Settings":
          return <Settings {...iconProps} />;
        case "Crown":
          return <Crown {...iconProps} />;
        default:
          return <BookOpen {...iconProps} />;
      }
    }
    
    // Default to BookOpen icon
    return <BookOpen {...iconProps} />;
  };

  // Ultra-Vibrant Aqua theme background colors - Force consistent blue theme
  const getCategoryBackground = (
    categoryId: string,
  ): string => {
    // Force consistent blue background for all categories regardless of API data
    return "bg-gradient-to-br from-lightBg to-white";
  };

  const getCategoryGradient = (categoryId: string): string => {
    // Force consistent blue gradients regardless of API data
    const categoryIndex = categories?.findIndex(cat => cat.id === categoryId) || 0;
    
    // Consistent blue theme gradients matching CategoriesPage
    const blueGradients = [
      "from-primary to-blue1",      // 1st category
      "from-blue1 to-blue2",        // 2nd category  
      "from-blue2 to-blue3",        // 3rd category
      "from-blue3 to-blue4",        // 4th category (2nd row, 1st)
      "from-primary to-blue2",      // 5th category (2nd row, 2nd)
      "from-blue1 to-blue3",        // 6th category (2nd row, 3rd)
    ];
    
    return blueGradients[categoryIndex % blueGradients.length] || "from-primary to-blue1";
  };

  if (loading) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="w-16 h-16 border-4 border-blue1/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Loading Categories
            </h3>
            <p className="text-gray-600 text-sm">
              Fetching study categories...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Unable to load categories
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={handleExploreAll}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">
              📚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No categories available
            </h3>
            <p className="text-gray-600">
              Check back soon for study categories!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-tight modern-gradient-bg relative overflow-hidden">
      {/* Ultra-Vibrant Aqua background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-24 h-24 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-20 h-20 bg-blue1/5 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Ultra-Vibrant Aqua Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-blue1/10 rounded-full px-4 py-2 mb-4 border border-primary/20">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            <span className="text-primary font-bold text-sm">Study Categories</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">
              Choose Your Path to Success
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Authentic study materials for competitive exam preparation from EduMall
          </p>
        </div>

        {/* Ultra-Vibrant Aqua Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {categories.slice(0, maxCategories).map((category, index) => (
            <Card
              key={category.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 border-2 border-primary/30 overflow-hidden card-modern-bg ${
                hoveredCategory === category.id
                  ? "shadow-xl scale-105 border-primary/60 shadow-primary/20"
                  : "shadow-md hover:border-primary/50"
              }`}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() =>
                setHoveredCategory(category.id)
              }
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardContent className="p-0">
                {/* Ultra-Vibrant Aqua themed header */}
                <div
                  className={`relative p-6 ${getCategoryBackground(category.id)} overflow-hidden rounded-lg border-b border-primary/10`}
                >
                  {/* Vibrant ultra-vibrant aqua background pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-24 h-24 transform rotate-45 translate-x-8 -translate-y-8">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(category.id)} rounded-lg`}
                      ></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 transform -rotate-45 -translate-x-4 translate-y-4">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(category.id)} rounded-lg opacity-70`}
                      ></div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Ultra-Vibrant Aqua styled icons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Ultra-Vibrant Aqua icon container */}
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${getCategoryGradient(category.id)} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 border border-white/20`}
                        >
                          {renderCategoryIcon(category.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight truncate">
                            {category.title}
                          </h3>
                          <p className="text-sm font-medium text-gray-600 mt-0.5 truncate">
                            {category.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ultra-Vibrant Aqua bottom CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-blue1 to-blue2 hover:from-blue1 hover:via-blue2 hover:to-blue3 hover:shadow-xl transform hover:scale-105 transition-all font-bold px-8 py-3 text-base text-white shadow-lg"
            onClick={handleExploreAll}
          >
            <Zap className="h-4 w-4 mr-2" />
            Explore All Categories
            <TrendingUp className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-gray-600 mt-3 font-medium text-sm">
            Discover the complete range of study materials for your success
          </p>
        </div>
      </div>
    </section>
  );
}