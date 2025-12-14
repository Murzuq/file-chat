import React from 'react';
import { MessageSquare, Plus, Trash2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for Phase 2 (Static UI)
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
        'flex h-full w-64 flex-col border-r bg-gray-50/50 pb-4 dark:bg-gray-900/50',
        className
      )}
    >
      {/* Header / New Chat Button */}
      <div className='p-4'>
        <button
          className={cn(
            'flex w-full items-center justify-start gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900'
          )}
        >
          <Plus className='text-primary h-4 w-4' />
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
                  'group flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                  chat.id === '1'
                    ? 'text-primary bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                <div className='flex items-center gap-2 overflow-hidden'>
                  <FileText className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{chat.title}</span>
                </div>

                {/* Delete button (only visible on hover for cleaner look) */}
                <Trash2 className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500' />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / User Info (Optional placeholder) */}
      <div className='mt-auto border-t p-4'>
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <div className='h-8 w-8 rounded-full bg-gray-200'></div>
          <div className='flex flex-col'>
            <span className='text-foreground font-medium'>User</span>
            <span className='text-xs'>Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
