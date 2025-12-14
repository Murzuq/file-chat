import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

// Mock Data for UI dev
export const MOCK_MESSAGES = [
  {
    id: '1',
    role: 'system',
    content:
      'Hello! I am your PDF assistant. Upload a document to get started.',
  },
  {
    id: '2',
    role: 'user',
    content:
      'I just uploaded the financial report. Can you summarize the key findings for Q3?',
  },
  {
    id: '3',
    role: 'assistant', // 'assistant' is the standard AI term
    content:
      'Based on the Q3 Financial Report, here are the key findings:\n\n1. **Revenue Growth:** Total revenue increased by 15% year-over-year.\n2. **Cost Reduction:** Operational costs were reduced by 8% due to supply chain optimization.\n3. **Net Profit:** The net profit margin stands at 22%, exceeding the initial forecast of 18%.',
  },
];

interface MessageProps {
  role: string;
  content: string;
}

const MessageBubble = ({ role, content }: MessageProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm',
          isUser ? 'bg-background' : 'bg-primary text-primary-foreground'
        )}
      >
        {isUser ? <User className='h-4 w-4' /> : <Bot className='h-4 w-4' />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-1 rounded-lg px-4 py-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground border'
        )}
      >
        {/* We use whitespace-pre-wrap to handle newlines in AI responses */}
        <div className='leading-relaxed whitespace-pre-wrap'>{content}</div>
      </div>
    </div>
  );
};

export default function MessageList() {
  return (
    <div className='flex flex-1 flex-col gap-2 overflow-y-auto p-4 pb-20'>
      {MOCK_MESSAGES.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
