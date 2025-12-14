import Sidebar from '@/components/Sidebar';
import MessageList from '@/components/MessageList';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className='bg-muted/40 flex h-screen w-full overflow-hidden'>
      {/* Sidebar */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <main className='bg-background relative flex h-full w-full flex-1 flex-col'>
        {/* Header */}
        <header className='bg-background/95 supports-backdrop-filter:bg-background/60 flex h-14 items-center justify-between border-b px-6 backdrop-blur'>
          <h2 className='text-sm font-semibold'>Q3 Financial Report.pdf</h2>
          <ThemeToggle />
        </header>

        {/* Messages - Takes all available space */}
        <MessageList />
      </main>
    </div>
  );
}
