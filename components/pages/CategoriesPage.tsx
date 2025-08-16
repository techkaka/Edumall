import React, { useState } from 'react';
import { useRouter, useNavigation } from '../Router';
import { Card, CardContent } from '../ui/card';
import {
  BookOpen,
  Target,
  Crown,
  Stethoscope,
  Settings,
  BarChart3,
  Wrench,
  Lightbulb,
  Package,
  ChevronRight,
} from 'lucide-react';

export function CategoriesPage() {
  const { pageData } = useRouter();
  const { goToProducts } = useNavigation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const categories = [
    { 
      id: 'featured-combos',
      name: 'Featured Combos', 
      color: 'from-primary to-blue1',
      bgColor: 'from-lightBg to-white',
      description: 'Complete study packages with maximum savings',
      icon: 'Target'
    },
    { 
      id: 'individual-books',
      name: 'Individual Books', 
      color: 'from-blue1 to-blue2',
      bgColor: 'from-blue1/10 to-blue2/10',
      description: 'Subject-wise books for focused preparation',
      icon: 'BookOpen'
    },
    { 
      id: 'upsc',
      name: 'UPSC', 
      color: 'from-blue2 to-blue3',
      bgColor: 'from-blue2/10 to-blue3/10',
      description: 'NCERT Nichod series for civil services',
      icon: 'Crown'
    },
    { 
      id: 'ncert-word-to-word',
      name: 'NCERT Word-to-Word', 
      color: 'from-blue3 to-blue4',
      bgColor: 'from-blue3/10 to-blue4/10',
      description: 'Complete NCERT coverage books',
      icon: 'BookOpen'
    },
    { 
      id: 'charts',
      name: 'Charts', 
      color: 'from-primary to-blue2',
      bgColor: 'from-primary/10 to-blue2/10',
      description: 'Formula charts and visual aids',
      icon: 'BarChart3'
    },
    { 
      id: 'tools-registers',
      name: 'Tools & Registers', 
      color: 'from-blue1 to-blue3',
      bgColor: 'from-blue1/10 to-blue3/10',
      description: 'Study tools, registers and practice material',
      icon: 'Wrench'
    },
    { 
      id: 'motivational',
      name: 'Motivational', 
      color: 'from-blue2 to-blue4',
      bgColor: 'from-blue2/10 to-blue4/10',
      description: 'Strategy guides and motivational books',
      icon: 'Lightbulb'
    },
    { 
      id: 'tool-combos',
      name: 'Tool Combos', 
      color: 'from-blue3 to-primary',
      bgColor: 'from-blue3/10 to-primary/10',
      description: 'Combined study tools and packages',
      icon: 'Package'
    }
  ];

  const renderCategoryIcon = (iconName: string): React.ReactNode => {
    const iconProps = {
      className: "w-5 h-5 text-white",
      strokeWidth: 2,
    };

    switch (iconName) {
      case "Target":
        return <Target {...iconProps} />;
      case "BookOpen":
        return <BookOpen {...iconProps} />;
      case "Crown":
        return <Crown {...iconProps} />;
      case "BarChart3":
        return <BarChart3 {...iconProps} />;
      case "Wrench":
        return <Wrench {...iconProps} />;
      case "Lightbulb":
        return <Lightbulb {...iconProps} />;
      case "Package":
        return <Package {...iconProps} />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen modern-gradient-bg relative overflow-hidden">
      {/* Ultra-Vibrant Aqua background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-24 h-24 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-20 h-20 bg-blue1/5 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">
              {pageData?.category ? `${pageData.category} Category` : 'Study Material Categories'}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Premium preparation materials for competitive examinations from EduMall
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 border border-primary/20 overflow-hidden card-modern-bg ${
                hoveredCategory === category.id
                  ? "shadow-xl scale-105 border-primary/40"
                  : "shadow-md"
              }`}
              onClick={() => goToProducts({ category: category.name })}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardContent className="p-0">
                {/* Ultra-Vibrant Aqua themed header with icons */}
                <div
                  className={`relative p-6 bg-gradient-to-br ${category.bgColor} overflow-hidden rounded-lg border-b border-primary/10`}
                >
                  {/* Subtle ultra-vibrant aqua background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${category.color} rounded-lg`}
                      ></div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Ultra-Vibrant Aqua themed icon container */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Ultra-Vibrant Aqua icon container */}
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 border border-white/20`}
                        >
                          {renderCategoryIcon(category.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight truncate">
                            {category.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-600 mt-0.5 truncate">
                            {category.description}
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
      </div>
    </div>
  );
}