// user schema
export interface User {
    id: number;
    name: string;
    email: string;
    profile: string;
}


export interface Question {
  title: string;
  tags: string[]; 
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  acceptance: number; 
  id: number;
  author_id: number;
  image: string;
}

export interface QuestionsPagination {
  data: Question[];
  total: number;
  page: number;
  limit: number;
}
