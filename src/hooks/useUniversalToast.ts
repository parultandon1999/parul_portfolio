import { toast as sonnerToast } from "sonner";

export type ToastType = "default" | "success" | "error" | "info" | "warning";

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Universal toast hook that provides a simple interface for showing notifications
 * Uses Sonner for better UX and theme support
 */
export const useUniversalToast = () => {
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

  return {
    success: (message: string, options?: ToastOptions) => showToast(message, "success", options),
    error: (message: string, options?: ToastOptions) => showToast(message, "error", options),
    info: (message: string, options?: ToastOptions) => showToast(message, "info", options),
    warning: (message: string, options?: ToastOptions) => showToast(message, "warning", options),
    default: (message: string, options?: ToastOptions) => showToast(message, "default", options),
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
};
