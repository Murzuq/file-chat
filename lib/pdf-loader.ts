import * as pdf from 'pdf-parse';

export async function getChunkedDocsFromPDF(pdfBuffer: Buffer) {
  try {
    // 1. Parse the PDF into text
    const data = await (pdf as any)(pdfBuffer);
    const text = data.text;
    // 2. Split text into smaller chunks (Naive splitting for now)
    // In a real app, you'd use a smarter splitter like RecursiveCharacterTextSplitter
    // but this works great for a tutorial.
    const chunks = splitTextIntoChunks(text, 1000); // 1000 char chunks

    return chunks;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  let currentChunk = '';

  // Simple splitting by sentence/period to keep context together roughly
  const sentences = text.split('. ');

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = '';
    }
    currentChunk += sentence + '. ';
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}
