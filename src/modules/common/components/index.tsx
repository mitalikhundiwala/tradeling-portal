import React from "react";
import { Button as ShadButton, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonProps {
  customVariant?: "success" | "warning";
}

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, customVariant, ...props }, ref) => {
    const customStyles = {
      success: "bg-green-500 text-white hover:bg-green-600",
      warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    };

    return (
      <ShadButton
        ref={ref}
        className={cn(customVariant && customStyles[customVariant], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
