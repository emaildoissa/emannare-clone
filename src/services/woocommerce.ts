// WooCommerce API Service
// Configure with your WooCommerce credentials

export interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number | null;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: {
    src: string;
    alt: string;
  } | null;
}

export interface CartItem {
  product: WooProduct;
  quantity: number;
}

class WooCommerceService {
  private config: WooCommerceConfig | null = null;

  configure(config: WooCommerceConfig) {
    this.config = config;
  }

  private getAuthHeader(): string {
    if (!this.config) throw new Error("WooCommerce not configured");
    return btoa(`${this.config.consumerKey}:${this.config.consumerSecret}`);
  }

  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.config) throw new Error("WooCommerce not configured");

    const response = await fetch(`${this.config.url}/wp-json/wc/v3${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${this.getAuthHeader()}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
  }): Promise<WooProduct[]> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.per_page) searchParams.set("per_page", params.per_page.toString());
    if (params?.category) searchParams.set("category", params.category.toString());
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    return this.fetchApi<WooProduct[]>(`/products${query ? `?${query}` : ""}`);
  }

  async getProduct(id: number): Promise<WooProduct> {
    return this.fetchApi<WooProduct>(`/products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<WooProduct | null> {
    const products = await this.fetchApi<WooProduct[]>(`/products?slug=${slug}`);
    return products[0] || null;
  }

  async getCategories(): Promise<WooCategory[]> {
    return this.fetchApi<WooCategory[]>("/products/categories");
  }

  async createOrder(orderData: {
    line_items: Array<{ product_id: number; quantity: number }>;
    billing: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
  }) {
    return this.fetchApi("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }
}

export const wooCommerce = new WooCommerceService();

// Cart management using localStorage
export const cartService = {
  getCart(): CartItem[] {
    const cart = localStorage.getItem("emannare_cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart(product: WooProduct, quantity: number = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem("emannare_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    return cart;
  },

  removeFromCart(productId: number) {
    const cart = this.getCart().filter((item) => item.product.id !== productId);
    localStorage.setItem("emannare_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    return cart;
  },

  updateQuantity(productId: number, quantity: number) {
    const cart = this.getCart();
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      localStorage.setItem("emannare_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
    }
    return cart;
  },

  clearCart() {
    localStorage.removeItem("emannare_cart");
    window.dispatchEvent(new Event("cart-updated"));
    return [];
  },

  getTotal(): number {
    return this.getCart().reduce((total, item) => {
      const price = parseFloat(item.product.price) || 0;
      return total + price * item.quantity;
    }, 0);
  },

  getItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  },
};
