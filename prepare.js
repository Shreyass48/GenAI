import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export async function indexTheDocuments({ filePath }) {
  // STEP 1 : load the PDF document
  const loader = new PDFLoader(filePath, { splitPages: false });
  const doc = await loader.load();

  // STEP 2 : split the document into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const texts = await splitter.splitText(doc[0].pageContent);

  const documents = texts?.map((chunk) => {
    return {
      pageContent: chunk,
      metadata: doc[0].metadata,
    };
  });
  console.log(documents);

  // STEP 3 : create vector embeddings for each chunk and store in vector database
  await vectorStore.addDocuments(documents);
}
