
import React from 'react';
import { NoteFile } from '../types';

interface DocumentViewerProps {
  doc: NoteFile;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg text-red-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v20l7-7h8V2H7z"/></svg>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-none">{doc.name}</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Protocol View • {doc.size}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#fdfdfd] custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h1 className="text-3xl font-extrabold text-slate-900">{doc.name}</h1>
              <p className="text-slate-400 text-sm mt-2 italic font-serif">NoteSage Academic Library • Effective Date: Sept 2025</p>
            </div>
            
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-lg">
                {doc.content}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">End of Protocol Documentation</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
