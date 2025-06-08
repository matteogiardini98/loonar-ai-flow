
import React, { useState } from 'react';
import { Upload, Library as LibraryIcon, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const AssistantInterface = () => {
  const [query, setQuery] = useState('');

  const handleSendQuery = () => {
    if (query.trim()) {
      console.log('Sending query:', query);
      // TODO: Implement actual query processing
      setQuery('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Loona</h1>
        <p className="text-gray-600">Loona, your proposal execution assistant</p>
        <p className="text-sm text-gray-500">
          Quickly search, analyze, or understand material, then ask follow-up questions
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <Textarea
          placeholder="Ask Loona anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[120px] resize-none border-0 bg-transparent text-base placeholder:text-gray-500 focus:ring-0"
        />
        
        {/* Document Selection Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white">
            <Paperclip className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Drag or click to upload files</h3>
            <p className="text-xs text-gray-500">Choose files from your computer or a Vault project</p>
          </div>

          {/* Knowledge Source */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <LibraryIcon className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-900">Choose knowledge source</h3>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Previous RFPs, offers, project work, and more
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              Select from Library
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload size={16} />
              Load prompt
            </Button>
            <Button variant="outline" size="sm">
              Save prompt
            </Button>
          </div>
          
          <Button 
            onClick={handleSendQuery}
            className="bg-black text-white hover:bg-gray-800 gap-2"
            disabled={!query.trim()}
          >
            Ask Loona
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantInterface;
