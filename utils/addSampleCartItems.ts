/**
 * Sample Cart Items Utility
 * Adds sample items to cart for development/demo purposes
 */

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  inStock: boolean;
}

// Sample cart items for development
const sampleCartItems: CartItem[] = [
  {
    id: '1',
    title: 'NEET Physics Complete Study Guide',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop',
    category: 'NEET',
    quantity: 1,
    inStock: true
  },
  {
    id: '7',
    title: 'JEE Main Mathematics Practice Book',
    price: 699,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
    category: 'JEE',
    quantity: 2,
    inStock: true
  },
  {
    id: '15',
    title: 'UPSC General Studies Manual',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'UPSC',
    quantity: 1,
    inStock: true
  }
];

// Function to add sample items to cart (for development only)
export const addSampleCartItems = (): void => {
  try {
    // Only add sample items in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const existingCart = localStorage.getItem('edumall_cart');
      
      if (!existingCart || existingCart === '[]') {
        localStorage.setItem('edumall_cart', JSON.stringify(sampleCartItems));
        console.log('📦 Sample cart items added for development');
      }
    }
  } catch (error) {
    console.warn('Failed to add sample cart items:', error);
  }
};

// Auto-add sample items when module is imported
if (typeof window !== 'undefined') {
  // Add a small delay to ensure DOM is ready
  setTimeout(() => {
    addSampleCartItems();
  }, 100);
}

export default addSampleCartItems;