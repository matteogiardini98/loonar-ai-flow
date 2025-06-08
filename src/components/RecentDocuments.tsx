
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import DocumentCard from './DocumentCard';
import { mockDocuments } from '@/data/mockDocuments';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface RecentDocumentsProps {
  onDocumentOpen: (document: Document) => void;
}

const RecentDocuments = ({ onDocumentOpen }: RecentDocumentsProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recently used</h3>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {mockDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onDocumentOpen={onDocumentOpen}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentDocuments;
