import { useState, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  ChevronDown,
  X,
  BookOpen,
  Users,
  Award,
  Zap,
  Search,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useRouter, useNavigation } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function SearchPage() {
  const { params } = useRouter();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    authors: [] as string[],
    publishers: [] as string[],
    subjects: [] as string[],
    examTypes: [] as string[],
    ratings: [] as string[],
    availability: [] as string[]
  });

  const searchQuery = params.query || '';

  const searchResults = [
    {
      id: 1,
      title: 'NEET Biology Complete Study Guide 2025',
      author: 'Dr. R.K. Sharma',
      publisher: 'Academic Press',
      price: 1299,
      originalPrice: 1899,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      category: 'NEET',
      subject: 'Biology',
      examType: 'Medical',
      availability: 'In Stock',
      bestseller: true,
      discount: 32
    },
    {
      id: 2,
      title: 'JEE Advanced Mathematics Masterclass',
      author: 'Prof. A.K. Singh',
      publisher: 'Tech Publications',
      price: 1599,
      originalPrice: 2299,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=400',
      category: 'JEE',
      subject: 'Mathematics',
      examType: 'Engineering',
      availability: 'In Stock',
      bestseller: false,
      discount: 30
    },
    {
      id: 3,
      title: 'UPSC General Studies Paper 1 & 2',
      author: 'Dr. M.K. Pandey',
      publisher: 'Civil Service Publications',
      price: 899,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      category: 'UPSC',
      subject: 'General Studies',
      examType: 'Civil Services',
      availability: 'Limited Stock',
      bestseller: false,
      discount: 31
    },
    {
      id: 4,
      title: 'Organic Chemistry for NEET & JEE',
      author: 'Dr. S.N. Mishra',
      publisher: 'Chemistry Masters',
      price: 1099,
      originalPrice: 1499,
      rating: 4.6,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      category: 'Chemistry',
      subject: 'Organic Chemistry',
      examType: 'Medical, Engineering',
      availability: 'In Stock',
      bestseller: true,
      discount: 27
    },
    {
      id: 5,
      title: 'Physics Concepts and Applications',
      author: 'Prof. R.P. Gupta',
      publisher: 'Science Publications',
      price: 1399,
      originalPrice: 1999,
      rating: 4.4,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      category: 'Physics',
      subject: 'Physics',
      examType: 'Medical, Engineering',
      availability: 'In Stock',
      bestseller: false,
      discount: 30
    },
    {
      id: 6,
      title: 'English Grammar and Comprehension',
      author: 'Prof. K.L. Sharma',
      publisher: 'Language Masters',
      price: 699,
      originalPrice: 999,
      rating: 4.2,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      category: 'English',
      subject: 'English',
      examType: 'All Competitive Exams',
      availability: 'In Stock',
      bestseller: false,
      discount: 30
    }
  ];

  const filterOptions = {
    categories: ['NEET', 'JEE', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defense', 'State PSC'],
    authors: ['Dr. R.K. Sharma', 'Prof. A.K. Singh', 'Dr. M.K. Pandey', 'Dr. S.N. Mishra', 'Prof. R.P. Gupta'],
    publishers: ['Academic Press', 'Tech Publications', 'Civil Service Publications', 'Chemistry Masters', 'Science Publications'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'General Studies', 'Current Affairs'],
    examTypes: ['Medical', 'Engineering', 'Civil Services', 'Banking', 'Railway', 'Defense'],
    ratings: ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars'],
    availability: ['In Stock', 'Limited Stock', 'Pre-Order']
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'bestseller', label: 'Best Seller' }
  ];

  const handleFilterChange = (filterType: keyof typeof filters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));

    if (checked) {
      setAppliedFilters([...appliedFilters, value]);
    } else {
      setAppliedFilters(appliedFilters.filter(filter => filter !== value));
    }
  };

  const removeFilter = (filterValue: string) => {
    // Remove from all filter categories
    Object.keys(filters).forEach(key => {
      const filterKey = key as keyof typeof filters;
      setFilters(prev => ({
        ...prev,
        [filterKey]: prev[filterKey].filter(item => item !== filterValue)
      }));
    });
    setAppliedFilters(appliedFilters.filter(filter => filter !== filterValue));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      authors: [],
      publishers: [],
      subjects: [],
      examTypes: [],
      ratings: [],
      availability: []
    });
    setAppliedFilters([]);
    setPriceRange([0, 5000]);
  };

  const handleAddToCart = (bookId: number) => {
    // Find the book in search results
    const book = searchResults.find(b => b.id === bookId);
    if (book) {
      toast.success(`${book.title} added to cart!`);
    } else {
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const handleAddToWishlist = (bookId: number) => {
    // Add to wishlist functionality
  };

  const handleBackToHome = () => {
    navigation.goToHome();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header - No Duplicate Search Bar */}
        <div className="mb-8">
          {/* Breadcrumb and Back Navigation */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToHome}
              className="text-gray-600 hover:text-primary mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-sm text-gray-500">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Search Results</span>
              {searchQuery && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-700">"{searchQuery}"</span>
                </>
              )}
            </div>
          </div>

          {/* Search Results Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {searchQuery ? (
                    <>Search results for <span className="text-primary">"{searchQuery}"</span></>
                  ) : (
                    'All Products'
                  )}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    <span>{searchResults.length} books found</span>
                  </div>
                  {searchQuery && (
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Showing results for "{searchQuery}"</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{searchResults.length}</div>
                  <div className="text-xs text-gray-500">Total Books</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {searchResults.filter(book => book.availability === 'In Stock').length}
                  </div>
                  <div className="text-xs text-gray-500">In Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {searchResults.filter(book => book.bestseller).length}
                  </div>
                  <div className="text-xs text-gray-500">Bestsellers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Filters */}
          {appliedFilters.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium text-gray-700 mr-2">Applied Filters:</span>
              {appliedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-primary hover:text-primary/80 ml-2"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Controls Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {appliedFilters.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {appliedFilters.length}
                    </Badge>
                  )}
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Categories
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-4">
                      {filterOptions.categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleFilterChange('categories', category, checked as boolean)
                            }
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Authors */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Authors
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-4">
                      {filterOptions.authors.map((author) => (
                        <div key={author} className="flex items-center space-x-2">
                          <Checkbox
                            id={`author-${author}`}
                            checked={filters.authors.includes(author)}
                            onCheckedChange={(checked) => 
                              handleFilterChange('authors', author, checked as boolean)
                            }
                          />
                          <Label htmlFor={`author-${author}`} className="text-sm cursor-pointer">
                            {author}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Subjects */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold">
                      <span className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Subjects
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-4">
                      {filterOptions.subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={filters.subjects.includes(subject)}
                            onCheckedChange={(checked) => 
                              handleFilterChange('subjects', subject, checked as boolean)
                            }
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm cursor-pointer">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>



                  {/* Availability */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold">
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Availability
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-4">
                      {filterOptions.availability.map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`availability-${status}`}
                            checked={filters.availability.includes(status)}
                            onCheckedChange={(checked) => 
                              handleFilterChange('availability', status, checked as boolean)
                            }
                          />
                          <Label htmlFor={`availability-${status}`} className="text-sm cursor-pointer">
                            {status}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {searchResults.map((book) => (
                  <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white cursor-pointer transform hover:scale-105 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/20">
                        {/* MINIMAL: Clean image container */}
                        <div className="relative w-full h-44 overflow-hidden">
                          <ImageWithFallback
                            src={book.image} 
                            alt={book.title}
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        {/* Hide badges on mobile to prevent overflow, show on larger screens */}
                        <div className="hidden md:flex absolute top-3 left-3 flex-col gap-2">
                          {book.bestseller && (
                            <Badge className="bg-orange-500 hover:bg-orange-600">
                              Bestseller
                            </Badge>
                          )}
                          <Badge className="bg-green-600 hover:bg-green-700">
                            {book.discount}% OFF
                          </Badge>
                        </div>
                        {/* MINIMAL: Only wishlist button */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white/95 hover:bg-white hover:scale-105 transition-all border-gray-200 shadow-md"
                            onClick={() => handleAddToWishlist(book.id)}
                          >
                            <Heart className="h-3 w-3 text-gray-600 hover:text-red-500 transition-colors" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* ULTRA CLEAN: Minimal content area */}
                      <div className="p-4">
                        {/* CLEAN: Only title */}
                        <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {book.title}
                        </h3>

                        {/* CLEAN: Single line pricing with MRP strikethrough and % discount */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-black text-gray-900">
                              ₹{book.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{book.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-green-600 font-semibold">
                              {book.discount}% off
                            </span>
                          </div>
                        </div>

                        {/* MINIMAL: Only Add to Cart Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all font-bold py-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                          onClick={() => handleAddToCart(book.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="w-32 h-40 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                                {book.title}
                              </h3>
                              <p className="text-sm text-gray-500 mb-3">{book.publisher}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddToWishlist(book.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-4 mb-3">
                            {book.bestseller && (
                              <Badge className="bg-orange-500">Bestseller</Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-bold text-gray-900">₹{book.price}</span>
                            <span className="text-lg text-gray-500 line-through">₹{book.originalPrice}</span>
                            <Badge className="bg-green-600 text-white">{book.discount}% OFF</Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Badge 
                                variant={book.availability === 'In Stock' ? 'default' : 'secondary'}
                              >
                                {book.availability}
                              </Badge>
                            </div>
                            <Button onClick={() => handleAddToCart(book.id)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button variant="outline" disabled>Previous</Button>
              <Button className="bg-primary">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}