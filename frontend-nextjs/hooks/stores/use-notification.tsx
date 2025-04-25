import { AxiosError } from "axios";
import { create } from "zustand"

interface NotificationStore {
    error: string | null;
    message: string | null;
    setError: (axiosError: AxiosError) => void;
    resetError: () => void;
    setMessage: (message: string) => void;
    resetMessage: () => void;
}

export const useNotification = create<NotificationStore>((set) => ({
    error: null,
    message: null,
    setError: (axiosError) => {
        let errorMessage = "Something went wrong";
        if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
            // Case 1: detail is a string
            if ("detail" in axiosError.response.data && typeof axiosError.response.data.detail === 'string') {
                errorMessage = axiosError.response.data.detail;
            }
            // Case 2: detail is an array of validation errors
            else if ("detail" in axiosError.response.data && Array.isArray(axiosError.response.data.detail) && axiosError.response.data.detail.length > 0) {
                // Extract the message from the first error in the array
                const firstError = axiosError.response.data.detail[0];
                if (firstError && typeof firstError === 'object' && "msg" in firstError) {
                    errorMessage = firstError.msg;
                }
            }
        } else if (axiosError.message) {
            errorMessage = axiosError.message;
        }

        set({ error: errorMessage });
    },
    resetError: () => {
        set({ error: null })
    },
    setMessage: (message) => {
        set({ message: message })
    },
    resetMessage: () => {
        set({ message: null })
    }
}))