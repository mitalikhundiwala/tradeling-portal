import { getNextApiUrlFromRoot } from "@/lib/global.config";
import { IOrdersPage } from "../models/order";
import { ResponseTransformer } from "./response.transformer";

export interface IOrdersRequestParams {
  page: number;
  limit: number;
  statuses: string[];
}

export const prepareOrdersRequest = (data = {}) => ({
  method: "GET",
  url: getNextApiUrlFromRoot("/api/orders"),
  data,
});

export class OrdersService {
  static async retrieveOrders({
    page,
    limit,
    statuses,
  }: IOrdersRequestParams): Promise<IOrdersPage> {
    const params = {
      page,
      limit,
      statuses,
    };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const response = await request(prepareOrdersRequest(params));
    const urlParams = new URLSearchParams();
    urlParams.append("page", params.page.toString());
    urlParams.append("limit", params.limit.toString());
    if (params.statuses.length) {
      urlParams.append("statuses", params.statuses.join(",").toString());
    }
    const response = await fetch(
      `http://localhost:3000/api/orders?${urlParams.toString()}`,
    );
    const data = await response.json();
    const orders = ResponseTransformer.fromServerResponse(data.data.orders);
    return {
      orders,
      total: data.data.totalCount,
      page,
      limit,
    };
  }
}
