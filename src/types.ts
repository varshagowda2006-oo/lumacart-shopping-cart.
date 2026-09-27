export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Order {
  orderNumber: string;
  date: string;
  total: number;
  items: CartItem[];
  contact: { name: string; email: string; phone: string };
  address: { address: string; city: string; state: string; pin: string };
  paymentMethod: string;
  estimatedDelivery: string;
}
