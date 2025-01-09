import { OrdersService } from "./services/orders.service";
import OrdersTable from "./orders-table";

interface IProps {
  page: number;
  size: number;
  statuses: string | null;
}

export default async function Orders({ page, size, statuses }: IProps) {
  const statusesArray = statuses ? statuses.split(",") : [];
  const ordersReponse = OrdersService.retrieveOrders({
    page,
    limit: size,
    statuses,
  });

  return (
    <OrdersTable
      ordersReponse={ordersReponse}
      page={page}
      size={size}
      statuses={statusesArray}
    />
  );
}
