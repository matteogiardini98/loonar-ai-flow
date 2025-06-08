
import React, { useState } from 'react';
import { FileEdit } from 'lucide-react';
import DocumentSearchBar from './DocumentSearchBar';
import DocumentTabs from './DocumentTabs';
import DocumentEditor from './DocumentEditor';
import AIAssistantPanel from './AIAssistantPanel';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

const WorkspaceView = () => {
  const [openDocuments, setOpenDocuments] = useState<Document[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleDocumentOpen = (document: Document) => {
    const isAlreadyOpen = openDocuments.find(doc => doc.id === document.id);
    if (!isAlreadyOpen) {
      setOpenDocuments(prev => [...prev, document]);
    }
    setActiveDocumentId(document.id);
  };

  const handleDocumentClose = (documentId: string) => {
    setOpenDocuments(prev => prev.filter(doc => doc.id !== documentId));
    if (activeDocumentId === documentId) {
      const remainingDocs = openDocuments.filter(doc => doc.id !== documentId);
      setActiveDocumentId(remainingDocs.length > 0 ? remainingDocs[0].id : null);
    }
  };

  const handleDocumentUpdate = (documentId: string, newContent: string) => {
    setOpenDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, content: newContent, lastModified: new Date().toISOString() }
          : doc
      )
    );
  };

  const activeDocument = openDocuments.find(doc => doc.id === activeDocumentId);

  return (
    <div className="h-full flex flex-col">
      {/* Header with search and controls */}
      <div className="border-b border-gray-200 p-4">
        <DocumentSearchBar onDocumentOpen={handleDocumentOpen} />
      </div>

      {/* Document tabs */}
      {openDocuments.length > 0 && (
        <DocumentTabs
          documents={openDocuments}
          activeDocumentId={activeDocumentId}
          onDocumentSelect={setActiveDocumentId}
          onDocumentClose={handleDocumentClose}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Document editor */}
        <div className="flex-1">
          {activeDocument ? (
            <DocumentEditor
              document={activeDocument}
              onDocumentUpdate={handleDocumentUpdate}
              onToggleAIAssistant={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileEdit className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No document open</h3>
                <p>Search for a document above to start editing</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        {isAIAssistantOpen && activeDocument && (
          <AIAssistantPanel
            document={activeDocument}
            onClose={() => setIsAIAssistantOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkspaceView;
