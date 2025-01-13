import { map } from "lodash";
import { IOrder } from "../models/order";

export class ResponseTransformer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromServerResponse(data: any): IOrder[] {
    return map(data, (datum) => {
      return {
        orderNo: datum.orderNo,
        businessName: datum.businessName,
        orderDate: datum.date,
        quantity: datum.quantity,
        orderValue: datum.orderValue,
        orderStatus: datum.status,
      };
    });
  }
}
