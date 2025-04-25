"use client";
import { create } from "zustand";
import instance from "@/api";
import { User } from "@/shared/schema";
import { AxiosError } from "axios";
import { useNotification } from "@/hooks/stores/use-notification";

type AuthStore = {
    loading: boolean;
    isAuthChecking: boolean;
    login: (path: string) => void;
    logout: () => void;
    user: User | null;
    getUser: () => Promise<User | null>;
    checkAuth: () => Promise<void>;
    updateUser: (data: FormData) => Promise<User | null>;
};

export const useAuth = create<AuthStore>((set, get) => ({
    loading: false,
    isAuthChecking: false,
    user: null,
    getUser: async () => {
        set({ loading: true });
        try {
            const response = await instance.get<User>("/user/me");
            set({ user: response.data });
            return response.data;
        } catch (error) {
            useNotification.getState().setError(error as AxiosError);
            return null;
        }
        finally {
            set({ loading: false });
        }
    },
    checkAuth: async () => {
        set({ isAuthChecking: true });
        await get().getUser();
        set({ isAuthChecking: false });
    },
    login: (path = "/") => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login/google?redirect=${process.env.NEXT_PUBLIC_SITE_URL + path}`;
    },

    logout: async () => {
        instance.post("/logout").then(res => {
            if (res.status === 200) {
                set({ user: null });
            }
        }
        );

    },
    updateUser: async (data: FormData) => {
        try {
            set({ loading: true });
            const response = await instance.patch<User>("/user/me", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            set({ user: response.data });
            useNotification.getState().setMessage("Profile Updated Successfully")
            return response.data;
        } catch (error) {
            useNotification.getState().setError(error as AxiosError);
            return null;
        } finally {
            set({ loading: false });

        }
    },

}));