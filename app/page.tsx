'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import FileUpload from '@/components/FileUpload';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string>('');

  const handleUploadComplete = (fileName: string) => {
    setCurrentFileName(fileName);
    setIsChatOpen(true); // Automatically switch to chat view
  };

  return (
    <div className='bg-muted/40 flex h-screen w-full overflow-hidden'>
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      <main className='bg-background relative flex h-full w-full flex-1 flex-col'>
        <header className='bg-background/95 flex h-14 items-center justify-between border-b px-6 backdrop-blur'>
          <h2 className='max-w-75 truncate text-sm font-semibold'>
            {isChatOpen ? currentFileName || 'Chat' : 'New Chat'}
          </h2>
          <div className='flex items-center gap-2'>
            {/* We can remove the test button now that we have real logic */}
            {isChatOpen && (
              <button
                onClick={() => setIsChatOpen(false)}
                className='text-muted-foreground hover:text-primary mr-4 text-xs'
              >
                Upload New
              </button>
            )}
            <ThemeToggle />
          </div>
        </header>

        {isChatOpen ? (
          <>
            <MessageList />
            <div className='bg-background border-t'>
              <ChatInput />
            </div>
          </>
        ) : (
          // Pass the handler here
          <FileUpload onUploadComplete={handleUploadComplete} />
        )}
      </main>
    </div>
  );
}
