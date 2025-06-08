
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Save } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface DocumentSearchBarProps {
  onDocumentOpen: (document: Document) => void;
}

const DocumentSearchBar = ({ onDocumentOpen }: DocumentSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock documents from library
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'Construction Project RFP - City Hall',
      content: 'The City of Springfield is seeking qualified contractors for the construction of a new city hall building...',
      type: 'RFP',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'IT Infrastructure Upgrade Proposal',
      content: 'This proposal outlines our approach to upgrading the existing IT infrastructure...',
      type: 'Proposal',
      lastModified: '2024-01-10'
    },
    {
      id: '3',
      name: 'Environmental Consulting RFP',
      content: 'Request for Proposal for environmental consulting services for the Green Valley development project...',
      type: 'RFP',
      lastModified: '2024-01-08'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = mockDocuments.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleDocumentSelect = (document: Document) => {
    onDocumentOpen(document);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents to open..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {searchResults.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleDocumentSelect(doc)}
                  className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.type} • {doc.lastModified}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Document
        </Button>
        
        <Button className="bg-black text-white hover:bg-gray-800">
          <Save className="h-4 w-4 mr-2" />
          Save All
        </Button>
      </div>
    </div>
  );
};

export default DocumentSearchBar;
