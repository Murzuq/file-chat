'use client';

import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <div className='mx-auto w-full max-w-3xl p-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-background focus-within:ring-ring relative flex items-center rounded-xl border shadow-sm focus-within:ring-1'
      >
        <input
          value={input}
          onChange={handleInputChange}
          className='placeholder:text-muted-foreground flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Ask a question about your file...'
          autoFocus
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading || !input?.trim()}
          className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Send className='h-4 w-4' />
          )}
          <span className='sr-only'>Send</span>
        </button>
      </form>
    </div>
  );
}
