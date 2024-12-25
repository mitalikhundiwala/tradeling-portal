import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

// Enum for different notification types
export enum NOTIFICATION_TYPE {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
}

export interface IToastProps {
  title: string;
  description?: string;
  type?: NOTIFICATION_TYPE;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number; // in milliseconds
}

export const useToast = () => {
  // Function to show the toast notification
  const showToast = useCallback(
    ({
      title,
      description,
      type = NOTIFICATION_TYPE.INFO,
      position = "top-right",
      duration = 5000,
    }: IToastProps) => {
      const defaultToastOptions: ToastOptions = {
        position,
        autoClose: type === NOTIFICATION_TYPE.ERROR ? false : duration, // No auto-close for ERROR type
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      // Custom HTML content for the toast
      const customToastContent = (
        <div
          className={`${
            type === NOTIFICATION_TYPE.ERROR
              ? "bg-red-500 text-white"
              : type === NOTIFICATION_TYPE.SUCCESS
                ? "bg-green-500 text-white"
                : type === NOTIFICATION_TYPE.INFO
                  ? "bg-blue-500 text-white"
                  : "bg-yellow-500 text-black"
          } p-4 rounded flex items-center space-x-2`}
        >
          <div className="flex-1">
            <h6 className="font-semibold text-lg">{title}</h6>
            {description && <p className="text-sm">{description}</p>}
          </div>
        </div>
      );

      // Show the toast with the same HTML structure but different duration for each type
      toast(customToastContent, defaultToastOptions);
    },
    [],
  );

  return { showToast };
};
