import { google } from '@ai-sdk/google';
import { streamText, embedMany } from 'ai'; // Removed convertToCoreMessages
import { getPineconeClient } from '@/lib/pinecone';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Get the user's latest question
    const lastMessage = messages[messages.length - 1];
    const question = lastMessage.content;

    console.log('Processing Question:', question);

    // 2. Generate Embedding
    const { embeddings } = await embedMany({
      model: google.textEmbedding('text-embedding-004'),
      values: [question],
    });
    const questionEmbedding = embeddings[0];

    // 3. Search Pinecone
    const client = getPineconeClient();
    const index = client.Index(process.env.PINECONE_INDEX_NAME!);

    const queryResponse = await index.namespace('default').query({
      vector: questionEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    const matches = queryResponse.matches || [];

    // Log matches for debugging
    console.log(`Found ${matches.length} matches in Pinecone`);

    const contextText = matches
      .map((match) => match.metadata?.text || '')
      .join('\n\n---\n\n');

    const systemPrompt = `
      You are a helpful PDF assistant.
      Use the following pieces of context to answer the user's question.
      If the answer is not in the context, say "I cannot find that information in the document."
      
      CONTEXT:
      ${contextText}
    `;

    // FIX: Manually format messages to ensure they are clean 'CoreMessages'
    // This fixes the "reading 'map'" error in the SDK
    const coreMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    }));

    // 4. Stream the response
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: coreMessages, // Pass our clean array here
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat' }), {
      status: 500,
    });
  }
}
