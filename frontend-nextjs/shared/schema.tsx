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

export interface Submission{
  marks_simplicity: number;    
  marks_output: number;         
  marks_responsiveness: number;
  status: string;
  total_score: number;          
  date: string;
  question_id: number;          
  user_id: number;              
  code: string;
  id: number;
}
