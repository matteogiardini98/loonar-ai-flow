
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ActionWorkspace from '@/components/ActionWorkspace';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: any;
  onExecute: (formData: any) => void;
}

const ActionModal = ({ isOpen, onClose, action, onExecute }: ActionModalProps) => {
  if (!action) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          marginLeft: '8rem', // Half of sidebar width (256px/2) to account for sidebar
          width: 'auto',
          maxWidth: 'calc(100vw - 20rem)' // Account for sidebar width + margins
        }}
      >
        <div className="bg-white rounded-lg shadow-xl relative">
          {/* Remove the default close button and add our custom one */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          
          <ActionWorkspace
            action={action}
            onClose={onClose}
            onExecute={onExecute}
          />
        </div>
      </DialogContent>
      
      {/* Much lighter grey background overlay */}
      <div 
        className="fixed inset-0 z-40 bg-gray-200/40 backdrop-blur-sm"
        onClick={onClose}
      />
    </Dialog>
  );
};

export default ActionModal;
