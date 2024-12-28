import React from "react";
import { Button as ShadButton, ButtonProps } from "@/components/ui/button";
import { Label as ShadcnLabel } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // Importing the Loader2 icon from lucide-react

interface CustomButtonProps extends ButtonProps {
  customVariant?: "success" | "warning";
  isLoading?: boolean;
  loadingText?: string;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean; // Optional 'required' prop
}

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { className, customVariant, isLoading, loadingText, children, ...props },
    ref,
  ) => {
    const customStyles = {
      success: "bg-green-500 text-white hover:bg-green-600",
      warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    };

    return (
      <ShadButton
        ref={ref}
        className={cn(customVariant && customStyles[customVariant], className)}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex">
            <Loader2 className="animate-spin mr-2" /> {loadingText}
          </div> // Show loader with a spin animation
        ) : (
          children // Show button text when not loading
        )}
      </ShadButton>
    );
  },
);
Button.displayName = "Button";

export const Label: React.FC<LabelProps> = ({
  required,
  children,
  className,
  ...props
}) => {
  return (
    <ShadcnLabel {...props} className={`flex items-center ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </ShadcnLabel>
  );
};

Label.displayName = "Label";
