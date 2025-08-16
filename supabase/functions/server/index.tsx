import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'
import { NEET_KAKA_PRODUCTS, getFeaturedProducts, getProductById, searchProducts, getCategoryStats } from './productData.ts'

const app = new Hono()

// Enable CORS for all routes
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://*.supabase.co'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

// Add logging
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Initialize products in database
async function initializeProducts() {
  try {
    console.log('Initializing NEET Kaka JEE products in database...');
    await kv.set('neet-kaka-products', NEET_KAKA_PRODUCTS);
    console.log('Products initialized successfully');
    return { success: true, count: NEET_KAKA_PRODUCTS.length };
  } catch (error) {
    console.error('Error initializing products:', error);
    return { success: false, error: error.message };
  }
}

// API Routes
app.get('/make-server-fa655b79/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    totalProducts: NEET_KAKA_PRODUCTS.length
  });
});

// Initialize products
app.post('/make-server-fa655b79/init-products', async (c) => {
  const result = await initializeProducts();
  return c.json(result);
});

// Get all products
app.get('/make-server-fa655b79/products', async (c) => {
  try {
    let products = await kv.get('neet-kaka-products');
    
    // If no products in database, initialize them
    if (!products) {
      console.log('No products found, initializing...');
      await initializeProducts();
      products = NEET_KAKA_PRODUCTS;
    }
    
    return c.json({ 
      success: true, 
      data: products, 
      count: products.length,
      message: 'NEET Kaka JEE products retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// Get product by ID
app.get('/make-server-fa655b79/products/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const products = await kv.get('neet-kaka-products') || NEET_KAKA_PRODUCTS;
    const product = getProductById(id) || products.find(p => p.id === id);
    
    if (!product) {
      return c.json({ 
        success: false, 
        error: 'Product not found' 
      }, 404);
    }
    
    return c.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// Get featured products
app.get('/make-server-fa655b79/products/featured', async (c) => {
  try {
    const products = await kv.get('neet-kaka-products') || NEET_KAKA_PRODUCTS;
    const featured = getFeaturedProducts();
    
    return c.json({ 
      success: true, 
      data: featured 
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// Search products
app.get('/make-server-fa655b79/products/search', async (c) => {
  try {
    const query = c.req.query('q');
    const category = c.req.query('category');
    const subject = c.req.query('subject');
    
    const products = await kv.get('neet-kaka-products') || NEET_KAKA_PRODUCTS;
    let filtered = products;
    
    if (query) {
      filtered = searchProducts(query);
    }
    
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (subject && subject !== 'All') {
      filtered = filtered.filter(p => p.subject === subject);
    }
    
    return c.json({ 
      success: true, 
      data: filtered,
      count: filtered.length
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// Get categories with stats
app.get('/make-server-fa655b79/categories', async (c) => {
  try {
    const categoryStats = getCategoryStats();
    
    return c.json({ 
      success: true, 
      data: categoryStats 
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch)