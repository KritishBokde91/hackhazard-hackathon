# CodingGeeks Frontend

The frontend application for the Coding Geeks platform, built with Next.js 15 and TypeScript.

## Features

- Modern, responsive UI with Tailwind CSS
- Real-time code submission and feedback
- User authentication with Google OAuth
- Progress tracking and achievements
- Dark/Light mode support
- Mobile-first design

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Zustand for state management
- Axios for API calls
- NextAuth.js for authentication
- Framer Motion for animations
- Lucide React for icons

## Project Structure

```
frontend-nextjs/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── shared/          # Shared types and schemas
└── public/          # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Component Structure

Components are organized using the following pattern:
```typescript
// components/ComponentName/
├── index.tsx        # Main component
├── styles.ts        # Component-specific styles
└── types.ts         # TypeScript interfaces
```

### State Management

The application uses Zustand for state management. Stores are located in `hooks/stores/`.

Example store:
```typescript
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  login: () => void
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: () => set({ user: { /* ... */ } }),
  logout: () => set({ user: null }),
}))
```

### API Integration

API calls are made using Axios with a configured instance in `api.ts`:

```typescript
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
```

## Styling

The application uses Tailwind CSS for styling. Custom components are built using:
- Tailwind CSS utility classes
- Custom CSS in `styles` directory
- Component-specific styles

## Authentication

Authentication is handled using:
- Google OAuth
- JWT tokens stored in cookies
- Protected routes using middleware

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting platform (e.g., Vercel):
```bash
vercel deploy
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is licensed under the MIT License.
