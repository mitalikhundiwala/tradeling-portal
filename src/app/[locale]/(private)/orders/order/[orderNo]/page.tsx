export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNo: string }>;
}) {
  const orderNo = (await params).orderNo;
  return <h1>Order {orderNo}</h1>;
}
