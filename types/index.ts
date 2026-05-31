export type Category =
  | "Gummies & Chews"
  | "Cookies"
  | "Chocolate & Truffles"
  | "Hard Candy & Lollipops"
  | "Vapes & Disposables"
  | "Edibles"
  | "Snacks"
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

export type PaymentMethod = "card" | "paypal";
