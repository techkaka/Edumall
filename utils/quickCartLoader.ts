/**
 * Quick Cart Loader - Direct localStorage injection for testing
 * This will definitely add working cart items to your EduMall cart
 */

// Sample cart items that match the exact CartItem structure expected by the API
const sampleCartItems = [
  {
    productId: 1,
    quantity: 1,
    product: {
      id: 1,
      title: "NEET Physics Complete Study Guide",
      author: "Dr. Physics Expert",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 1245,
      category: "NEET",
      subject: "Physics",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop",
      bestseller: true,
      discount: 31,
      publisher: "EduMall Publications",
      year: 2024,
      pages: 680,
      language: "English",
      type: "Physical Book",
      stock: 25
    }
  },
  {
    productId: 7,
    quantity: 2,
    product: {
      id: 7,
      title: "JEE Main Mathematics Practice Book",
      author: "Prof. Math Guru",
      price: 699,
      originalPrice: 999,
      rating: 4.7,
      reviews: 892,
      category: "JEE",
      subject: "Mathematics",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      bestseller: true,
      discount: 30,
      publisher: "JEE Academy Press",
      year: 2024,
      pages: 545,
      language: "English",
      type: "Physical Book",
      stock: 18
    }
  },
  {
    productId: 15,
    quantity: 1,
    product: {
      id: 15,
      title: "UPSC General Studies Manual",
      author: "IAS Study Group",
      price: 1299,
      originalPrice: 1799,
      rating: 4.9,
      reviews: 567,
      category: "UPSC",
      subject: "General Studies",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      bestseller: true,
      discount: 28,
      publisher: "Civil Services Hub", 
      year: 2024,
      pages: 890,
      language: "English",
      type: "Physical Book",
      stock: 12
    }
  }
];

// Function to directly add cart items to localStorage
export const loadSampleCartItems = (): boolean => {
  try {
    // Store with exact key used by completeRealApi
    localStorage.setItem('edumall_cart', JSON.stringify(sampleCartItems));
    
    // Trigger storage event to update any cart listeners
    window.dispatchEvent(new Event('storage'));
    
    console.log('✅ Sample cart items loaded successfully!');
    console.log('📦 Cart now contains:', sampleCartItems.length, 'items');
    console.log('💰 Total value: ₹' + sampleCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString());
    
    return true;
  } catch (error) {
    console.error('❌ Failed to load sample cart items:', error);
    return false;
  }
};

// Function to check if cart has items
export const checkCartStatus = (): void => {
  try {
    const cartData = localStorage.getItem('edumall_cart');
    if (cartData) {
      const cart = JSON.parse(cartData);
      console.log('📦 Cart Status:', {
        hasItems: cart.length > 0,
        itemCount: cart.length,
        totalQuantity: cart.reduce((sum: any, item: any) => sum + item.quantity, 0),
        totalValue: '₹' + cart.reduce((sum: any, item: any) => sum + (item.product.price * item.quantity), 0).toLocaleString(),
        items: cart.map((item: any) => ({ 
          title: item.product.title, 
          quantity: item.quantity, 
          price: item.product.price 
        }))
      });
    } else {
      console.log('🛒 Cart is empty (no localStorage data)');
    }
  } catch (error) {
    console.error('❌ Failed to check cart status:', error);
  }
};

// Auto-load cart items for testing
export const initQuickCart = (): void => {
  if (typeof window !== 'undefined') {
    // Auto-load in development and testing environments
    const existingCart = localStorage.getItem('edumall_cart');
    if (!existingCart || existingCart === '[]') {
      setTimeout(() => {
        loadSampleCartItems();
        console.log('🚀 EduMall Cart initialized with sample items');
      }, 100);
    } else {
      console.log('📦 EduMall Cart already has items, skipping initialization');
    }
  }
};

// Make functions globally available for console testing
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.loadSampleCartItems = loadSampleCartItems;
  // @ts-ignore
  window.checkCartStatus = checkCartStatus;
  
  console.log('🛠️ Quick Cart Functions Available:');
  console.log('  loadSampleCartItems() - Load 3 sample cart items');
  console.log('  checkCartStatus() - Check current cart status');
}

export default loadSampleCartItems;