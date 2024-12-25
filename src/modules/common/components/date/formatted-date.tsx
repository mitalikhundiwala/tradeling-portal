import { format } from "date-fns";

export function FormattedDate({ ...props }) {
  const pattern = "d MMM yyyy";
  const formattedDate = format(props.date, pattern);
  return <span>{formattedDate}</span>;
}
