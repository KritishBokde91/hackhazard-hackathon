'use client';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

interface CustomNavBarProps {
  onMenuClick: () => void;
}

export default function CustomNavBar({ onMenuClick }: CustomNavBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center h-16 px-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-4 font-bold text-lg">CodePulse</div>
      </div>
    </header>
  );
}