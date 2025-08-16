/**
 * Manual Cart Item Adder for Testing
 * Use this to manually add items to cart for testing purposes
 */

// Simple cart item structure that matches localStorage format
interface SimpleCartItem {
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    author: string;
    rating: number;
    reviews: number;
    discount: number;
    bestseller: boolean;
    publisher: string;
    year: number;
    pages: number;
    language: string;
    type: string;
    subject: string;
    stock?: number;
  };
}

// Sample products for quick cart testing
const sampleProducts: SimpleCartItem[] = [
  {
    productId: 1,
    quantity: 1,
    product: {
      id: 1,
      title: "NEET Physics Complete Study Guide",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop",
      category: "NEET",
      author: "Dr. Physics Expert",
      rating: 4.8,
      reviews: 1245,
      discount: 31,
      bestseller: true,
      publisher: "EduMall Publications",
      year: 2024,
      pages: 680,
      language: "English",
      type: "Physical Book",
      subject: "Physics"
    }
  },
  {
    productId: 2,
    quantity: 2,
    product: {
      id: 2,
      title: "JEE Main Mathematics Practice Book",
      price: 699,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      category: "JEE",
      author: "Prof. Math Guru",
      rating: 4.7,
      reviews: 892,
      discount: 30,
      bestseller: true,
      publisher: "JEE Academy Press",
      year: 2024,
      pages: 545,
      language: "English",
      type: "Physical Book",
      subject: "Mathematics"
    }
  },
  {
    productId: 3,
    quantity: 1,
    product: {
      id: 3,
      title: "UPSC General Studies Manual",
      price: 1299,
      originalPrice: 1799,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      category: "UPSC",
      author: "IAS Study Group",
      rating: 4.9,
      reviews: 567,
      discount: 28,
      bestseller: true,
      publisher: "Civil Services Hub",
      year: 2024,
      pages: 890,
      language: "English",
      type: "Physical Book",
      subject: "General Studies"
    }
  }
];

// Function to manually add sample cart items
export const addSampleCartItems = (): void => {
  try {
    localStorage.setItem('edumall_cart', JSON.stringify(sampleProducts));
    console.log('✅ Sample cart items added successfully!');
    console.log('📦 Cart now contains:', sampleProducts.length, 'items');
    
    // Trigger a storage event to update cart counts in header
    window.dispatchEvent(new Event('storage'));
    
    // Reload the page to see changes
    if (window.location.hash === '#cart') {
      window.location.reload();
    }
  } catch (error) {
    console.error('❌ Failed to add sample cart items:', error);
  }
};

// Function to clear cart
export const clearCart = (): void => {
  try {
    localStorage.removeItem('edumall_cart');
    console.log('🗑️ Cart cleared successfully!');
    
    // Trigger a storage event to update cart counts in header
    window.dispatchEvent(new Event('storage'));
    
    // Reload the page if on cart page
    if (window.location.hash === '#cart') {
      window.location.reload();
    }
  } catch (error) {
    console.error('❌ Failed to clear cart:', error);
  }
};

// Function to check current cart contents
export const checkCart = (): void => {
  try {
    const cartData = localStorage.getItem('edumall_cart');
    if (cartData) {
      const cart = JSON.parse(cartData);
      console.log('📦 Current cart contents:', cart);
      console.log('📊 Cart summary:', {
        items: cart.length,
        totalQuantity: cart.reduce((sum: number, item: SimpleCartItem) => sum + item.quantity, 0),
        totalValue: cart.reduce((sum: number, item: SimpleCartItem) => sum + (item.product.price * item.quantity), 0)
      });
    } else {
      console.log('🛒 Cart is empty');
    }
  } catch (error) {
    console.error('❌ Failed to check cart:', error);
  }
};

// Make functions available in console for testing
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.addSampleCartItems = addSampleCartItems;
  // @ts-ignore
  window.clearCart = clearCart;
  // @ts-ignore
  window.checkCart = checkCart;
  
  console.log('🛠️ Cart testing functions available:');
  console.log('  addSampleCartItems() - Add sample cart items');
  console.log('  clearCart() - Clear all cart items');
  console.log('  checkCart() - Check current cart contents');
}

export default addSampleCartItems;