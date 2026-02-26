import type { Service } from "./index";

export const financeServices: Service[] = [
  { slug: "paypal", name: "PayPal", category: "Finance" },
  { slug: "stripe", name: "Stripe", category: "Finance" },
  { slug: "cash-app", name: "Cash App", category: "Finance" },
  { slug: "venmo", name: "Venmo", category: "Finance" },
  { slug: "robinhood", name: "Robinhood", category: "Finance" },
  { slug: "sofi", name: "SoFi", category: "Finance" },
  { slug: "chime", name: "Chime", category: "Finance" },
];