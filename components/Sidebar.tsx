
import React from 'react';
import { NoteFile } from '../types';
import { extractTextFromPdf, formatFileSize } from '../services/pdfService';

interface SidebarProps {
  documents: NoteFile[];
  activeDocId: string | null;
  onDocSelect: (id: string) => void;
  onUpload: (newDoc: NoteFile) => void;
  isProcessing: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  documents, 
  activeDocId, 
  onDocSelect, 
  onUpload,
  isProcessing 
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractTextFromPdf(file);
      const newDoc: NoteFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        content: text,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toLocaleDateString()
      };
      onUpload(newDoc);
    } catch (error) {
      console.error("Error processing PDF:", error);
      alert("Failed to parse PDF. Please try another file.");
    }
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-lg leading-tight">NoteSage</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">AI Study Partner</p>
          </div>
        </div>

        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-3 px-4 rounded-xl font-semibold transition-all group disabled:opacity-50"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload Notes
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="application/pdf" 
          className="hidden" 
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Your Library</h3>
        {documents.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm text-slate-400">No documents yet. Start by uploading class notes.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onDocSelect(doc.id)}
                className={`w-full text-left p-3 rounded-xl transition-all group ${
                  activeDocId === doc.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${activeDocId === doc.id ? 'text-indigo-200' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${activeDocId === doc.id ? 'text-white' : 'text-slate-900'}`}>{doc.name}</p>
                    <p className={`text-xs ${activeDocId === doc.id ? 'text-indigo-100' : 'text-slate-400'}`}>{doc.size} • {doc.uploadDate}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Developer Access</p>
            <p className="text-[10px] text-slate-400">Project Maintainer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
