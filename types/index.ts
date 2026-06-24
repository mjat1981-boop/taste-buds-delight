export type Category =
  | "Gummies & Sweets"
  | "Vapes"
  | "Brownies"
  | "Cookies"
  | "Bundles & Deals"
  | "Best Sellers";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

export type ShippingInfo = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

export type PaymentMethod = "bank_transfer";

export type Order = {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  items: CartItem[];
  shipping_info: ShippingInfo;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
  created_at?: string;
};
