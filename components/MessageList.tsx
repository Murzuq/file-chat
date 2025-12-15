import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, Loader2 } from 'lucide-react';

// FIX: Define the type locally to avoid library conflicts
export interface Message {
  id: string;
  role: 'function' | 'system' | 'user' | 'assistant' | 'data' | 'tool';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className='text-muted-foreground flex flex-1 items-center justify-center p-8 text-center'>
        <p>Ask a question about your document to start!</p>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pb-10'>
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        return (
          <div
            key={msg.id}
            className={cn(
              'flex w-full items-start gap-4',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm',
                isUser ? 'bg-background' : 'bg-primary text-primary-foreground'
              )}
            >
              {isUser ? (
                <User className='h-4 w-4' />
              ) : (
                <Bot className='h-4 w-4' />
              )}
            </div>

            <div
              className={cn(
                'flex max-w-[80%] flex-col gap-1 rounded-lg px-4 py-3 text-sm shadow-sm',
                isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground border'
              )}
            >
              <div className='leading-relaxed whitespace-pre-wrap'>
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className='flex w-full items-start gap-4'>
          <div className='bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
            <Loader2 className='h-4 w-4 animate-spin' />
          </div>
          <div className='text-muted-foreground flex items-center text-sm'>
            Thinking...
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
