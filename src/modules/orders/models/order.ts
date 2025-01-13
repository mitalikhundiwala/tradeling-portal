export interface IOrder {
  orderNo: string;
  businessName: string;
  orderDate: Date;
  quantity: number;
  orderValue: number;
  orderStatus: string;
}

export interface IOrdersPage {
  orders: IOrder[];
  total: number;
  page: number;
  limit: number;
}
