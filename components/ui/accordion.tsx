import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("tr-border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    chevronClassName?: string;
  }
>(({ className, children, chevronClassName, ...props }, ref) => (
  <AccordionPrimitive.Header className="tr-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "tr-relative tr-flex tr-flex-1 tr-items-center tr-justify-between tr-py-4 tr-text-sm tr-font-medium tr-transition-all hover:tr-underline tr-text-left [&[data-state=open]>svg]:tr-rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "tr-h-4 tr-w-4 tr-shrink-0 tr-text-muted-foreground tr-transition-transform tr-duration-200",
          chevronClassName,
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="tr-overflow-hidden tr-text-sm data-[state=closed]:tr-animate-accordion-up data-[state=open]:tr-animate-accordion-down"
    {...props}
  >
    <div className={cn("tr-pb-4 tr-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
