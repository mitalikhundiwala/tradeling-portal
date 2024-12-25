// pages/api/users.ts
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";

export type Order = {
  orderNo: string;
  businessName: string;
  orderDate: Date;
  orderValue: number;
  orderStatus: string;
};

// Generate fake user data
const generateFakeOrders = (size: number) => {
  const orders: Order[] = [];
  for (let i = 0; i < size; i++) {
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  // Handle GET request to fetch fake users
  const orders = generateFakeOrders(limit); // Generate 10 fake users

  return Response.json({ data: { orders, page, limit, totalCount: 100 } });
}
