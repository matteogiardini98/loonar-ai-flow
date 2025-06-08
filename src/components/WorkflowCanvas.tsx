
import React, { useState } from 'react';
import { Plus, Play, Save, Download } from 'lucide-react';
import { quickActions } from './QuickActions';

interface WorkflowStep {
  id: string;
  action: any;
  position: { x: number; y: number };
}

const WorkflowCanvas = () => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [draggedAction, setDraggedAction] = useState<any>(null);

  const handleDragStart = (action: any) => {
    setDraggedAction(action);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedAction) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      action: draggedAction,
      position: { x, y }
    };

    setWorkflowSteps(prev => [...prev, newStep]);
    setDraggedAction(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeStep = (stepId: string) => {
    setWorkflowSteps(prev => prev.filter(step => step.id !== stepId));
  };

  return (
    <div className="flex h-full">
      {/* Left Side Panel */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Workflow Steps</h3>
          <p className="text-sm text-gray-600">Drag actions to the canvas to build your workflow</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {quickActions.map((action) => (
              <div
                key={action.id}
                draggable
                onDragStart={() => handleDragStart(action)}
                className="bg-white border border-gray-200 rounded-lg p-3 cursor-grab hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <action.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {action.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span className="capitalize">{action.type}</span>
                      <span className="mx-1">·</span>
                      <span>{action.steps} step{action.steps > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Controls */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4" />
              Run Workflow
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Save className="h-4 w-4" />
                Save
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-white relative">
        {/* Canvas Header */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Workflow Builder</h2>
              <p className="text-sm text-gray-600">Design your automated workflow by connecting actions</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{workflowSteps.length} steps</span>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div
          className="absolute inset-0 pt-20"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {workflowSteps.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Workflow</h3>
                <p className="text-gray-600 max-w-md">
                  Drag actions from the left panel to this canvas to create your automated workflow.
                  Connect actions to define the sequence of operations.
                </p>
              </div>
            </div>
          )}

          {/* Workflow Steps */}
          {workflowSteps.map((step) => (
            <div
              key={step.id}
              className="absolute bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-w-48"
              style={{
                left: step.position.x,
                top: step.position.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  <step.action.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {step.action.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.action.type} • {step.action.steps} step{step.action.steps > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeStep(step.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
