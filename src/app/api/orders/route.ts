// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";

export type Order = {
  orderNo: string;
  businessName: string;
  orderDate: Date;
  orderValue: number;
  orderStatus: string;
};

// Generate fake user data
const generateFakeOrders = (num: number) => {
  const orders: Order[] = [];
  for (let i = 0; i < num; i++) {
    orders.push({
      orderNo: `AE-${faker.string.alpha({ length: 1 }).toUpperCase()}-${faker.number.int({ min: 1000000, max: 9999999 }).toString().padStart(7, "0")}`,
      businessName: `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.productMaterial()}`,
      orderDate: faker.date.anytime(),
      orderValue: faker.number.int({ min: 100, max: 100000 }),
      orderStatus: faker.helpers.arrayElement([
        "In Progress",
        "Delivered",
        "Cancelled",
      ]),
    });
  }
  return orders;
};

export async function GET() {
  // Handle GET request to fetch fake users
  const orders = generateFakeOrders(10); // Generate 10 fake users

  return Response.json({ data: orders });
}
