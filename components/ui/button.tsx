import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "tr-inline-flex tr-items-center tr-justify-center tr-gap-2 tr-whitespace-nowrap tr-rounded-md tr-text-sm tr-font-medium tr-transition-colors focus-visible:tr-outline-none focus-visible:tr-ring-1 focus-visible:tr-ring-ring disabled:tr-pointer-events-none disabled:tr-opacity-50 [&_svg]:tr-pointer-events-none [&_svg]:tr-size-4 [&_svg]:tr-shrink-0",
  {
    variants: {
      variant: {
        default:
          "tr-bg-primary tr-text-white tr-shadow [&_svg]:tr-size-auto [&_svg]:tr-shrink-0",
        destructive:
          "tr-bg-destructive tr-text-destructive-foreground tr-shadow-sm hover:tr-bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        plain:
          "bg-transparent hover:bg-transparent hover:text-gray-100 [&_svg]:pointer-events-none [&_svg]:size-auto [&_svg]:shrink-0",
      },
      size: {
        default: "py-[11px] px-[77px] text-15px font-bold",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        plain: "p-0 w-auto h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
