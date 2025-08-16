import { useState } from 'react';
import { Star, Heart, ShoppingCart, Share2, ArrowLeft, Truck, Shield, RotateCcw, Award, BookOpen, Calendar, User, Building, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter, useNavigation } from '../Router';
import { useAuth } from '../auth/AuthContext';

// Sample product data (in a real app, this would be fetched based on productId)
const getProductById = (id: number) => {
  const products = [
    {
      id: 1,
      title: "NCERT Physics Class 12",
      author: "NCERT",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 2156,
      category: "NEET",
      subject: "Physics",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: true,
      discount: 25,
      publisher: "NCERT",
      year: 2024,
      pages: 456,
      language: "English",
      type: "Textbook",
      isbn: "978-8174507892",
      weight: "650g",
      dimensions: "24 x 17 x 2.5 cm",
      description: "The NCERT Physics Class 12 textbook is an essential resource for students preparing for their board examinations and competitive exams like NEET and JEE. This comprehensive textbook covers all the fundamental concepts of physics in a clear and structured manner.",
      features: [
        "Updated syllabus as per CBSE guidelines",
        "Comprehensive coverage of all topics",
        "Practice questions at the end of each chapter",
        "Detailed explanations with diagrams",
        "Previous year questions included"
      ],
      tableOfContents: [
        "Chapter 1: Electric Charges and Fields",
        "Chapter 2: Electrostatic Potential and Capacitance",
        "Chapter 3: Current Electricity",
        "Chapter 4: Moving Charges and Magnetism",
        "Chapter 5: Magnetism and Matter",
        "Chapter 6: Electromagnetic Induction",
        "Chapter 7: Alternating Current",
        "Chapter 8: Electromagnetic Waves"
      ],
      inStock: true,
      stockCount: 45,
      deliveryTime: "2-3 days"
    },
    {
      id: 2,
      title: "JEE Main Mathematics",
      author: "R.D. Sharma",
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 1834,
      category: "JEE",
      subject: "Mathematics",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: false,
      discount: 25,
      publisher: "Dhanpat Rai",
      year: 2024,
      pages: 892,
      language: "English",
      type: "Textbook",
      isbn: "978-8174507893",
      weight: "1200g",
      dimensions: "24 x 17 x 4 cm",
      description: "The most comprehensive mathematics textbook for JEE Main preparation. This book covers all topics with detailed explanations and numerous solved examples.",
      features: [
        "Complete JEE Main syllabus coverage",
        "1000+ solved examples",
        "Chapter-wise practice exercises",
        "Previous year JEE questions",
        "Tips and tricks for quick solving"
      ],
      tableOfContents: [
        "Chapter 1: Sets, Relations and Functions",
        "Chapter 2: Complex Numbers",
        "Chapter 3: Quadratic Equations",
        "Chapter 4: Permutations and Combinations",
        "Chapter 5: Binomial Theorem",
        "Chapter 6: Sequences and Series",
        "Chapter 7: Coordinate Geometry",
        "Chapter 8: Trigonometry"
      ],
      inStock: true,
      stockCount: 32,
      deliveryTime: "2-3 days"
    },
    {
      id: 3,
      title: "Laxmikanth Polity",
      author: "M. Laxmikanth",
      price: 450,
      originalPrice: 550,
      rating: 4.9,
      reviews: 3421,
      category: "UPSC",
      subject: "Polity",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: true,
      discount: 18,
      publisher: "TMH",
      year: 2024,
      pages: 672,
      language: "English",
      type: "Reference",
      isbn: "978-8174507894",
      weight: "950g",
      dimensions: "24 x 17 x 3.5 cm",
      description: "The most trusted book for Indian Polity preparation for UPSC and other competitive exams. Covers the entire Constitution with latest amendments.",
      features: [
        "Updated with latest constitutional amendments",
        "Comprehensive coverage of Indian Polity",
        "Previous year UPSC questions",
        "Flowcharts and diagrams for clarity",
        "Chapter-wise summary for quick revision"
      ],
      tableOfContents: [
        "Chapter 1: Historical Background",
        "Chapter 2: Making of the Constitution",
        "Chapter 3: Salient Features",
        "Chapter 4: Preamble",
        "Chapter 5: Union and its Territory",
        "Chapter 6: Citizenship", 
        "Chapter 7: Fundamental Rights",
        "Chapter 8: Directive Principles"
      ],
      inStock: true,
      stockCount: 28,
      deliveryTime: "2-3 days"
    },
    {
      id: 4,
      title: "Quantitative Aptitude",
      author: "R.S. Aggarwal",
      price: 350,
      originalPrice: 450,
      rating: 4.6,
      reviews: 987,
      category: "Banking",
      subject: "Mathematics",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: false,
      discount: 22,
      publisher: "S Chand",
      year: 2024,
      pages: 584,
      language: "English",
      type: "Reference",
      isbn: "978-8174507895",
      weight: "750g",
      dimensions: "24 x 17 x 3 cm",
      description: "Complete guide for quantitative aptitude for banking and other competitive exams. Contains solved examples and practice questions.",
      features: [
        "Latest pattern questions",
        "Detailed solutions with shortcuts",
        "Topic-wise practice exercises",
        "Mock tests for self-assessment",
        "Time-saving techniques"
      ],
      tableOfContents: [
        "Chapter 1: Number System",
        "Chapter 2: Simplification",
        "Chapter 3: Average",
        "Chapter 4: Percentage",
        "Chapter 5: Profit and Loss",
        "Chapter 6: Ratio and Proportion",
        "Chapter 7: Time and Work",
        "Chapter 8: Time and Distance"
      ],
      inStock: true,
      stockCount: 67,
      deliveryTime: "2-3 days"
    },
    {
      id: 5,
      title: "GATE Computer Science",
      author: "Made Easy",
      price: 699,
      originalPrice: 899,
      rating: 4.5,
      reviews: 756,
      category: "GATE",
      subject: "Computer Science",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: false,
      discount: 22,
      publisher: "Made Easy Publications",
      year: 2024,
      pages: 1024,
      language: "English",
      type: "Reference",
      isbn: "978-8174507896",
      weight: "1400g",
      dimensions: "24 x 17 x 5 cm",
      description: "Comprehensive guide for GATE Computer Science and Engineering exam. Covers all topics with previous year solutions.",
      features: [
        "Complete GATE CS syllabus",
        "20 years solved papers",
        "Topic-wise questions",
        "Detailed explanations",
        "Mock test series included"
      ],
      tableOfContents: [
        "Chapter 1: Programming and Data Structures",
        "Chapter 2: Algorithms",
        "Chapter 3: Theory of Computation",
        "Chapter 4: Computer Organization",
        "Chapter 5: Operating Systems",
        "Chapter 6: Databases",
        "Chapter 7: Computer Networks",
        "Chapter 8: Digital Logic"
      ],
      inStock: true,
      stockCount: 23,
      deliveryTime: "2-3 days"
    },
    {
      id: 6,
      title: "SSC General Studies",
      author: "Lucent Publications",
      price: 199,
      originalPrice: 299,
      rating: 4.4,
      reviews: 1245,
      category: "SSC",
      subject: "General Studies",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bestseller: false,
      discount: 33,
      publisher: "Lucent Publications",
      year: 2024,
      pages: 456,
      language: "English",
      type: "Reference",
      isbn: "978-8174507897",
      weight: "600g",
      dimensions: "24 x 17 x 2.5 cm",
      description: "Complete general knowledge book for SSC and other competitive exams. Updated with latest facts and figures.",
      features: [
        "Latest current affairs",
        "Comprehensive GK coverage",
        "Previous year questions",
        "State-wise information",
        "Quick revision notes"
      ],
      tableOfContents: [
        "Chapter 1: History",
        "Chapter 2: Geography",
        "Chapter 3: Indian Polity",
        "Chapter 4: Economics",
        "Chapter 5: General Science",
        "Chapter 6: Current Affairs",
        "Chapter 7: Sports",
        "Chapter 8: Awards and Honors"
      ],
      inStock: true,
      stockCount: 89,
      deliveryTime: "2-3 days"
    }
  ];
  
  return products.find(p => p.id === id);
};

const relatedProducts = [
  {
    id: 2,
    title: "NCERT Chemistry Class 12",
    author: "NCERT",
    price: 325,
    originalPrice: 425,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "NCERT Biology Class 12",
    author: "NCERT",
    price: 275,
    originalPrice: 375,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent book for NEET preparation!",
    comment: "This book helped me understand complex physics concepts very easily. The explanations are clear and the diagrams are very helpful. Highly recommended for NEET aspirants!",
    verified: true,
    helpful: 23
  },
  {
    id: 2,
    name: "Arjun Patel",
    rating: 4,
    date: "2024-01-10",
    title: "Good content but could be better organized",
    comment: "The content is comprehensive and covers all topics well. However, I feel the organization could be improved. Some chapters feel a bit rushed while others are very detailed.",
    verified: true,
    helpful: 15
  },
  {
    id: 3,
    name: "Sneha Reddy",
    rating: 5,
    date: "2024-01-08",
    title: "Must-have for Class 12 Physics",
    comment: "Clear explanations, good examples, and excellent practice problems. This book made physics much easier to understand. The delivery was also very fast!",
    verified: true,
    helpful: 31
  }
];

export function ProductDetailPage() {
  const { pageData, goBack } = useRouter();
  const { goToProductDetail, goToCart } = useNavigation();
  const { user, isAuthenticated } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState(sampleReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  const product = getProductById(pageData?.productId || 1);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-4">
            Looking for product ID: {pageData?.productId || 'undefined'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            PageData: {JSON.stringify(pageData)}
          </p>
          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // In real app, multiple images

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.title} to cart`);
    alert(`${product.title} added to cart!\n\nQuantity: ${quantity}\nPrice: ₹${(product.price * quantity).toLocaleString()}`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${product.title}`);
    alert(`Redirecting to checkout...\n\nItem: ${product.title}\nQuantity: ${quantity}\nTotal: ₹${(product.price * quantity).toLocaleString()}`);
  };

  const handleShare = () => {
    console.log('Share product');
    alert(`Share ${product.title}\n\nThis would open share options for social media, email, etc.`);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please sign in to submit a review');
      return;
    }

    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in both title and comment');
      return;
    }

    setIsSubmittingReview(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newReview = {
      id: reviews.length + 1,
      name: user?.name || 'Anonymous User',
      rating: reviewForm.rating,
      date: new Date().toISOString().split('T')[0],
      title: reviewForm.title,
      comment: reviewForm.comment,
      verified: true,
      helpful: 0
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ rating: 0, title: '', comment: '' });
    setIsSubmittingReview(false);
    setReviewSubmitted(true);
    setShowReviewForm(false);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 5000);
  };

  const renderStarRating = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border shadow-sm overflow-hidden">
              <ImageWithFallback
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.bestseller && (
                  <Badge className="bg-red-500 text-white">
                    🏆 Bestseller
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>


            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <Badge className="bg-green-100 text-green-700">
                  {product.discount}% OFF
                </Badge>
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(product.originalPrice - product.price).toLocaleString()}
              </p>
            </div>

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stockCount} in stock)
                </span>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-blue-600"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Separator />

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-600">{product.deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-600">7 days policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="contents">Table of Contents</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About this book</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Pages</p>
                          <p className="text-gray-600">{product.pages}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Publication Year</p>
                          <p className="text-gray-600">{product.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-gray-600">{product.language}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Publisher</p>
                          <p className="text-gray-600">{product.publisher}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">ISBN</p>
                        <p className="text-gray-600">{product.isbn}</p>
                      </div>
                      <div>
                        <p className="font-medium">Dimensions</p>
                        <p className="text-gray-600">{product.dimensions}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contents" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
                  <div className="space-y-3">
                    {product.tableOfContents.map((chapter, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-primary font-medium min-w-[2rem]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-gray-900">{chapter}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {renderStarRating(Math.floor(product.rating))}
                        </div>
                        <p className="text-gray-600">Based on {product.reviews.toLocaleString()} reviews</p>
                      </div>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-yellow-400 rounded-full" 
                                style={{ 
                                  width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {rating === 5 ? '60%' : rating === 4 ? '25%' : rating === 3 ? '10%' : rating === 2 ? '3%' : '2%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Submission Success */}
                {reviewSubmitted && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-900">Review Submitted Successfully!</h4>
                          <p className="text-sm text-green-700">Thank you for your feedback. Your review will help other customers.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Write Review Button/Form */}
                {!showReviewForm ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Share Your Experience</h3>
                        <p className="text-gray-600 mb-4">Help other customers by writing a review</p>
                        <Button 
                          onClick={() => setShowReviewForm(true)}
                          className="bg-gradient-to-r from-primary to-blue-600"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Write a Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating *</label>
                          <div className="flex items-center gap-2">
                            {renderStarRating(reviewForm.rating, true, (rating) => 
                              setReviewForm({...reviewForm, rating})
                            )}
                            <span className="text-sm text-gray-600 ml-2">
                              {reviewForm.rating > 0 ? `${reviewForm.rating}/5` : 'Select rating'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Review Title *</label>
                          <Input
                            value={reviewForm.title}
                            onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                            placeholder="Give your review a title"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Your Review *</label>
                          <Textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                            placeholder="Share your thoughts about this book..."
                            rows={4}
                            required
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            type="submit" 
                            disabled={isSubmittingReview}
                            className="bg-gradient-to-r from-primary to-blue-600"
                          >
                            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowReviewForm(false)}
                            disabled={isSubmittingReview}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={review.name} />
                            <AvatarFallback className="text-sm bg-primary text-white">
                              {getUserInitials(review.name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs">Verified Purchase</Badge>
                              )}
                              <span className="text-sm text-gray-500">• {review.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              {renderStarRating(review.rating)}
                              <span className="font-medium">{review.title}</span>
                            </div>
                            
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <button className="hover:text-primary">
                                👍 Helpful ({review.helpful})
                              </button>
                              <button className="hover:text-primary">
                                Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card 
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => goToProductDetail(relatedProduct.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{relatedProduct.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">by {relatedProduct.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{relatedProduct.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{relatedProduct.originalPrice}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}