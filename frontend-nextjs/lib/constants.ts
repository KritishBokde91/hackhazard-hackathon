// lib/constants.ts
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;  // Strictly typed
  tags: string[];
}

export const problems: Problem[] = [
  {
    id: '1',
    title: 'Responsive Navbar',
    difficulty: 'medium',  // This will now be type-checked
    tags: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    id: '2',
    title: 'Dark Mode Toggle',
    difficulty: 'easy',    // This will now be type-checked
    tags: ['JavaScript', 'CSS Variables']
  },
  {
    id: '3',
    title: 'Infinite Scroll',
    difficulty: 'hard',    // This will now be type-checked
    tags: ['React', 'API Integration']
  }
];