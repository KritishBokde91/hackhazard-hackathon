"use client";
import { create } from "zustand";
import instance from "@/api";
import { AxiosError } from "axios";
import { useNotification } from "@/hooks/stores/use-notification";
import { Question, QuestionsPagination, Submission } from "@/shared/schema";

interface QuestionStore {
  loading: boolean;
  isSubmitting : boolean;
  question: Question | null;
  questions: Question[] | null;
  submissions : Submission[]  
  submission: Submission | null;
  getQuestion: (id: number) => Promise<Question | null>;
  getQuestions: (page: number) => Promise<Question[] | null>;
  submitCode: (questionId: number, code: string) => Promise<void>
  getSubmissions: (questionId: number) => Promise<Submission[] | null>

}


export const useQuestion = create<QuestionStore>((set, get) => ({
  loading: false,
  question: null,
  questions: null,
  submissions : [] as Submission[],
  submission : null,
  isSubmitting : false,
  getQuestion: async (id) => {
    set({ loading: true });
    const questionInStore = get().questions?.find(q => q.id === id);
    console.log(questionInStore, get().questions);

    if (questionInStore) {
      set({ question: questionInStore, loading: false });
      return questionInStore;
    }
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
  submitCode: async (questionId: number, code: string) => {
    try {
    set({isSubmitting : true})
      const response = await instance.post("submissions/" + questionId, { code });
      const oldSubmissions = get().submissions;
      if (oldSubmissions) {
        const newSubmissions = [response.data , ...oldSubmissions];
        set({ submissions: newSubmissions });
      }
      return response.data;
    } catch (error) {
      useNotification.getState().setError(error as AxiosError);
      return null;
    }
    finally{
      set({isSubmitting : false})
    }
  },
  getSubmissions : async (questionId: number) => {
    set({ loading: true });
    try {
      const response = await instance.get<Submission[]>("/submissions/question/" + questionId);
      set({ submissions: response.data });
      return response.data;
    } catch (error) {
      useNotification.getState().setError(error as AxiosError);
      return null;
    }
    finally {
      set({ loading: false });
    }
  }
}));
