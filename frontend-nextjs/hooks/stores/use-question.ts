"use client";
import { create } from "zustand";
import instance from "@/api";
import { AxiosError } from "axios";
import { useNotification } from "@/hooks/stores/use-notification";
import { Question, QuestionsPagination } from "@/shared/schema";

interface QuestionStore {
  loading: boolean;
  question: Question | null;
  questions: Question[] | null;
  getQuestion: (id : number) => Promise<Question | null>;
  getQuestions: (page : number) => Promise<Question[] | null>;
}


export const useQuestion = create<QuestionStore>((set) => ({
  loading: false,
  question: null,
  questions: null,
  getQuestion: async (id) => {
    set({ loading: true });
    try {
      const response = await instance.get<Question>("/question/" + id);
      set({ question: response.data });
      return response.data;
    } catch (error) {
      useNotification.getState().setError(error as AxiosError);
      return null;
    }
    finally {
      set({ loading: false });
    }
  },
  getQuestions: async (page) => {
    set({ loading: true });
    try {
      const response = await instance.get<QuestionsPagination>("/questions?limit=10&page=" + page);
      set({ questions: response.data.data });
      return response.data.data;
    } catch (error) {
      useNotification.getState().setError(error as AxiosError);
      return null;
    }
    finally {
      set({ loading: false });
    }
  },
}));
