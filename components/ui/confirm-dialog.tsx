import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/common/utils";
import IfElse from "../IfElse";
import If from "../If";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  secondaryButtonHref?: string;
  showCloseButton?: boolean;
  primaryButtonDisabled?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  icon,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  secondaryButtonHref,
  showCloseButton = false,
  primaryButtonDisabled = false,
}: ConfirmDialogProps) {
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="tr-fixed tr-left-[50%] tr-top-[50%] tr-z-50 tr-w-full tr-max-w-[335px] tr-translate-x-[-50%] tr-translate-y-[-50%] tr-gap-3 tr-border tr-bg-background tr-p-6 tr-shadow-lg tr-duration-200 data-[state=open]:tr-animate-in data-[state=closed]:tr-animate-out data-[state=closed]:tr-fade-out-0 data-[state=open]:tr-fade-in-0 data-[state=closed]:tr-zoom-out-95 data-[state=open]:tr-zoom-in-95 data-[state=closed]:tr-slide-out-to-left-1/2 data-[state=closed]:tr-slide-out-to-top-[48%] data-[state=open]:tr-slide-in-from-left-1/2 data-[state=open]:tr-slide-in-from-top-[48%] tr-rounded-20 tr-flex tr-flex-col tr-items-center tr-justify-center tr-text-center tr-font-primary"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {showCloseButton && (
            <DialogPrimitive.Close className="tr-absolute tr-right-4 tr-top-4 tr-rounded-sm tr-opacity-70 tr-ring-offset-background tr-transition-opacity hover:tr-opacity-100 focus:tr-outline-none focus:tr-ring-2 focus:tr-ring-ring focus:tr-ring-offset-2 disabled:tr-pointer-events-none tr-z-10">
              <X className="tr-h-4 tr-w-4" />
              <span className="tr-sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

          <DialogHeader
            className={cn(
              "tr-flex tr-flex-col tr-items-center tr-space-y-3 tr-text-center tr-w-full",
              showCloseButton && "tr-mt-3",
              !subtitle ? "tr-mb-3" : "tr-mb-2",
            )}
          >
            {icon && (
              <div
                className={cn(
                  "tr-flex tr-justify-center",
                  subtitle ? "tr-mb-3" : "tr-mb-5",
                )}
              >
                {icon}
              </div>
            )}
            <DialogTitle className="tr-text-center tr-text-16px tr-font-semibold">
              {title}
            </DialogTitle>
            {subtitle && (
              <DialogDescription className="tr-text-12px tr-text-center tr-text-muted">
                {subtitle}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="tr-flex tr-flex-col sm:tr-flex-col tr-gap-2 tr-w-full tr-items-center tr-justify-center tr-mt-1 tr-font-primary">
            <Button
              onClick={onPrimaryClick}
              disabled={primaryButtonDisabled}
              className="tr-w-full tr-text-white"
            >
              <span className="tr-text-16px tr-w-full tr-font-medium">
                {primaryButtonText}
              </span>
            </Button>

            <If
              isTrue={!!secondaryButtonText}
              ifBlock={
                <IfElse
                  isTrue={!!secondaryButtonHref}
                  ifBlock={
                    <Button
                      asChild
                      variant="plain"
                      size="plain"
                      className="tr-w-full tr-py-[11px] tr-px-[77px] tr-text-15px hover:tr-text-gray-700"
                    >
                      <Link href={secondaryButtonHref!}>
                        {secondaryButtonText}
                      </Link>
                    </Button>
                  }
                  elseBlock={
                    <Button
                      onClick={handleSecondaryClick}
                      variant="plain"
                      className="tr-w-full tr-m-0 tr-font-normal hover:tr-text-gray-700"
                    >
                      {secondaryButtonText}
                    </Button>
                  }
                />
              }
            />
          </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
