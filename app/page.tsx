import Sidebar from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle'; // Importing the toggle for testing

export default function Home() {
  return (
    <div className='bg-background text-foreground flex h-screen w-full overflow-hidden'>
      {/* Sidebar - Hidden on mobile, visible on medium screens and up */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className='bg-background flex h-full w-full flex-1 flex-col'>
        {/* Top Bar (Just for the toggle right now) */}
        <div className='flex justify-end border-b p-4'>
          <ThemeToggle />
        </div>

        {/* Placeholder Content */}
        <div className='text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2'>
          <p className='text-foreground text-lg font-semibold'>Chat Area</p>
          <p>Select a file to start chatting.</p>
        </div>
      </main>
    </div>
  );
}
