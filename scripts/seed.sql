-- Taste Buds Delight — database seed
-- Run this in the Supabase SQL editor to create tables and insert products

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  price numeric(10,2) not null,
  description text,
  image_url text,
  is_best_seller boolean default false,
  is_new_arrival boolean default false,
  created_at timestamptz default now()
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  items jsonb not null,
  shipping_info jsonb not null,
  subtotal numeric(10,2) not null,
  tax numeric(10,2) not null,
  shipping_cost numeric(10,2) not null,
  total numeric(10,2) not null,
  created_at timestamptz default now()
);

-- Seed products
insert into products (slug, name, category, price, description, image_url, is_best_seller, is_new_arrival) values
  ('cherrys', 'Cherry''s', 'Gummies & Sweets', 10.00, '1000mg per pack. Juicy cherry-flavoured gummies packed with flavour.', 'https://images.unsplash.com/photo-1582058091022-de7c69a81ece?w=600', true, false),
  ('nerd-bites', 'Nerd Bites', 'Gummies & Sweets', 10.00, '1000mg per pack. Tangy Nerd-inspired bites with a crunch.', 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=600', true, true),
  ('gummy-bears', 'Gummy Bears', 'Gummies & Sweets', 5.00, '800mg per pack. Classic gummy bears in a mix of fruit flavours.', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600', false, true),
  ('cola-bottles', 'Cola Bottles', 'Gummies & Sweets', 10.00, '1000mg per pack. Fizzy cola bottle sweets with a tangy kick.', 'https://images.unsplash.com/photo-1575224526797-5730d5f6bc65?w=600', true, false),
  ('high-potency-vape-kit', 'High Potency Vape Kit', 'Vapes', 25.00, '1000mg high potency vape kit. Available in a range of flavours.', 'https://images.unsplash.com/photo-1563170351-be14c343c0cc?w=600', true, false),
  ('half-tray-brownies', 'Half Tray Brownies', 'Brownies', 30.00, '4 generous slices of our signature fudgy brownies. Rich, gooey, and baked to perfection.', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', true, false),
  ('full-tray-brownies', 'Full Tray Brownies', 'Brownies', 55.00, '8 slices of pure brownie bliss. Perfect for sharing or treating yourself all week.', 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=600', true, false),
  ('single-cookie', 'Cookie', 'Cookies', 10.00, 'One thick, soft-baked cookie. Comfort in every bite.', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600', false, false),
  ('cookie-5-pack', 'Cookie 5-Pack', 'Cookies', 40.00, '5 cookies for £40 — save £10. Our bestselling soft-baked cookies. Great for gifting.', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600', true, true),
  ('mystery-box', 'Mystery Box', 'Bundles & Deals', 45.00, 'Surprise selection of our top sweets and treats. Worth every penny.', 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600', true, true)
on conflict (slug) do nothing;
