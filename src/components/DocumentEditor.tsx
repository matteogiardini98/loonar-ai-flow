
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import TextSelectionPopup from './TextSelectionPopup';
import useTextSelection from '@/hooks/useTextSelection';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface DocumentEditorProps {
  document: Document;
  onDocumentUpdate: (documentId: string, newContent: string) => void;
  onToggleAIAssistant: () => void;
}

const DocumentEditor = ({ document, onDocumentUpdate, onToggleAIAssistant }: DocumentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { selectedText, selectionRange, showPopup, popupPosition, isSelecting } = useTextSelection(editorRef);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || '';
    onDocumentUpdate(document.id, newContent);
  };

  const handleAIInstruction = async (instruction: string) => {
    console.log('AI Instruction:', instruction, 'for text:', selectedText);
    // TODO: Implement AI text processing
    // For now, just simulate a change
    if (selectedText && selectionRange) {
      const mockAIResponse = `[AI-modified: ${selectedText}]`;
      // Replace selected text with AI response
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(window.document.createTextNode(mockAIResponse));
        
        // Update document content
        const newContent = editorRef.current?.textContent || '';
        onDocumentUpdate(document.id, newContent);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Document header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">{document.name}</h2>
          <p className="text-sm text-gray-600">{document.type} • Last modified: {document.lastModified}</p>
        </div>
        <Button
          variant="outline"
          onClick={onToggleAIAssistant}
          className="flex items-center gap-2"
        >
          <Bot className="h-4 w-4" />
          Ask Loona
        </Button>
      </div>

      {/* Editor area */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentChange}
          className="h-full p-6 focus:outline-none text-gray-900 leading-relaxed"
          style={{ minHeight: '100%' }}
        >
          {document.content}
        </div>

        {/* Text Selection Popup */}
        {showPopup && selectedText && (
          <TextSelectionPopup
            position={popupPosition}
            selectedText={selectedText}
            isSelecting={isSelecting}
            onInstruction={handleAIInstruction}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;
