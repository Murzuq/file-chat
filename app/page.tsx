'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
// Import the type from our component instead of the library
import MessageList, { Message } from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import FileUpload from '@/components/FileUpload';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string>('');

  // Manual State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Send to Backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.body) throw new Error('No response body');

      // 3. Prepare Bot Message
      const botMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, role: 'assistant', content: '' },
      ]);

      // 4. Decode the Raw Text Stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        // SIMPLIFIED: Just decode the text directly. No parsing needed!
        const chunkValue = decoder.decode(value, { stream: true });
        accumulatedText += chunkValue;

        // Update UI
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'assistant') {
            lastMsg.content = accumulatedText;
          }
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = (fileName: string) => {
    setCurrentFileName(fileName);
    setIsChatOpen(true);
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
            <MessageList messages={messages} isLoading={isLoading} />
            <div className='bg-background border-t'>
              <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </>
        ) : (
          <FileUpload onUploadComplete={handleUploadComplete} />
        )}
      </main>
    </div>
  );
}
