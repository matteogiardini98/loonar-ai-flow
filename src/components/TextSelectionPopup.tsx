
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Wand2, ExpandIcon, FileText, Sparkles } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface TextSelectionPopupProps {
  position: Position;
  selectedText: string;
  isSelecting: boolean;
  onInstruction: (instruction: string) => void;
}

const TextSelectionPopup = ({ position, selectedText, isSelecting, onInstruction }: TextSelectionPopupProps) => {
  const [customInstruction, setCustomInstruction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActions = [
    { label: 'Rewrite', icon: Wand2, instruction: 'Rewrite this text to be clearer and more professional' },
    { label: 'Expand', icon: ExpandIcon, instruction: 'Expand this text with more details and context' },
    { label: 'Summarize', icon: FileText, instruction: 'Summarize this text into key points' },
    { label: 'Make formal', icon: Sparkles, instruction: 'Rewrite this text in a more formal tone' },
  ];

  const handleQuickAction = async (instruction: string) => {
    if (isSelecting) return; // Prevent actions during selection
    
    setIsProcessing(true);
    await onInstruction(instruction);
    setIsProcessing(false);
  };

  const handleCustomInstruction = async () => {
    if (customInstruction.trim() && !isSelecting) {
      setIsProcessing(true);
      await onInstruction(customInstruction);
      setCustomInstruction('');
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSelecting) {
      handleCustomInstruction();
    }
  };

  // Preview mode when actively selecting, interactive mode when selection is complete
  const isPreviewMode = isSelecting;
  const isInteractiveMode = !isSelecting && selectedText.length > 0;

  return (
    <div
      className={`absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[320px] transition-all duration-150 ${
        isPreviewMode ? 'opacity-70 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        pointerEvents: isPreviewMode ? 'none' : 'auto'
      }}
    >
      {/* Selected text preview */}
      <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-700 border-l-4 border-blue-400">
        <span className="font-medium">Selected: </span>
        "{selectedText.length > 50 ? selectedText.substring(0, 50) + '...' : selectedText}"
        {isPreviewMode && (
          <span className="ml-2 text-xs text-gray-500 italic">
            (selecting...)
          </span>
        )}
      </div>

      {/* Custom instruction input - only interactive when not selecting */}
      <div className="mb-3">
        <div className="flex gap-2">
          <Input
            placeholder="Ask Loona"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isPreviewMode || isProcessing}
          />
          <Button
            onClick={handleCustomInstruction}
            disabled={!customInstruction.trim() || isProcessing || isPreviewMode}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick actions - disabled during selection */}
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(action.instruction)}
            disabled={isProcessing || isPreviewMode}
            className="flex items-center gap-2 text-xs"
          >
            <action.icon className="h-3 w-3" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Processing indicator */}
      {isProcessing && (
        <div className="mt-3 flex items-center justify-center text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
          Processing...
        </div>
      )}

      {/* Preview mode indicator */}
      {isPreviewMode && (
        <div className="mt-3 text-xs text-center text-gray-500">
          Release to interact with Loona
        </div>
      )}
    </div>
  );
};

export default TextSelectionPopup;
