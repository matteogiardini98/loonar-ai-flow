
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface DocumentCardProps {
  document: Document;
  onDocumentOpen: (document: Document) => void;
}

const DocumentCard = ({ document, onDocumentOpen }: DocumentCardProps) => {
  return (
    <Card
      className="w-64 h-24 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex-shrink-0"
      onClick={() => onDocumentOpen(document)}
    >
      <CardContent className="p-4 h-full flex items-center">
        <div className="flex items-start gap-3 w-full">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
              {document.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{document.type}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{document.lastModified}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
