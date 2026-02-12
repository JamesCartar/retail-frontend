import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "tr-flex tr-h-9 tr-w-full tr-rounded-md tr-border tr-border-input tr-bg-transparent tr-px-3 tr-py-1 tr-text-base tr-shadow-sm tr-transition-colors file:tr-border-0 file:tr-bg-transparent file:tr-text-sm file:tr-font-medium file:tr-text-foreground placeholder:tr-text-muted-foreground focus-visible:tr-outline-none focus-visible:tr-ring-1 focus-visible:tr-ring-ring disabled:tr-cursor-not-allowed disabled:tr-opacity-50 md:tr-text-sm hide-number-stepper",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
