import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "tr-fixed tr-inset-0 tr-z-50 tr-bg-black/80  data-[state=open]:tr-animate-in data-[state=closed]:tr-animate-out data-[state=closed]:tr-fade-out-0 data-[state=open]:tr-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "tr-fixed tr-left-[50%] tr-top-[50%] tr-z-50 tr-grid tr-w-full tr-max-w-lg tr-translate-x-[-50%] tr-translate-y-[-50%] tr-gap-4 tr-border tr-bg-background tr-p-6 tr-shadow-lg tr-duration-200 data-[state=open]:tr-animate-in data-[state=closed]:tr-animate-out data-[state=closed]:tr-fade-out-0 data-[state=open]:tr-fade-in-0 data-[state=closed]:tr-zoom-out-95 data-[state=open]:tr-zoom-in-95 data-[state=closed]:tr-slide-out-to-left-1/2 data-[state=closed]:tr-slide-out-to-top-[48%] data-[state=open]:tr-slide-in-from-left-1/2 data-[state=open]:tr-slide-in-from-top-[48%] sm:tr-rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="tr-absolute tr-right-4 tr-top-4 tr-rounded-sm tr-opacity-70 tr-ring-offset-background tr-transition-opacity hover:tr-opacity-100 focus:tr-outline-none focus:tr-ring-2 focus:tr-ring-ring focus:tr-ring-offset-2 disabled:tr-pointer-events-none data-[state=open]:tr-bg-accent data-[state=open]:tr-text-muted-foreground">
        <X className="tr-h-4 tr-w-4" />
        <span className="tr-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tr-flex tr-flex-col tr-space-y-1.5 tr-text-center sm:tr-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tr-flex tr-flex-col-reverse sm:tr-flex-row sm:tr-justify-end",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("tr-text-lg tr-leading-none tr-tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("tr-text-sm tr-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
