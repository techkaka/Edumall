import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, ExternalLink, Award, Shield, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useNavigation } from './Router';

export function Footer() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubscribe = () => {
    if (!email) {
      alert('Please enter your email address!');
      return;
    }
    
    console.log(`📧 Newsletter subscription: ${email}`);
    setIsSubscribed(true);
    alert(`Thank you for subscribing! 🎉\\n\\nWe'll send exam tips and exclusive deals to ${email}`);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const handleSocialClick = (platform: string) => {
    console.log(`📱 Social media click: ${platform}`);
    alert(`Opening EduMall's ${platform} page!\\n\\nFollow us for daily study tips and updates. 📚`);
  };

  const handleContactClick = (type: string, value: string) => {
    console.log(`📞 Contact click: ${type} - ${value}`);
    
    switch (type) {
      case 'phone':
        alert(`📞 Call us at ${value}\\n\\nOur customer support is available:\\n• Mon-Sat: 9 AM - 8 PM\\n• Sunday: 10 AM - 6 PM`);
        break;
      case 'email':
        alert(`📧 Email us at ${value}\\n\\nWe typically respond within 24 hours!\\nFor urgent queries, please call our helpline.`);
        break;
      case 'location':
        alert(`📍 Visit our office in ${value}\\n\\nEduMall Headquarters\\nConnaught Place, New Delhi\\n\\nOpen Mon-Sat: 10 AM - 7 PM`);
        break;
    }
  };

  const handleQuickLinkClick = (link: string) => {
    switch (link) {
      case 'About Us':
        navigation.goToAbout();
        break;
      case 'Contact Us':
        navigation.goToContact();
        break;
      case 'Track Your Order':
        navigation.goToOrderTracking();
        break;
      default:
        console.log(`🔗 Quick link clicked: ${link}`);
        alert(`${link} page - Coming soon!`);
    }
  };

  const handleExamCategoryClick = (category: string) => {
    if (category === 'All Categories') {
      navigation.goToCategories();
    } else {
      // Extract the category name (e.g., "NEET" from "NEET Books")
      const categoryName = category.split(' ')[0];
      navigation.goToProducts(categoryName);
    }
  };

  const handleCustomerServiceClick = (service: string) => {
    console.log(`💁‍♀️ Customer service clicked: ${service}`);
    
    const serviceInfo: {[key: string]: string} = {
      'Help & FAQ': 'Find answers to common questions about orders, delivery, and returns.',
      'Shipping Info': 'Free delivery on orders above ₹499. Express delivery available.',
      'Return Policy': '7-day easy returns. No questions asked if books are in original condition.',
      'Privacy Policy': 'Your data is secure with us. We never share personal information.',
      'Terms & Conditions': 'Read our terms of service and usage policies.',
      'Refund Policy': 'Get full refund within 7 days of purchase for damaged books.',
      'Student Support': '24/7 academic support and guidance from our expert team.'
    };
    
    alert(`${service}\\n\\n${serviceInfo[service] || 'This would open the ' + service + ' page.'}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Enhanced Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Stay Updated with Exam Tips & Exclusive Deals
            </h3>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter and get the latest study tips, exam updates, and special offers directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubscribe()}
                className="bg-white text-gray-900 border-0 placeholder:text-gray-500"
              />
              <Button 
                variant="secondary" 
                className={`bg-white hover:bg-gray-100 transition-all ${
                  isSubscribed ? 'bg-green-500 text-white' : 'text-primary'
                }`}
                onClick={handleNewsletterSubscribe}
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>✓ Subscribed!</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>
            {isSubscribed && (
              <p className="text-blue-100 mt-3 animate-fadeInUp">
                🎉 Welcome to the EduMall family! Check your email for a welcome gift.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Company Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">📚 EduMall</h2>
                <p className="text-gray-400">
                  Your trusted partner in competitive exam preparation. We provide quality study materials to help you achieve your dreams.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <Award className="h-3 w-3 mr-1" />
                    98% Success Rate
                  </Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Trusted by 5M+
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors w-full text-left"
                  onClick={() => handleContactClick('phone', '1800-123-4567')}
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>1800-123-4567 (Toll Free)</span>
                </button>
                <button 
                  className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors w-full text-left"
                  onClick={() => handleContactClick('email', 'support@edustore.com')}
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@edustore.com</span>
                </button>
                <button 
                  className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors w-full text-left"
                  onClick={() => handleContactClick('location', 'Delhi, India')}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Delhi, India</span>
                </button>
              </div>

              <div className="flex space-x-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-10 h-10 p-0 border-gray-600 hover:border-primary hover:scale-110 transition-all"
                  onClick={() => handleSocialClick('Facebook')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-10 h-10 p-0 border-gray-600 hover:border-primary hover:scale-110 transition-all"
                  onClick={() => handleSocialClick('Twitter')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-10 h-10 p-0 border-gray-600 hover:border-primary hover:scale-110 transition-all"
                  onClick={() => handleSocialClick('Instagram')}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-10 h-10 p-0 border-gray-600 hover:border-primary hover:scale-110 transition-all"
                  onClick={() => handleSocialClick('YouTube')}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Interactive Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Contact Us', 'Track Your Order', 'Bulk Orders', 'Affiliate Program', 'Career', 'Blog'].map((link) => (
                  <li key={link}>
                    <button 
                      className="text-gray-400 hover:text-primary transition-colors text-left w-full flex items-center group"
                      onClick={() => handleQuickLinkClick(link)}
                    >
                      {link}
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Exam Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Exam Categories</h3>
              <ul className="space-y-3">
                {['NEET Books', 'JEE Preparation', 'UPSC Materials', 'Banking Exams', 'SSC Preparation', 'GATE Books', 'All Categories'].map((category) => (
                  <li key={category}>
                    <button 
                      className="text-gray-400 hover:text-primary transition-colors text-left w-full flex items-center group"
                      onClick={() => handleExamCategoryClick(category)}
                    >
                      {category}
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
              <ul className="space-y-3">
                {['Help & FAQ', 'Shipping Info', 'Return Policy', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Student Support'].map((service) => (
                  <li key={service}>
                    <button 
                      className="text-gray-400 hover:text-primary transition-colors text-left w-full flex items-center group"
                      onClick={() => handleCustomerServiceClick(service)}
                    >
                      {service}
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Enhanced Bottom Footer */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EduMall. All rights reserved. | Empowering students since 2020 💪
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Secure Payments:
              </span>
              <div className="flex items-center space-x-3">
                <button 
                  className="text-xs bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => alert("Razorpay - India's most trusted payment gateway!")}
                >
                  Razorpay
                </button>
                <button 
                  className="text-xs bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => alert('PayU - Secure payment processing!')}
                >
                  PayU
                </button>
                <button 
                  className="text-xs bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => alert('UPI - Pay instantly with any UPI app!')}
                >
                  UPI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}