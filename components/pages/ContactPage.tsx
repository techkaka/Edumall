import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Customer Support',
      description: 'Call us for instant help',
      value: '+91 1800-123-EDUMAL (3386)',
      subtext: 'Mon-Sat: 9 AM - 9 PM IST',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed assistance',
      value: 'support@edumall.in',
      subtext: 'Response within 2 hours',
      color: 'text-blue1',
      bgColor: 'bg-blue1/10'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our experts',
      value: 'Available 24/7',
      subtext: 'Average response: 30 seconds',
      color: 'text-blue2',
      bgColor: 'bg-blue2/10'
    },
    {
      icon: MapPin,
      title: 'Visit Store',
      description: 'Physical store location',
      value: 'EduMall Delhi Hub',
      subtext: 'Connaught Place, New Delhi',
      color: 'text-blue3',
      bgColor: 'bg-blue3/10'
    }
  ];

  const faqData = [
    {
      question: 'How long does delivery take?',
      answer: 'We offer same-day delivery in metro cities and 2-3 day delivery across India. Express delivery available for urgent orders.'
    },
    {
      question: 'What if I receive a damaged book?',
      answer: 'We have a 7-day replacement policy for damaged items. Simply contact us with photos and we\'ll arrange an immediate replacement at no extra cost.'
    },
    {
      question: 'Do you offer bulk discounts for institutions?',
      answer: 'Yes! We provide special pricing for schools, colleges, and coaching institutes. Contact our B2B team for customized quotations.'
    },
    {
      question: 'Can I cancel my order after placing it?',
      answer: 'Orders can be cancelled within 1 hour of placing. After that, you can refuse delivery for a full refund as per our return policy.'
    },
    {
      question: 'Do you have test series for competitive exams?',
      answer: 'Absolutely! We offer comprehensive test series for NEET, JEE, UPSC, and other competitive exams with detailed analysis and performance tracking.'
    },
    {
      question: 'Is there a loyalty program?',
      answer: 'Yes, our EduMall Rewards program offers points on every purchase, early access to sales, and exclusive discounts for regular customers.'
    }
  ];

  return (
    <div className="min-h-screen modern-gradient-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section - Ultra-Vibrant Aqua Theme */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">24/7 Support Available</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our expert team. We're here to assist you with your educational journey.
          </p>
        </div>

        {/* Contact Methods Grid - Ultra-Vibrant Aqua Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="card-modern-bg border border-primary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/50`}>
                  <method.icon className={`h-8 w-8 ${method.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <p className={`font-semibold ${method.color} mb-1`}>{method.value}</p>
                <p className="text-xs text-gray-500">{method.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - Ultra-Vibrant Aqua Theme */}
          <Card className="card-modern-bg border border-primary/20 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-primary" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 2 hours during business hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="border-primary/30 focus:border-primary">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Related</SelectItem>
                          <SelectItem value="product">Product Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payment</SelectItem>
                          <SelectItem value="partnership">Business Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={5}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 shadow-xl transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section - Ultra-Vibrant Aqua Theme */}
          <div className="space-y-6">
            <Card className="card-modern-bg border border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions about our services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Office Hours - Ultra-Vibrant Aqua Theme */}
            <Card className="card-modern-bg border border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="font-medium">Phone Support</span>
                  <span className="text-gray-600">Mon-Sat: 9 AM - 9 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="font-medium">Live Chat</span>
                  <span className="text-green-600 font-medium">24/7 Available</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="font-medium">Email Support</span>
                  <span className="text-gray-600">24/7 (2hr response)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Store Visit</span>
                  <span className="text-gray-600">Mon-Sun: 10 AM - 8 PM</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact - Ultra-Vibrant Aqua Theme */}
        <div className="mt-16">
          <Card className="shadow-xl border border-red-200 bg-gradient-to-r from-red-50/50 to-pink-50/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Urgent Help?</h3>
              <p className="text-gray-600 mb-6">For urgent order issues or exam-related queries during peak season</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg transform hover:scale-105">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Hotline: 1800-EDUMAL-911
                </Button>
                <Badge className="bg-red-100 text-red-700 border border-red-200">Available 24/7 during exam seasons</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}