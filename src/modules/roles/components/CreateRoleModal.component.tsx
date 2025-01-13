"use client";

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
import { permission } from "process";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { IPermission } from "../models/role.model";

interface IProps {
  isOpen: boolean;
  permissions: IPermission[];
  handleNewRoleSubmit: (data: newRoleSchemaTypes) => void;
  handleModalToggle: (isOpen: boolean) => void;
}

const newRoleSchema = z.object({
  name: z.string().min(1, "Role Name is required"),
  permissions: z
    .array(z.coerce.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one permission."
    }),
});

export type newRoleSchemaTypes = z.infer<typeof newRoleSchema>;

export const CreateRoleModal: FunctionComponent<IProps> = ({
  isOpen,
  permissions,
  handleNewRoleSubmit,
  handleModalToggle,
}) => {
  const form = useForm<newRoleSchemaTypes>({
    resolver: zodResolver(newRoleSchema),
    defaultValues: {
      name: undefined,
      permissions: undefined,
    },
  });
  console.log(form.formState.errors);
  useEffect(() => {
    form.reset();
  }, []);

  const _onSubmit = async (data: newRoleSchemaTypes) => {
    handleNewRoleSubmit(data);
  };

  const _handleReset = () => {
    form.reset();
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
          <DialogTitle className="text-center">Create Role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-4">
            <div className="grid py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormDescription>
                      Please provide the name of the role
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Super Admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid py-2">
              <FormField
                control={form.control}
                name="permissions"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base">Permissions</FormLabel>
                    <FormDescription>
                      Select the permissions for the role.
                    </FormDescription>
                    {permissions.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid py-2">
              <div className="flex justify-between">
                <Button type="reset" onClick={_handleReset} variant="secondary">
                  Reset
                </Button>
                <Button
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                  loadingText="Adding role..."
                >
                  Create Role
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
