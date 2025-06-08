
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Clock, Lightbulb } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface AIAssistantPanelProps {
  document: Document;
  onClose: () => void;
}

const AIAssistantPanel = ({ document, onClose }: AIAssistantPanelProps) => {
  const [message, setMessage] = useState('');

  const recentInstructions = [
    'Make the introduction more engaging',
    'Add technical specifications section',
    'Improve the executive summary',
    'Format as bullet points'
  ];

  const documentInsights = [
    'Document is 85% complete',
    'Missing budget section',
    'Consider adding timeline',
    'Strong technical content'
  ];

  const quickActions = [
    'Add executive summary',
    'Generate table of contents',
    'Create budget section',
    'Add compliance checklist'
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <span className="font-medium text-lg">Loona</span>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Document insights */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Document Insights
          </h3>
          <div className="space-y-2">
            {documentInsights.map((insight, index) => (
              <div key={index} className="text-sm text-gray-600 p-2 bg-blue-50 rounded">
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent instructions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Instructions
          </h3>
          <div className="space-y-2">
            {recentInstructions.map((instruction, index) => (
              <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                {instruction}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            placeholder="Ask Loona about this document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-black text-white hover:bg-gray-800">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
