import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className='bg-background flex h-screen w-full overflow-hidden'>
      {/* Sidebar - Hidden on mobile, visible on medium screens and up */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className='flex h-full w-full flex-1 flex-col bg-white dark:bg-gray-950 dark:text-white'>
        {/* Placeholder for now */}
        <div className='text-muted-foreground flex h-full items-center justify-center'>
          Chat Area Coming Soon...
        </div>
      </main>
    </div>
  );
}
