import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  ChevronDown,
  BookOpen,
  Trophy,
  Bell,
  ArrowRight,
  LogOut,
  Settings,
  Package,
  Gift,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useNavigation, useRouter } from './Router';
import { useAuth } from './auth/AuthContext';
import { AuthDialog } from './auth/AuthDialog';
import { useCart, useWishlist } from '../services/useApi';

export function Header() {
  const navigation = useNavigation();
  const { currentPage } = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Reset hover state when dropdown closes
  useEffect(() => {
    if (activeDropdown !== 'courses') {
      setIsHovering(false);
    }
  }, [activeDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown === 'courses') {
        const target = event.target as Element;
        const dropdownContainer = document.querySelector('.header-dropdown-container');
        const dropdownMenu = document.querySelector('.header-dropdown-menu');

        if (
          dropdownContainer &&
          dropdownMenu &&
          !dropdownContainer.contains(target) &&
          !dropdownMenu.contains(target)
        ) {
          setActiveDropdown('');
          setIsHovering(false);
          document.documentElement.style.removeProperty('--dropdown-top');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const megaMenuData = {
    'NEET Preparation': {
      sections: [
        {
          title: 'NEET Books',
          icon: '🏥',
          items: [
            'NEET AIR Gold Mine Combo',
            'Dr. Eklavya Perfect Combo',
            'Individual Subject Books',
            'NEET in 20 Minutes',
            'NCERT Feel Series',
            'Previous Year Papers',
          ],
        },
        {
          title: 'Subject-wise',
          icon: '📚',
          items: [
            'Biology Books',
            'Chemistry Books', 
            'Physics Books',
            'Complete Packages',
            'Quick Revision',
            'Question Banks',
          ],
        },
      ],
    },
    'JEE Preparation': {
      sections: [
        {
          title: 'JEE Books',
          icon: '⚙️',
          items: [
            'JEE Main Books',
            'JEE Advanced Books',
            'Physics for JEE',
            'Chemistry for JEE',
            'Mathematics for JEE',
            'Previous Papers',
          ],
        },
      ],
    },
    'UPSC Materials': {
      sections: [
        {
          title: 'UPSC Books',
          icon: '🎓',
          items: [
            'NCERT Nichod Geography',
            'NCERT Nichod Economics',
            'NCERT Nichod Polity',
            'History Books',
            'Complete UPSC Combo',
          ],
        },
      ],
    },
    'Study Tools': {
      sections: [
        {
          title: 'Charts & Tools',
          icon: '🛠️',
          items: [
            'Physics Formula Chart',
            'Biology Chart', 
            'Chemistry Charts',
            'Study Timer',
            '75 Hell Days Register',
            'Motivational Books',
          ],
        },
      ],
    },
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigation.goToSearch(searchTerm.trim());
      setSearchQuery('');
    }
  };

  const handleCartClick = () => {
    navigation.goToCart();
  };

  const handleWishlistClick = () => {
    navigation.goToWishlist();
  };

  const handleSignInClick = () => {
    setAuthMode('login');
    setShowAuthDialog(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('signup');
    setShowAuthDialog(true);
  };

  const handleLogoClick = () => {
    navigation.goToHome();
  };

  const handleAccountClick = () => {
    navigation.goToAccount();
  };

  const handleLogout = () => {
    logout();
    navigation.goToHome();
  };

  const handleExamClick = (examName: string) => {
    // Close the dropdown
    setActiveDropdown('');
    setIsHovering(false);
    document.documentElement.style.removeProperty('--dropdown-top');

    navigation.goToProducts({ category: examName });
  };

  const handleCategoryClick = (categoryName: string) => {
    // Close the dropdown
    setActiveDropdown('');
    setIsHovering(false);
    document.documentElement.style.removeProperty('--dropdown-top');

    navigation.goToCategories({ category: categoryName });
  };

  const handleMouseEnterDropdown = () => {
    setIsHovering(true);

    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }

    // Calculate and set the dropdown position
    const header = document.querySelector('header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--dropdown-top', `${headerHeight}px`);
    }

    setActiveDropdown('courses');
  };

  const handleMouseLeaveDropdown = () => {
    setIsHovering(false);

    // Add a small delay to allow users to move from trigger to dropdown
    const timeout = setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown('');
        // Clean up the CSS variable
        document.documentElement.style.removeProperty('--dropdown-top');
      }
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownClick = () => {
    const newState = activeDropdown === 'courses' ? '' : 'courses';

    if (newState === 'courses') {
      // Calculate and set the dropdown position
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--dropdown-top', `${headerHeight}px`);
      }
      setIsHovering(true);
    } else {
      setIsHovering(false);
      document.documentElement.style.removeProperty('--dropdown-top');
    }

    setActiveDropdown(newState);
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full">
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-primary/20'
            : 'bg-white shadow-md border-b border-primary/10'
        }`}
      >
        {/* Top Banner - Ultra-Vibrant Aqua Theme */}
        <div className="bg-gradient-to-r from-primary via-blue1 to-blue2 text-white py-2 w-full">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-sm font-medium">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">
                  🎉 MEGA SALE: Get up to 70% OFF on all NEET & JEE materials + FREE delivery | Use code: EDU70
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="ml-4 text-white hover:bg-white/20 flex-shrink-0 hidden sm:flex text-xs px-3 py-1"
                onClick={() => navigation.goToProducts()}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="w-full">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4 w-full">
              {/* Logo Section - Ultra-Vibrant Aqua Theme */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                <div
                  className="flex items-center space-x-3 cursor-pointer group"
                  onClick={handleLogoClick}
                >
                  <div className="bg-gradient-to-br from-primary via-blue1 to-blue2 rounded-2xl p-3 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                    <BookOpen className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent leading-tight">
                      EduMall
                    </h1>
                    <p className="text-xs lg:text-sm font-semibold text-muted-foreground -mt-1">
                      India Ka Edu Bazaar
                    </p>
                  </div>
                </div>
              </div>

              {/* Fixed Search Bar - Ultra-Vibrant Aqua Theme */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch(searchQuery);
                    }}
                    className="flex w-full"
                  >
                    <div className="flex w-full bg-white border-2 border-primary/30 rounded-xl overflow-hidden shadow-lg hover:border-primary/50 focus-within:border-primary transition-all">
                      {/* Categories Dropdown - Ultra-Vibrant Aqua Theme */}
                      <div className="relative flex items-center px-4 bg-lightBg border-r border-primary/30 min-w-[160px] max-w-[160px]">
                        <select 
                          className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer w-full pr-8 appearance-none"
                          style={{ 
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none'
                          }}
                        >
                          <option>All Categories</option>
                          <option>NEET Books</option>
                          <option>JEE Books</option>
                          <option>UPSC Materials</option>
                          <option>Charts</option>
                          <option>Study Tools</option>
                        </select>
                        {/* Custom Arrow */}
                        <ChevronDown className="absolute right-3 h-4 w-4 text-primary pointer-events-none" />
                      </div>
                      
                      {/* Search Input */}
                      <Input
                        type="text"
                        placeholder="Search authentic NEET, JEE, UPSC materials..."
                        className="flex-1 px-4 py-3 border-0 focus:ring-0 text-sm bg-white placeholder:text-muted-foreground min-w-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      
                      {/* Search Button - Ultra-Vibrant Aqua Theme */}
                      <Button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 rounded-none font-semibold text-white flex-shrink-0 min-w-[120px]"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-foreground hover:text-red-500 hover:bg-red-50/80 relative group font-medium"
                  onClick={handleWishlistClick}
                >
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline ml-2">Wishlist</span>
                  {wishlist && wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>

                {/* Cart - Ultra-Vibrant Aqua Theme */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-primary/10 relative group font-medium"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline ml-2">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white rounded-full">
                      {totalItems}
                    </Badge>
                  )}
                </Button>

                {/* Account Section - Ultra-Vibrant Aqua Theme */}
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-primary/10">
                        <Avatar className="h-9 w-9 border-2 border-primary/20">
                          <AvatarImage src="" alt={user.name} />
                          <AvatarFallback className="text-sm bg-gradient-to-br from-primary to-blue2 text-white font-bold">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline text-sm font-semibold text-foreground">
                          {user.name.split(' ')[0]}
                        </span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.mobile}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleAccountClick} className="py-2">
                        <User className="h-4 w-4 mr-3 text-primary" />
                        My Account
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigation.goToOrderTracking()} className="py-2">
                        <Package className="h-4 w-4 mr-3 text-green-600" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleWishlistClick} className="py-2">
                        <Heart className="h-4 w-4 mr-3 text-red-500" />
                        Wishlist
                      </DropdownMenuItem>
                      <DropdownMenuItem className="py-2">
                        <Gift className="h-4 w-4 mr-3 text-purple-600" />
                        Rewards & Offers
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="py-2">
                        <Settings className="h-4 w-4 mr-3 text-muted-foreground" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 py-2">
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hidden sm:flex text-sm px-4 py-2 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 font-medium text-primary"
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-sm px-4 py-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={handleRegisterClick}
                    >
                      <User className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Register</span>
                    </Button>
                  </div>
                )}

                {/* Mobile Menu */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile Search - Ultra-Vibrant Aqua Theme */}
            <div className="lg:hidden pb-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(searchQuery);
                }}
                className="flex w-full"
              >
                <div className="flex w-full bg-white border-2 border-primary/30 rounded-xl overflow-hidden shadow-lg">
                  <Input
                    type="text"
                    placeholder="Search NEET, JEE, UPSC materials..."
                    className="flex-1 px-4 py-3 border-0 focus:ring-0 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="px-4 rounded-none bg-gradient-to-r from-primary to-blue1 font-semibold flex-shrink-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-primary/20 z-50">
                <div className="container mx-auto px-4 py-6">
                  <div className="space-y-4">
                    {/* Authentication buttons for mobile */}
                    {!isAuthenticated && (
                      <>
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white font-semibold"
                          onClick={() => {
                            handleSignInClick();
                            setIsMenuOpen(false);
                          }}
                        >
                          <User className="h-5 w-5 mr-3" />
                          Sign In
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary font-semibold"
                          onClick={() => {
                            handleRegisterClick();
                            setIsMenuOpen(false);
                          }}
                        >
                          <User className="h-5 w-5 mr-3" />
                          Register
                        </Button>
                        <div className="h-px bg-gray-200 my-4"></div>
                      </>
                    )}
                    
                    {/* Wishlist for mobile */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        handleWishlistClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      <Heart className="h-5 w-5 mr-3 text-red-500" />
                      Wishlist
                      {wishlist && wishlist.length > 0 && (
                        <Badge className="ml-auto h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                          {wishlist.length}
                        </Badge>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        navigation.goToProducts();
                        setIsMenuOpen(false);
                      }}
                    >
                      <BookOpen className="h-5 w-5 mr-3" />
                      All Products
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        navigation.goToCategories();
                        setIsMenuOpen(false);
                      }}
                    >
                      <Trophy className="h-5 w-5 mr-3" />
                      Categories
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar - Ultra-Vibrant Aqua Theme */}
        <div className="border-t border-primary/20 bg-gradient-to-r from-lightBg via-white to-lightBg w-full">
          <div className="container mx-auto px-4">
            <nav className="hidden lg:flex items-center justify-between py-3 w-full">
              <div className="flex items-center space-x-6 flex-1">
                {/* All Categories Dropdown - Ultra-Vibrant Aqua Theme */}
                <div
                  className="header-dropdown-container relative group"
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    handleMouseEnterDropdown();
                  }}
                  onMouseLeave={(e) => {
                    e.preventDefault();
                    handleMouseLeaveDropdown();
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownClick();
                    }}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      handleMouseEnterDropdown();
                    }}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap text-sm ${
                      activeDropdown === 'courses'
                        ? 'text-white bg-gradient-to-r from-primary to-blue1 shadow-lg border border-primary/20 shadow-primary/20'
                        : 'text-foreground hover:text-primary hover:bg-white/80 hover:shadow-md border border-transparent'
                    }`}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    All Categories
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transform transition-all duration-200 ${
                        activeDropdown === 'courses' ? 'rotate-180' : 'text-muted-foreground'
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown - Ultra-Vibrant Aqua Theme */}
                  <div
                    className={`header-dropdown-menu transition-all duration-300 ease-out ${
                      activeDropdown === 'courses'
                        ? 'opacity-100 visible open'
                        : 'opacity-0 invisible closed pointer-events-none'
                    }`}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      handleMouseEnterDropdown();
                    }}
                    onMouseLeave={(e) => {
                      e.preventDefault();
                      handleMouseLeaveDropdown();
                    }}
                  >
                    <div className="header-dropdown-content bg-white border-2 border-primary/20 shadow-2xl">
                      <div className="flex">
                        {/* Main Menu Content */}
                        <div className="flex-1 grid grid-cols-4 gap-0">
                          {Object.entries(megaMenuData).map(
                            ([categoryName, categoryData], categoryIndex) => (
                              <div
                                key={categoryName}
                                className="p-8 border-r border-primary/10 last:border-r-0 hover:bg-lightBg transition-all"
                              >
                                {/* Category Header */}
                                <div className="mb-6">
                                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center">
                                    <span className="text-2xl mr-2">
                                      {categoryName.includes('NEET') ? '🏥' : 
                                       categoryName.includes('JEE') ? '⚙️' : 
                                       categoryName.includes('UPSC') ? '🎓' : '🛠️'}
                                    </span>
                                    {categoryName}
                                  </h3>
                                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-blue1 rounded-full"></div>
                                </div>

                                {/* Sections */}
                                <div className="space-y-6">
                                  {categoryData.sections.map((section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                      <div
                                        className="flex items-center text-foreground hover:text-primary cursor-pointer font-medium text-sm mb-3 group"
                                        onClick={() => handleCategoryClick(section.title)}
                                      >
                                        <span className="text-base mr-2">{section.icon}</span>
                                        {section.title}
                                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <ul className="space-y-2 ml-6">
                                        {section.items.map((item, itemIndex) => (
                                          <li key={itemIndex}>
                                            <button
                                              className="text-muted-foreground hover:text-primary text-xs block w-full text-left py-1 hover:bg-primary/5 px-2 rounded transition-all"
                                              onClick={() => handleExamClick(item)}
                                            >
                                              {item}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>

                                {/* Explore All Button */}
                                <div className="mt-8 pt-6 border-t border-primary/10">
                                  <Button
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white text-xs py-2 font-semibold"
                                    onClick={() => handleExamClick(categoryName)}
                                  >
                                    <BookOpen className="h-3 w-3 mr-2" />
                                    Explore All
                                  </Button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation Links - Ultra-Vibrant Aqua Theme */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                    onClick={() => navigation.goToProducts({ category: 'NEET' })}
                  >
                    <span className="mr-2">🏥</span>
                    NEET
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                    onClick={() => navigation.goToProducts({ category: 'JEE' })}
                  >
                    <span className="mr-2">⚙️</span>
                    JEE
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                    onClick={() => navigation.goToProducts({ category: 'UPSC' })}
                  >
                    <span className="mr-2">🎓</span>
                    UPSC
                  </Button>
                </div>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                  onClick={() => navigation.goToAbout()}
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                  onClick={() => navigation.goToContact()}
                >
                  Contact
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Authentication Dialog - Ultra-Vibrant Aqua Theme */}
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
        initialMode={authMode}
      />
    </div>
  );
}