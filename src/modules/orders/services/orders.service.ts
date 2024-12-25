import request from "@/lib/request";
import { getNextApiUrlFromRoot } from "@/lib/global.config";
import { IOrdersPage } from "../models/order";
import { ResponseTransformer } from "./response.transformer";

export interface IOrdersRequestParams {
  page: number;
  limit: number;
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
  }: IOrdersRequestParams): Promise<IOrdersPage> {
    const params = {
      page,
      limit,
    };

    const response = await request(prepareOrdersRequest(params));
    const orders = ResponseTransformer.fromServerResponse(response.data.orders);
    return {
      orders,
      total: response.data.totalCount,
      page,
      limit,
    };
  }
}
