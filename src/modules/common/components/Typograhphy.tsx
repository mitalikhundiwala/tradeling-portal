import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";

export const H1: FunctionComponent<
  React.HTMLAttributes<HTMLHeadingElement>
> = ({ children, className, ...props }) => {
  return (
    <h1
      className={cn("text-2xl font-bold tracking-tight", className)} // Base styles
      {...props}
    >
      {children}
    </h1>
  );
};
