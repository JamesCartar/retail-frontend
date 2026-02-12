/**
 * Popover Component
 * Based on Radix UI Popover
 */

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "tr-z-50 tr-w-72 tr-rounded-md tr-border tr-bg-popover tr-p-4 tr-text-popover-foreground tr-shadow-md tr-outline-none data-[state=open]:tr-animate-in data-[state=closed]:tr-animate-out data-[state=closed]:tr-fade-out-0 data-[state=open]:tr-fade-in-0 data-[state=closed]:tr-zoom-out-95 data-[state=open]:tr-zoom-in-95 data-[side=bottom]:tr-slide-in-from-top-2 data-[side=left]:tr-slide-in-from-right-2 data-[side=right]:tr-slide-in-from-left-2 data-[side=top]:tr-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
