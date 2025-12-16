# File Chat 📄💬

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white)

**File Chat** is a modern Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and have natural conversations with them. Built with Next.js 16, Google Gemini, and Pinecone, it transforms static documents into interactive knowledge bases.

## 🚀 Features

- **PDF Ingestion:** Drag-and-drop upload that parses text and generates vector embeddings.
- **AI-Powered Chat:** Chat with your document using Google's **Gemini 1.5 Flash** model.
- **Real-time Streaming:** Answers stream in token-by-token for a responsive experience.
- **Vector Search:** Uses **Pinecone** to find the exact paragraphs relevant to your question.
- **Modern UI:** Clean, responsive interface built with **Tailwind CSS** and **Lucide Icons**.
- **Dark Mode:** Fully supported system-aware dark/light themes.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI Model:** Google Gemini API (via Vercel AI SDK)
- **Vector Database:** Pinecone
- **PDF Parsing:** `pdf2json`

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v18 or higher)
- A **Google AI Studio** API Key (for Gemini)
- A **Pinecone** API Key and Index

## ⚙️ Environment Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Murzuq/file-chat.git
    cd file-chat
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create environment variables:**
    Create a file named `.env.local` in the root directory and add your keys:

    ```env
    # Google Gemini API Key (https://aistudio.google.com/)
    GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

    # Pinecone API Key (https://app.pinecone.io/)
    PINECONE_API_KEY=your_pinecone_api_key_here

    # Pinecone Index Name (Ensure dimensions are 768)
    PINECONE_INDEX_NAME=file-chat
    ```

4.  **Prepare Pinecone:**
    - Create an index named `file-chat`.
    - Set dimensions to **768** (Critical for Gemini `text-embedding-004`).
    - Set metric to **Cosine**.

## 🏃‍♂️ Running the App

Start the development server:

```bash
npm run dev
```

Happy coding, Alabi Murzuq! 🚀🚀🚀🚀
