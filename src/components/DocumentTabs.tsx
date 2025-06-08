
import React from 'react';
import { X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface DocumentTabsProps {
  documents: Document[];
  activeDocumentId: string | null;
  onDocumentSelect: (documentId: string) => void;
  onDocumentClose: (documentId: string) => void;
}

const DocumentTabs = ({ 
  documents, 
  activeDocumentId, 
  onDocumentSelect, 
  onDocumentClose 
}: DocumentTabsProps) => {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="flex overflow-x-auto">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`flex items-center gap-2 px-4 py-2 border-r border-gray-200 cursor-pointer group min-w-0 ${
              activeDocumentId === doc.id
                ? 'bg-white border-b-2 border-b-blue-500'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onDocumentSelect(doc.id)}
          >
            <span className="text-sm font-medium truncate max-w-[200px]" title={doc.name}>
              {doc.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDocumentClose(doc.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-1 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTabs;
