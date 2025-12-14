'use client';

import { Send } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className='mx-auto w-full max-w-3xl p-4'>
      <form
        className='bg-background focus-within:ring-ring relative flex items-center rounded-xl border shadow-sm focus-within:ring-1'
        onSubmit={(e) => e.preventDefault()} // Prevent reload for now
      >
        <input
          className='placeholder:text-muted-foreground flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Ask a question about your file...'
          autoFocus
        />
        <button
          type='submit'
          className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg focus:ring-1 focus:outline-none'
        >
          <Send className='h-4 w-4' />
          <span className='sr-only'>Send</span>
        </button>
      </form>
      <div className='text-muted-foreground mt-2 text-center text-xs'>
        File Chat AI can make mistakes. Check important info.
      </div>
    </div>
  );
}
