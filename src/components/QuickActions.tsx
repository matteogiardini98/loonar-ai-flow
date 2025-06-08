
import React from 'react';
import { FileSearch, CheckSquare, FileText, Users, Send, BarChart3, MessageSquare, Edit, Eye, Database } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  steps: number;
  type: 'output' | 'draft' | 'table';
  priority: 'P0' | 'P1' | 'P2';
}

const quickActions: QuickAction[] = [
  {
    id: 'rfp-search',
    title: 'RFP AI Search',
    description: 'Quickly search through RFP documentation and get summaries with clear citations',
    icon: FileSearch,
    steps: 2,
    type: 'output',
    priority: 'P0'
  },
  {
    id: 'compliance-matrix',
    title: 'Generate compliance matrix',
    description: 'Extract all RFP requirements and assess compliance against internal documentation',
    icon: CheckSquare,
    steps: 2,
    type: 'table',
    priority: 'P0'
  },
  {
    id: 'proposal-generation',
    title: 'Proposal Generation',
    description: 'Generate a draft proposal combining templates, compliance data, and project documentation',
    icon: FileText,
    steps: 3,
    type: 'draft',
    priority: 'P0'
  },
  {
    id: 'pre-bid-evaluation',
    title: 'Automated pre-bid evaluation',
    description: 'Compare new RFP requirements against company bidding criteria',
    icon: BarChart3,
    steps: 2,
    type: 'output',
    priority: 'P1'
  },
  {
    id: 'ask-sme',
    title: 'Ask an SME',
    description: 'Conduct deep research to gather relevant subject matter expertise',
    icon: Users,
    steps: 2,
    type: 'output',
    priority: 'P1'
  },
  {
    id: 'supplier-rfp',
    title: 'Supplier RFP generation',
    description: 'Draft RFPs for sub-contractors to fulfill specific requirements',
    icon: Send,
    steps: 2,
    type: 'draft',
    priority: 'P2'
  },
  {
    id: 'gather-feedback',
    title: 'Gather feedback',
    description: 'Receive and analyze client feedback for won or lost RFPs',
    icon: MessageSquare,
    steps: 1,
    type: 'output',
    priority: 'P1'
  },
  {
    id: 'proposal-editing',
    title: 'Proposal Editing',
    description: 'Workspace for reviewing and editing proposals with AI assistance',
    icon: Edit,
    steps: 1,
    type: 'draft',
    priority: 'P1'
  },
  {
    id: 'executive-review',
    title: 'Executive proposal review',
    description: 'Generate summary of proposal for commercial director review',
    icon: Eye,
    steps: 1,
    type: 'output',
    priority: 'P0'
  },
  {
    id: 'library-management',
    title: 'Library Management',
    description: 'Manage your knowledge base of RFPs, proposals, and documentation',
    icon: Database,
    steps: 1,
    type: 'output',
    priority: 'P0'
  }
];

interface QuickActionsProps {
  onActionClick: (action: QuickAction) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const typeIcons = {
    output: '📄',
    draft: '📝',
    table: '📊'
  };

  const priorityColors = {
    P0: 'bg-red-50 text-red-600 border-red-200',
    P1: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    P2: 'bg-green-50 text-green-600 border-green-200'
  };

  return (
    <div className="space-y-6">
      {/* Recommended For You */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            See all →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.slice(0, 6).map((action) => (
            <div
              key={action.id}
              onClick={() => onActionClick(action)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <action.icon className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
                <span className={`px-2 py-1 text-xs rounded-full border ${priorityColors[action.priority]}`}>
                  {action.priority}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 group-hover:text-black">
                {action.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {action.description}
              </p>
              
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">{typeIcons[action.type]}</span>
                <span className="capitalize">{action.type}</span>
                <span className="mx-2">·</span>
                <span>{action.steps} step{action.steps > 1 ? 's' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">All Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onActionClick(action)}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-black">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {action.steps} step{action.steps > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
