/* eslint-disable */

import { FunctionComponent, useEffect, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label, Button } from "@/modules/common/components";

interface IProps {
  isOpen: boolean;
  handleNewUserSubmit: (data: newUserSchemaTypes) => void;
  handleModalToggle: (isOpen: boolean) => void;
}

const newUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
  password: z.string().min(1, "Password is required"),
  // roles: z
  //   .array(z.number())
  //   .min(1, "At least one role is required")
  //   .nonempty("Roles cannot be empty"),
});

export type newUserSchemaTypes = z.infer<typeof newUserSchema>;

export const CreateUserModal: FunctionComponent<IProps> = memo(
  ({ isOpen, handleNewUserSubmit, handleModalToggle }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<newUserSchemaTypes>({
      resolver: zodResolver(newUserSchema),
    });

    useEffect(() => {
      reset();
    }, []);

    const _onSubmit = async (data: newUserSchemaTypes) => {
      handleNewUserSubmit(data);
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleModalToggle}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Create User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(_onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div>
                <div className="pb-1">
                  <Label htmlFor="firstName">First Name</Label>
                </div>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter your First Name"
                  className={errors.firstName ? "border-red-500" : ""}
                  autoComplete="off"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <div className="pb-1">
                  <Label htmlFor="lastName">Last Name</Label>
                </div>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter your Last Name"
                  className={errors.lastName ? "border-red-500" : ""}
                  autoComplete="off"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <div className="pb-1">
                  <Label htmlFor="tlEmail">Email</Label>
                </div>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                  autoComplete="off"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <div className="pb-1">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter password"
                  className={errors.password ? "border-red-500" : ""}
                  autoComplete="off"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Adding user..."
                >
                  Create User
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);
