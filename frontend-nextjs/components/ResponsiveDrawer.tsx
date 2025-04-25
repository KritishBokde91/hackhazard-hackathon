'use client';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface ResponsiveDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ResponsiveDrawer({ open, onClose }: ResponsiveDrawerProps) {
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4">
          {/* Add your navigation links here */}
        </nav>
      </div>
    </div>
  );
}