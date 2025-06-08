
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsView = () => {
  const winLossData = [
    { quarter: 'Q1 2023', won: 12, lost: 8 },
    { quarter: 'Q2 2023', won: 15, lost: 6 },
    { quarter: 'Q3 2023', won: 18, lost: 7 },
    { quarter: 'Q4 2023', won: 14, lost: 9 },
    { quarter: 'Q1 2024', won: 20, lost: 5 },
  ];

  const industryData = [
    { industry: 'Construction', winRate: 75, proposals: 20 },
    { industry: 'IT Services', winRate: 60, proposals: 15 },
    { industry: 'Environmental', winRate: 80, proposals: 10 },
    { industry: 'Consulting', winRate: 65, proposals: 12 },
  ];

  const timeToSubmissionData = [
    { month: 'Jan', avgDays: 14 },
    { month: 'Feb', avgDays: 12 },
    { month: 'Mar', avgDays: 10 },
    { month: 'Apr', avgDays: 11 },
    { month: 'May', avgDays: 9 },
    { month: 'Jun', avgDays: 8 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Recommendations</h1>
        <p className="text-gray-600">
          Insights from your proposal performance and strategic recommendations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">72%</div>
          <div className="text-sm text-gray-600">Overall Win Rate</div>
          <div className="text-xs text-green-600 mt-1">↑ 8% from last quarter</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">89</div>
          <div className="text-sm text-gray-600">Total Proposals</div>
          <div className="text-xs text-blue-600 mt-1">↑ 12 from last quarter</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">9.5</div>
          <div className="text-sm text-gray-600">Avg Days to Submit</div>
          <div className="text-xs text-green-600 mt-1">↓ 3.2 days improvement</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">$12.4M</div>
          <div className="text-sm text-gray-600">Value Won (YTD)</div>
          <div className="text-xs text-green-600 mt-1">↑ $2.1M from target</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win/Loss Trends */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="won" fill="#10B981" name="Won" />
              <Bar dataKey="lost" fill="#EF4444" name="Lost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Performance */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Rate by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="industry" type="category" width={80} />
              <Tooltip formatter={(value) => [`${value}%`, 'Win Rate']} />
              <Bar dataKey="winRate" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time to Submission */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Time to Submission</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToSubmissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} days`, 'Average Days']} />
              <Line type="monotone" dataKey="avgDays" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">📈 Focus on Environmental Sector</h4>
              <p className="text-sm text-green-800">
                Your win rate in environmental consulting is 80%. Consider expanding team capacity in this area.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">⚡ Improve IT Services Performance</h4>
              <p className="text-sm text-yellow-800">
                IT Services has the lowest win rate at 60%. Review recent losses for common patterns.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🚀 Submission Speed Improvement</h4>
              <p className="text-sm text-blue-800">
                You've reduced submission time by 3.2 days. Continue optimizing template and workflow processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
