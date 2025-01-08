import { TableLoading } from "@/modules/common/components/loaders/TableLoader.component";
import { H1 } from "@/modules/common/components/Typography";

export default function Loading() {
  return (
    <div>
      <div className="p-4">
        <H1>Fetching Users...</H1>
      </div>
      <TableLoading />
    </div>
  );
}
