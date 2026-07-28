import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";
import { products as staticProducts } from "@/data/products";
import { CartItem, ShippingInfo } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const BANK_DETAILS = `
  Bank: First National Bank
  Account Name: Taste Buds Delight
  Account Number: XXXX-XXXX-XXXX
  Sort Code: XX-XX-XX
`;

function generateOrderNumber(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `TBD-${ymd}-${rand}`;
}

function buildCustomerEmail(
  orderNumber: string,
  customerName: string,
  items: CartItem[],
  shipping: ShippingInfo,
  subtotal: number,
  tax: number,
  shippingCost: number,
  total: number
): string {
  const itemRows = items
    .map(
      (item) =>
        `<tr><td style="padding:4px 8px;">${item.productId}</td><td style="padding:4px 8px;text-align:right;">x${item.quantity}</td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#1A1A1A;background:#F5F0E8;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#FFF8ED;border-radius:12px;padding:32px;border:1px solid #2A6B2A22;">
    <h1 style="color:#2A6B2A;margin-bottom:4px;">Taste Buds Delight</h1>
    <h2 style="color:#5C3D1E;">Order Confirmed!</h2>
    <p>Hi ${customerName},</p>
    <p>Thank you for your order. Your order number is:</p>
    <p style="font-size:24px;font-weight:bold;color:#2A6B2A;letter-spacing:2px;">${orderNumber}</p>

    <h3 style="color:#5C3D1E;border-bottom:1px solid #2A6B2A33;padding-bottom:8px;">Order Summary</h3>
    <table style="width:100%;border-collapse:collapse;">
      ${itemRows}
      <tr><td colspan="2"><hr style="border-color:#2A6B2A22;"/></td></tr>
      <tr><td style="padding:4px 8px;">Subtotal</td><td style="padding:4px 8px;text-align:right;">£${subtotal.toFixed(2)}</td></tr>
      <tr><td style="padding:4px 8px;">Tax</td><td style="padding:4px 8px;text-align:right;">£${tax.toFixed(2)}</td></tr>
      <tr><td style="padding:4px 8px;">Evri Delivery</td><td style="padding:4px 8px;text-align:right;">${shippingCost === 0 ? "Free" : `£${shippingCost.toFixed(2)}`}</td></tr>
      <tr style="font-weight:bold;font-size:18px;color:#2A6B2A;">
        <td style="padding:8px 8px;">Total</td>
        <td style="padding:8px 8px;text-align:right;">£${total.toFixed(2)}</td>
      </tr>
    </table>

    <h3 style="color:#5C3D1E;border-bottom:1px solid #2A6B2A33;padding-bottom:8px;">Shipping To</h3>
    <p style="margin:0;">${shipping.fullName}</p>
    <p style="margin:0;">${shipping.address}</p>
    <p style="margin:0;">${shipping.city}, ${shipping.zip}</p>

    <h3 style="color:#5C3D1E;border-bottom:1px solid #2A6B2A33;padding-bottom:8px;">Payment Instructions</h3>
    <div style="background:#F5F0E8;border-left:4px solid #2A6B2A;padding:16px;border-radius:4px;font-family:monospace;">
      <p style="margin:4px 0;"><strong>Bank:</strong> First National Bank</p>
      <p style="margin:4px 0;"><strong>Account Name:</strong> Taste Buds Delight</p>
      <p style="margin:4px 0;"><strong>Account Number:</strong> XXXX-XXXX-XXXX</p>
      <p style="margin:4px 0;"><strong>Sort Code:</strong> XX-XX-XX</p>
      <p style="margin:4px 0;"><strong>Reference:</strong> ${orderNumber}</p>
    </div>
    <p style="color:#6B5C45;font-size:13px;">Please use your order number as the payment reference. Your order will be processed once payment is received.</p>

    <p style="color:#6B5C45;font-size:12px;margin-top:32px;">© ${new Date().getFullYear()} Taste Buds Delight</p>
  </div>
</body>
</html>
  `.trim();
}

function buildSellerEmail(
  orderNumber: string,
  customerName: string,
  customerEmail: string,
  total: number
): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#1A1A1A;padding:20px;">
  <h2>New Order: ${orderNumber}</h2>
  <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
  <p><strong>Total:</strong> £${total.toFixed(2)}</p>
  <p>Log in to the admin panel to view the full order details.</p>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    items: CartItem[];
    shipping_info: ShippingInfo;
  };

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  for (const item of body.items) {
    if (!item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
    }
  }

  // Recompute pricing server-side from the authoritative products table —
  // never trust totals submitted by the client.
  const { data: dbProducts, error: productsError } = await supabaseAdmin
    .from("products")
    .select("id, slug, price");

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const priceById = new Map((dbProducts ?? []).map((p) => [p.id as string, p.price as number]));
  const priceBySlug = new Map((dbProducts ?? []).map((p) => [p.slug as string, p.price as number]));
  const staticSlugById = new Map(staticProducts.map((p) => [p.id, p.slug]));

  // Cart items added from the homepage/static catalog carry the static
  // data/products.ts id (e.g. "1"), not the DB's generated uuid — resolve
  // those to their DB record via the shared `slug` before pricing.
  function resolvePrice(productId: string): number | undefined {
    if (priceById.has(productId)) return priceById.get(productId);
    const slug = staticSlugById.get(productId);
    if (slug && priceBySlug.has(slug)) return priceBySlug.get(slug);
    return undefined;
  }

  for (const item of body.items) {
    if (resolvePrice(item.productId) === undefined) {
      return NextResponse.json({ error: `Unknown product: ${item.productId}` }, { status: 400 });
    }
  }

  const subtotal = body.items.reduce(
    (acc, item) => acc + resolvePrice(item.productId)! * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 50 ? 0 : 6;
  const total = subtotal + tax + shippingCost;

  const orderNumber = generateOrderNumber();
  const customerName = body.shipping_info.fullName;
  const customerEmail = body.shipping_info.email;

  // Insert into Supabase
  const { data: orderData, error: dbError } = await supabaseAdmin
    .from("orders")
    .insert([{
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      items: body.items,
      shipping_info: body.shipping_info,
      subtotal,
      tax,
      shipping_cost: shippingCost,
      total,
    }])
    .select()
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Send customer confirmation email
  await resend.emails.send({
    from: "Taste Buds Delight <noreply@tastebudsdelight.com>",
    to: customerEmail,
    subject: `Order Confirmed — ${orderNumber}`,
    html: buildCustomerEmail(
      orderNumber,
      customerName,
      body.items,
      body.shipping_info,
      subtotal,
      tax,
      shippingCost,
      total
    ),
  });

  // Send seller notification
  const sellerEmail = process.env.SELLER_EMAIL;
  if (sellerEmail) {
    await resend.emails.send({
      from: "Taste Buds Delight Orders <noreply@tastebudsdelight.com>",
      to: sellerEmail,
      subject: `New Order: ${orderNumber} — £${total.toFixed(2)}`,
      html: buildSellerEmail(orderNumber, customerName, customerEmail, total),
    });
  }

  return NextResponse.json({
    success: true,
    orderId: orderData.id as string,
    orderNumber,
  });
}
