
export interface NoteFile {
  id: string;
  name: string;
  size: string;
  content: string;
  url: string;
  uploadDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  sourceDocId?: string;
}

export interface AppState {
  documents: NoteFile[];
  activeDocId: string | null;
  messages: ChatMessage[];
  isProcessing: boolean;
}
