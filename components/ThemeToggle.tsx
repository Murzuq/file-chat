'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  // resolvedTheme handles "system" preference (e.g., if system is dark, resolvedTheme is 'dark')
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect ensures this runs only on the client, preventing hydration mismatch errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // While loading, render a placeholder (or nothing) to prevent layout shift
  if (!mounted) {
    return <div className={cn('h-9 w-9 opacity-0', className)} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'bg-background text-foreground hover:bg-muted focus-visible:ring-ring flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none',
        className
      )}
      aria-label='Toggle theme'
    >
      {isDark ? (
        <Moon className='text-foreground h-4 w-4' />
      ) : (
        <Sun className='text-foreground h-4 w-4' />
      )}
    </button>
  );
}
