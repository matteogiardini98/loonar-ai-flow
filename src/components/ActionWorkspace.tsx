
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X } from 'lucide-react';

interface ActionWorkspaceProps {
  action: {
    id: string;
    title: string;
    description: string;
    steps: number;
    type: 'output' | 'draft' | 'table';
  };
  onClose: () => void;
  onExecute: (formData: any) => void;
}

const ActionWorkspace = ({ action, onClose, onExecute }: ActionWorkspaceProps) => {
  const [instructions, setInstructions] = useState('');
  const [selectedRFP, setSelectedRFP] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleExecute = () => {
    const formData = {
      instructions,
      selectedRFP,
      uploadedFile,
      additionalInfo,
      actionId: action.id
    };
    onExecute(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <Textarea
            placeholder="Provide specific instructions for this task..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* RFP Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select RFP
          </label>
          <Select value={selectedRFP} onValueChange={setSelectedRFP}>
            <SelectTrigger>
              <SelectValue placeholder="Choose from library or upload new" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rfp-001">Construction Project RFP - City Hall</SelectItem>
              <SelectItem value="rfp-002">IT Infrastructure Upgrade RFP</SelectItem>
              <SelectItem value="rfp-003">Environmental Consulting RFP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                </span>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </label>
          </div>
        </div>

        {/* Additional Information */}
        {action.id === 'compliance-matrix' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sources to Check Compliance Against
            </label>
            <Textarea
              placeholder="Specify which documents or standards to check compliance against..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>
        )}

        {action.id === 'proposal-generation' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template and Tone Preferences
            </label>
            <Textarea
              placeholder="Specify template preferences, tone (formal, persuasive, technical), and any specific sections to emphasize..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Execute Button */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleExecute}
          className="bg-black text-white hover:bg-gray-800"
          disabled={!instructions.trim() && !selectedRFP && !uploadedFile}
        >
          Execute {action.title}
        </Button>
      </div>
    </div>
  );
};

export default ActionWorkspace;
