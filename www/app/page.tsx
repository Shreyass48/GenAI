export default function Home() {
  return (
    <main className="h-dvh overflow-hidden">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* The ChatContainer is a client component that manages state and API calls */}
        {/* @ts-expect-error Server/Client boundary */}
        <ChatPageContent />
      </div>
    </main>
  );
}

function ChatPageContent() {
  // Imported lazily to keep the main page.tsx simple
  const { ChatContainer } =
    require("./components/ChatContainer") as typeof import("./components/ChatContainer");
  return <ChatContainer />;
}
