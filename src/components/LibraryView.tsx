
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, Folder, FileText, Filter, Grid, List } from 'lucide-react';

const LibraryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const documents = [
    {
      id: '1',
      name: 'Construction Project RFP - City Hall',
      type: 'RFP',
      date: '2024-01-15',
      size: '2.4 MB',
      status: 'Won'
    },
    {
      id: '2',
      name: 'IT Infrastructure Upgrade Proposal',
      type: 'Proposal',
      date: '2024-01-10',
      size: '1.8 MB',
      status: 'Pending'
    },
    {
      id: '3',
      name: 'Environmental Consulting RFP',
      type: 'RFP',
      date: '2024-01-08',
      size: '3.2 MB',
      status: 'Lost'
    },
    {
      id: '4',
      name: 'Company Capabilities Statement',
      type: 'Documentation',
      date: '2023-12-20',
      size: '1.1 MB',
      status: 'Reference'
    },
    {
      id: '5',
      name: 'Previous Project Case Studies',
      type: 'Documentation',
      date: '2023-12-15',
      size: '4.7 MB',
      status: 'Reference'
    },
    {
      id: '6',
      name: 'Team Bios and Qualifications',
      type: 'Documentation',
      date: '2023-12-10',
      size: '890 KB',
      status: 'Reference'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Library</h1>
        <p className="text-gray-600">
          Previous RFPs, proposals, project documentation, and knowledge base
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <div className="flex border border-gray-200 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-black text-white hover:bg-gray-800">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <Folder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drag and drop files or folders
        </h3>
        <p className="text-gray-600 mb-4">
          Upload documents, sync with SharePoint, or connect Google Drive
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline">Browse Files</Button>
          <Button variant="outline">Connect Drive</Button>
          <Button variant="outline">Sync SharePoint</Button>
        </div>
      </div>

      {/* Document Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                {getTypeIcon(doc.type)}
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {doc.name}
              </h3>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>Type: {doc.type}</p>
                <p>Size: {doc.size}</p>
                <p>Date: {doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(doc.type)}
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{doc.type}</td>
                    <td className="py-3 px-4 text-gray-600">{doc.date}</td>
                    <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryView;
