import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "tr-inline-flex tr-h-9 tr-items-center tr-justify-center tr-rounded-lg tr-p-1 tr-text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "tr-inline-flex tr-items-center tr-justify-center tr-text-muted tr-whitespace-nowrap tr-rounded-md tr-px-3 tr-py-2 tr-text-13px tr-font-medium tr-ring-offset-background tr-transition-all focus-visible:tr-outline-none focus-visible:tr-ring-2 focus-visible:tr-ring-ring focus-visible:tr-ring-offset-2 disabled:tr-pointer-events-none disabled:tr-opacity-50 data-[state=active]:tr-bg-white data-[state=active]:tr-text-[#4C4C4C]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "tr-mt-2 tr-ring-offset-background focus-visible:tr-outline-none focus-visible:tr-ring-2 focus-visible:tr-ring-ring focus-visible:tr-ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
