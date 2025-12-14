'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox, FileText, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUploadComplete?: (fileName: string) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        // 1. Prepare the form data
        const formData = new FormData();
        formData.append('file', file);

        // 2. Send to our backend API
        const response = await fetch('/api/ingest', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const data = await response.json();
        console.log('Ingestion success:', data);

        // 3. Notify parent component
        if (onUploadComplete) {
          onUploadComplete(file.name);
        }
      } catch (err) {
        console.error(err);
        setError('Error uploading file. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading, // Disable drag/drop while uploading
  });

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div
        {...getRootProps()}
        className={cn(
          'group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-8 py-12 text-center transition-all',
          isDragActive
            ? 'border-primary bg-primary/5 ring-primary ring-1'
            : 'border-muted-foreground/25 bg-muted/5 hover:bg-muted/10',
          uploading && 'cursor-not-allowed opacity-50',
          'h-64 w-full max-w-lg cursor-pointer'
        )}
      >
        <input {...getInputProps()} />

        {/* Icon State */}
        <div className='bg-background ring-border mb-4 rounded-full p-4 shadow-sm ring-1'>
          {uploading ? (
            <Loader2 className='text-primary h-8 w-8 animate-spin' />
          ) : error ? (
            <AlertCircle className='text-destructive h-8 w-8' />
          ) : isDragActive ? (
            <FileText className='text-primary h-8 w-8 animate-bounce' />
          ) : (
            <Inbox className='text-muted-foreground h-8 w-8' />
          )}
        </div>

        {/* Text Feedback */}
        <div className='space-y-1'>
          {error ? (
            <p className='text-destructive text-sm font-medium'>{error}</p>
          ) : (
            <p className='text-foreground text-sm font-medium'>
              {uploading ? (
                'Ingesting document... this may take a moment.'
              ) : isDragActive ? (
                <span className='text-primary'>Drop it here!</span>
              ) : (
                <>
                  <span className='text-primary'>Click to upload</span> or drag
                  and drop
                </>
              )}
            </p>
          )}

          <p className='text-muted-foreground text-xs'>PDFs only (max 10MB)</p>
        </div>
      </div>
    </div>
  );
}
