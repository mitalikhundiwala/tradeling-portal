/* eslint-disable */

import { FunctionComponent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  isOpen: boolean;
  handleSubmit: () => void;
  handleModalToggle: (isOpen: boolean) => void;
}

export const CreateUserModal: FunctionComponent<IProps> = ({
  isOpen,
  handleSubmit,
  handleModalToggle,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleModalToggle}>
      <DialogContent className="sm:max-w-[425px] -mt-[15%]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">sdf</div>
      </DialogContent>
    </Dialog>
  );
};
