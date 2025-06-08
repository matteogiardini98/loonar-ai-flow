import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AssistantInterface from '@/components/AssistantInterface';
import QuickActions from '@/components/QuickActions';
import ActionWorkspace from '@/components/ActionWorkspace';
import ActionModal from '@/components/ActionModal';
import LibraryView from '@/components/LibraryView';
import AnalyticsView from '@/components/AnalyticsView';
import WorkflowCanvas from '@/components/WorkflowCanvas';

const Index = () => {
  const [activeTab, setActiveTab] = useState('loona');
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<any>(null);

  const handleActionClick = (action: any) => {
    // Open modal for recommended actions in Loona tab
    if (activeTab === 'loona') {
      setModalAction(action);
      setIsActionModalOpen(true);
    } else {
      // Keep existing behavior for other tabs
      setSelectedAction(action);
    }
  };

  const handleModalExecute = (formData: any) => {
    console.log('Executing action from modal:', formData);
    setIsExecuting(true);
    
    // Simulate execution
    setTimeout(() => {
      setIsExecuting(false);
      setIsActionModalOpen(false);
      setModalAction(null);
      // Here you would typically handle the actual execution results
    }, 2000);
  };

  const handleModalClose = () => {
    setIsActionModalOpen(false);
    setModalAction(null);
  };

  const handleActionExecute = (formData: any) => {
    console.log('Executing action:', formData);
    setIsExecuting(true);
    
    // Simulate execution
    setTimeout(() => {
      setIsExecuting(false);
      setSelectedAction(null);
      // Here you would typically handle the actual execution results
    }, 2000);
  };

  const handleCloseAction = () => {
    setSelectedAction(null);
    setIsExecuting(false);
  };

  const renderMainContent = () => {
    if (selectedAction) {
      return (
        <ActionWorkspace
          action={selectedAction}
          onClose={handleCloseAction}
          onExecute={handleActionExecute}
        />
      );
    }

    switch (activeTab) {
      case 'loona':
        return (
          <div className="space-y-8">
            <AssistantInterface />
            <QuickActions 
              onActionClick={handleActionClick} 
              showRecommended={true}
              showAllActions={false}
            />
          </div>
        );
      case 'quick-actions':
        return (
          <QuickActions 
            onActionClick={handleActionClick}
            showRecommended={false}
            showAllActions={true}
          />
        );
      case 'workflows':
        return <WorkflowCanvas />;
      case 'library':
        return <LibraryView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'help':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Help & Support</h2>
            <p className="text-gray-600">Get help with using Loonar and best practices for proposal management.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Configure your Loonar workspace and preferences.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {activeTab === 'workflows' ? (
            <WorkflowCanvas />
          ) : (
            <div className="max-w-7xl mx-auto p-6">
              {renderMainContent()}
            </div>
          )}
        </div>
      </main>
      
      {/* Action Modal */}
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={handleModalClose}
        action={modalAction}
        onExecute={handleModalExecute}
      />
      
      {isExecuting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-900">Executing task...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
