import { mockApi } from '../services/mockApi';

/**
 * Cart Data Loader - Adds sample cart items for development/demo
 * Uses the proper CartItem structure expected by the API
 */

export const addSampleCartItemsToLocalStorage = async (): Promise<void> => {
  try {
    // Only add sample items in development environment
    if (typeof window === 'undefined' || window.location.hostname !== 'localhost') {
      return;
    }

    // Check if cart already has items
    const existingCart = localStorage.getItem('edumall_cart');
    if (existingCart && existingCart !== '[]') {
      console.log('📦 Cart already has items, skipping sample data');
      return;
    }

    // Sample product IDs to add to cart
    const sampleCartProducts = [
      { productId: 1, quantity: 1 },  // NEET Physics book
      { productId: 7, quantity: 2 },  // JEE Math book  
      { productId: 15, quantity: 1 }, // UPSC Guide
    ];

    // Get the full product data for each item
    const cartItems = [];
    
    for (const item of sampleCartProducts) {
      try {
        const productResponse = await mockApi.getProductById(item.productId);
        if (productResponse.success && productResponse.data) {
          cartItems.push({
            productId: item.productId,
            quantity: item.quantity,
            product: productResponse.data
          });
        }
      } catch (error) {
        console.warn(`Failed to load product ${item.productId} for cart:`, error);
      }
    }

    if (cartItems.length > 0) {
      localStorage.setItem('edumall_cart', JSON.stringify(cartItems));
      console.log(`📦 Added ${cartItems.length} sample cart items for development:`, cartItems);
    }

  } catch (error) {
    console.warn('Failed to add sample cart items:', error);
  }
};

// Auto-initialize sample cart data in development
export const initializeCartData = (): void => {
  if (typeof window !== 'undefined') {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
      addSampleCartItemsToLocalStorage();
    }, 500);
  }
};

export default initializeCartData;