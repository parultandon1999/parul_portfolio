import { toast as sonnerToast } from "sonner";
import type { ToastType, ToastOptions } from "@/hooks/useUniversalToast";

/**
 * Standalone toast utility for use outside of React components
 * Can be imported and used anywhere in the application
 */

const showToast = (message: string, type: ToastType = "default", options?: ToastOptions) => {
  const { title, description, duration, action } = options || {};

  const toastMessage = title ? `${title}${description ? ": " + description : ""}` : message;
  const toastDescription = title && description ? undefined : description;

  switch (type) {
    case "success":
      return sonnerToast.success(toastMessage, {
        description: toastDescription,
        duration,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
    case "error":
      return sonnerToast.error(toastMessage, {
        description: toastDescription,
        duration,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
    case "info":
      return sonnerToast.info(toastMessage, {
        description: toastDescription,
        duration,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
    case "warning":
      return sonnerToast.warning(toastMessage, {
        description: toastDescription,
        duration,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
    default:
      return sonnerToast(toastMessage, {
        description: toastDescription,
        duration,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
  }
};

export const toast = {
  success: (message: string, options?: ToastOptions) => showToast(message, "success", options),
  error: (message: string, options?: ToastOptions) => showToast(message, "error", options),
  info: (message: string, options?: ToastOptions) => showToast(message, "info", options),
  warning: (message: string, options?: ToastOptions) => showToast(message, "warning", options),
  default: (message: string, options?: ToastOptions) => showToast(message, "default", options),
  dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
};
