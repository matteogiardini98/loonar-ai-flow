
import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
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
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
        <div className="bg-white rounded-lg shadow-xl">
          <ActionWorkspace
            action={action}
            onClose={onClose}
            onExecute={onExecute}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;
