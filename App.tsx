
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import DocumentViewer from './components/DocumentViewer';
import { AppState, NoteFile, ChatMessage } from './types';
import { INITIAL_DOCS } from './initialDocs';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    documents: INITIAL_DOCS,
    activeDocId: null,
    messages: [],
    isProcessing: false
  });

  const [viewingDoc, setViewingDoc] = useState<NoteFile | null>(null);

  const handleUpload = (newDoc: NoteFile) => {
    setState(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc],
      activeDocId: newDoc.id
    }));
  };

  const handleDocSelect = (id: string) => {
    const doc = state.documents.find(d => d.id === id);
    if (doc) setViewingDoc(doc);
  };

  const handleSendMessage = (msg: ChatMessage) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, msg]
    }));
  };

  const handleUpdateLastMessage = (text: string) => {
    setState(prev => {
      const newMessages = [...prev.messages];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          text
        };
      }
      return { ...prev, messages: newMessages };
    });
  };

  const setIsProcessing = (val: boolean) => {
    setState(prev => ({ ...prev, isProcessing: val }));
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans antialiased text-slate-900">
      <Sidebar 
        documents={state.documents}
        activeDocId={state.activeDocId}
        onDocSelect={handleDocSelect}
        onUpload={handleUpload}
        isProcessing={state.isProcessing}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow 
          messages={state.messages}
          documents={state.documents}
          onSendMessage={handleSendMessage}
          onUpdateLastMessage={handleUpdateLastMessage}
          isProcessing={state.isProcessing}
          setIsProcessing={setIsProcessing}
          onViewDoc={(doc) => setViewingDoc(doc)}
        />
      </main>

      {viewingDoc && (
        <DocumentViewer 
          doc={viewingDoc} 
          onClose={() => setViewingDoc(null)} 
        />
      )}
    </div>
  );
};

export default App;
