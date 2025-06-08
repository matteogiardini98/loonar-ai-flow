
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react';

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
          <div className="text-2xl font-bold text-gray-900">72%</div>
          <div className="text-sm text-gray-600">Overall Win Rate</div>
          <div className="text-xs text-gray-500 mt-1">↑ 8% from last quarter</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">89</div>
          <div className="text-sm text-gray-600">Total Proposals</div>
          <div className="text-xs text-gray-500 mt-1">↑ 12 from last quarter</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">9.5</div>
          <div className="text-sm text-gray-600">Avg Days to Submit</div>
          <div className="text-xs text-gray-500 mt-1">↓ 3.2 days improvement</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">$12.4M</div>
          <div className="text-sm text-gray-600">Value Won (YTD)</div>
          <div className="text-xs text-gray-500 mt-1">↑ $2.1M from target</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win/Loss Trends */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winLossData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="won" fill="#374151" name="Won" />
              <Bar dataKey="lost" fill="#9ca3af" name="Lost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Performance */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Rate by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="industry" stroke="#6b7280" />
              <YAxis domain={[0, 100]} stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Win Rate']}
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="winRate" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time to Submission */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Time to Submission</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToSubmissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`${value} days`, 'Average Days']}
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                labelStyle={{ color: '#374151' }}
              />
              <Line type="monotone" dataKey="avgDays" stroke="#374151" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Focus on Environmental Sector</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your win rate in environmental consulting is 80%. Consider expanding team capacity in this area.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Improve IT Services Performance</h4>
              </div>
              <p className="text-sm text-gray-600">
                IT Services has the lowest win rate at 60%. Review recent losses for common patterns.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Submission Speed Improvement</h4>
              </div>
              <p className="text-sm text-gray-600">
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
