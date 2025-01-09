import { useQuery } from "@tanstack/react-query";
import RolesService from "../services/roles.service";
import { LoadingSpinner } from "@/components/spinner";
import { map } from "lodash";

interface IProps {
  roleId: number;
}

export default function ViewPermissions({ roleId }: IProps) {
  const { isLoading: isLoadingPermissions, data: permissions } = useQuery({
    queryKey: ["retrieveRoleDetail"],
    queryFn: () => {
      return RolesService.retrieveRoleDetail(roleId);
    },
  });
  console.log("permissions::", permissions);

  return isLoadingPermissions ? (
    <LoadingSpinner className="mr-2 h-4 w-4" />
  ) : (
    <ul className="list-disc p-1">
      {map(permissions, (permission) => {
        return <li key={permission.value}>{permission.label}</li>;
      })}
    </ul>
  );
}
