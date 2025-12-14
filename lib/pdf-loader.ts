import PDFParser from 'pdf2json';

export async function getChunkedDocsFromPDF(pdfBuffer: Buffer) {
  try {
    // 1. Parse the PDF using pdf2json
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new (PDFParser as any)(null, 1); // 1 = text only

      pdfParser.on('pdfParser_dataError', (errData: any) => {
        reject(errData.parserError);
      });

      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        // Extract raw text content from the JSON structure
        const rawText = (pdfParser as any).getRawTextContent();
        resolve(rawText);
      });

      pdfParser.parseBuffer(pdfBuffer);
    });

    // 2. Clean the text (pdf2json results often need cleanup)
    const cleanText = text
      .replace(/----------------Page \(\d+\) Break----------------/g, '')
      .replace(/\r\n/g, ' ');

    // 3. Split text into smaller chunks
    const chunks = splitTextIntoChunks(cleanText, 1000);

    return chunks;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  let currentChunk = '';

  // Split by periods to attempt sentence preservation
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
