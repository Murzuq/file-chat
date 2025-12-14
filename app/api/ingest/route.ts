import { NextRequest, NextResponse } from 'next/server';
import { getChunkedDocsFromPDF } from '@/lib/pdf-loader';
import { getPineconeClient } from '@/lib/pinecone';
import { google } from '@ai-sdk/google';
import { embedMany } from 'ai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileName = file.name;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Parse PDF and split into chunks
    console.log(`Processing file: ${fileName}...`);
    const chunks = await getChunkedDocsFromPDF(buffer);
    console.log(`Split into ${chunks.length} chunks.`);

    // 3. Generate Embeddings using Gemini (via Vercel AI SDK)
    // We use "text-embedding-004" which is the latest standard from Google
    const { embeddings } = await embedMany({
      model: google.textEmbedding('text-embedding-004'),
      values: chunks,
    });

    // 4. Prepare vectors for Pinecone
    const vectors = chunks.map((chunk, i) => ({
      id: `${fileName}-${i}`,
      values: embeddings[i],
      metadata: {
        text: chunk,
        fileName: fileName,
      },
    }));

    // 5. Upload to Pinecone
    const client = getPineconeClient();
    const index = client.Index(process.env.PINECONE_INDEX_NAME!);

    // Pinecone likes batches (namespace is optional but good for organization)
    await index.namespace('default').upsert(vectors);

    console.log('Ingestion complete!');

    return NextResponse.json({ success: true, count: vectors.length });
  } catch (error) {
    console.error('Ingestion failed:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}
