
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, NoteFile } from '../types';
import { askNoteSageStream } from '../services/geminiService';

interface ChatWindowProps {
  messages: ChatMessage[];
  documents: NoteFile[];
  onSendMessage: (msg: ChatMessage) => void;
  onUpdateLastMessage: (text: string) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onViewDoc: (doc: NoteFile) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  documents, 
  onSendMessage, 
  onUpdateLastMessage,
  isProcessing,
  setIsProcessing,
  onViewDoc
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    const assistantPlaceholder: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'assistant',
      text: '',
      timestamp: new Date()
    };

    onSendMessage(userMsg);
    setInput('');
    setIsProcessing(true);
    onSendMessage(assistantPlaceholder);

    try {
      let fullText = '';
      const stream = askNoteSageStream(input, documents, messages);
      for await (const chunk of stream) {
        fullText += chunk;
        onUpdateLastMessage(fullText);
      }
    } catch (error) {
      console.error("Chat error:", error);
      onUpdateLastMessage("Sorry, I encountered an error while searching your class notes.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getRelevantDocsForMessage = (text: string) => {
    // Basic heuristic to match protocol names in text
    return documents.filter(doc => {
      const slug = doc.name.split(':')[0].toLowerCase().trim();
      return text.toLowerCase().includes(slug);
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fcfcfd] relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 flex items-center px-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-slate-800 tracking-tight">Active Knowledge Base: EMS Protocols</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{documents.length} Docs Indexed</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pt-24 pb-40 px-4 md:px-8 space-y-6 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto mt-12 text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 border border-indigo-100">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome to NoteSage</h2>
            <p className="text-slate-500 max-w-sm mx-auto text-lg">
              I am your AI study partner. I answer strictly based on the NC OEMS protocol notes provided.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto pt-8 text-left">
              {[
                "What is the SIRS criteria for adults?",
                "How do I treat an avulsed tooth?",
                "Tell me about pit viper snake bites",
                "Can I use a central line for dialysis?"
              ].map(q => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="p-4 text-sm bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all text-slate-600 font-semibold"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const relevantDocs = msg.role === 'assistant' ? getRelevantDocsForMessage(msg.text) : [];
            
            return (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[90%] md:max-w-[75%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md ${
                    msg.role === 'user' ? 'bg-indigo-600' : 'bg-white border border-slate-200'
                  }`}>
                    {msg.role === 'user' ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    ) : (
                      <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className={`p-5 rounded-3xl shadow-sm text-[15px] leading-relaxed relative ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text || (isProcessing && idx === messages.length - 1 ? 'Reading protocols...' : '')}</div>
                    
                    {msg.role === 'assistant' && !isProcessing && msg.text && relevantDocs.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Source Protocol Citation</p>
                        <div className="flex flex-wrap gap-2">
                          {relevantDocs.map(doc => (
                            <button 
                              key={doc.id}
                              onClick={() => onViewDoc(doc)}
                              className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group text-slate-700"
                            >
                              <div className="bg-red-500 text-white p-1 rounded-md group-hover:scale-110 transition-transform">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v20l7-7h8V2H7z"/></svg>
                              </div>
                              <span className="text-xs font-bold truncate max-w-[180px]">{doc.name}</span>
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#fcfcfd] via-[#fcfcfd] to-transparent z-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative flex gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your class protocols..."
              disabled={isProcessing}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 py-2 text-slate-800 disabled:opacity-50 font-medium"
            />
            <button
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="bg-slate-900 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest opacity-60">Verified Grounding • Class Notes Only</p>
      </div>
    </div>
  );
};

export default ChatWindow;
