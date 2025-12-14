import React from 'react';
import { MessageSquare, Plus, Trash2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const MOCK_CHATS = [
  { id: '1', title: 'Q3 Financial Report.pdf', date: 'Today' },
  { id: '2', title: 'Employee_Handbook_2024.pdf', date: 'Yesterday' },
  { id: '3', title: 'Project_Apollo_Specs.pdf', date: '3 days ago' },
  { id: '4', title: 'Marketing_Strategy_Draft_v2.pdf', date: 'Last week' },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        // Use 'bg-muted/20' or 'bg-secondary' for slight contrast against the main white background
        'bg-muted/30 flex h-full w-64 flex-col border-r pb-4',
        className
      )}
    >
      {/* Header */}
      <div className='p-4'>
        <button
          className={cn(
            // Use 'bg-background' (white in light, black in dark) and 'text-foreground'
            'bg-background hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm transition-colors'
          )}
        >
          <Plus className='h-4 w-4' />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History List */}
      <div className='flex-1 overflow-y-auto px-4 py-2'>
        <div className='space-y-4'>
          <div className='text-muted-foreground px-2 text-xs font-semibold'>
            Recent Files
          </div>
          <div className='space-y-1'>
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                className={cn(
                  'group hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                  // Active state styling
                  chat.id === '1'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <div className='flex items-center gap-2 overflow-hidden'>
                  <FileText className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{chat.title}</span>
                </div>

                <Trash2 className='hover:text-destructive h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-auto border-t p-4'>
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <div className='bg-muted-foreground/20 h-8 w-8 rounded-full'></div>
          <div className='flex flex-col text-left'>
            <span className='text-foreground font-medium'>User</span>
            <span className='text-xs'>Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
