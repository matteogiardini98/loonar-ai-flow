import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  lastModified: string;
}

interface RecentDocumentsProps {
  onDocumentOpen: (document: Document) => void;
}

const RecentDocuments = ({ onDocumentOpen }: RecentDocumentsProps) => {
  // Mock recent documents data with full content
  const recentDocuments: Document[] = [
    {
      id: '1',
      name: 'Project Proposal - Q1 2024',
      content: `# Project Proposal - Q1 2024

## Executive Summary
This proposal outlines our strategic initiative for the first quarter of 2024, focusing on expanding our market presence and enhancing customer satisfaction through innovative solutions.

## Objectives
1. Increase market share by 15%
2. Launch three new product features
3. Improve customer retention rate to 95%
4. Establish partnerships with 5 key vendors

## Budget Allocation
- Marketing: $150,000
- Development: $200,000
- Operations: $100,000
- Training: $50,000

## Timeline
- January: Market research and planning
- February: Development phase begins
- March: Testing and initial rollout

## Expected Outcomes
We anticipate significant growth in customer acquisition and retention, leading to a projected 20% increase in revenue for Q1.`,
      type: 'Proposal',
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      name: 'Technical Requirements Document',
      content: `# Technical Requirements Document

## System Overview
This document defines the technical requirements for our new customer management system, including architecture, performance, and security specifications.

## Architecture Requirements
- Microservices-based architecture
- Cloud-native deployment (AWS/Azure)
- RESTful API design
- Real-time data processing capabilities

## Performance Requirements
- Response time: < 200ms for 95% of requests
- Throughput: 10,000 concurrent users
- Availability: 99.9% uptime
- Scalability: Auto-scaling based on load

## Security Requirements
- OAuth 2.0 authentication
- End-to-end encryption
- GDPR compliance
- Regular security audits

## Technology Stack
- Frontend: React, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL, Redis
- Infrastructure: Docker, Kubernetes

## Integration Requirements
- Third-party CRM integration
- Payment gateway integration
- Email service integration
- Analytics platform integration`,
      type: 'Technical Spec',
      lastModified: '1 day ago'
    },
    {
      id: '3',
      name: 'Marketing Campaign Brief',
      content: `# Marketing Campaign Brief - Summer 2024

## Campaign Overview
Launch a comprehensive digital marketing campaign to promote our new product line and increase brand awareness during the summer season.

## Target Audience
- Primary: Tech-savvy professionals aged 25-45
- Secondary: Small to medium business owners
- Geographic focus: North America and Europe

## Key Messages
1. Innovation that simplifies your workflow
2. Trusted by industry leaders
3. Affordable solutions for growing businesses

## Channel Strategy
### Digital Channels
- Social media advertising (LinkedIn, Twitter, Facebook)
- Google Ads and SEO optimization
- Email marketing campaigns
- Influencer partnerships

### Traditional Channels
- Industry conference sponsorships
- Trade publication advertisements
- Direct mail to qualified prospects

## Budget Breakdown
- Digital advertising: $300,000
- Content creation: $100,000
- Events and sponsorships: $150,000
- Analytics and tools: $50,000

## Success Metrics
- Lead generation: 5,000 qualified leads
- Brand awareness: 25% increase
- Website traffic: 40% increase
- Conversion rate: 3.5% target`,
      type: 'Marketing',
      lastModified: '3 days ago'
    },
    {
      id: '4',
      name: 'User Research Report',
      content: `# User Research Report - Customer Journey Analysis

## Research Objectives
Understand user behavior patterns and pain points throughout the customer journey to improve product experience and increase satisfaction.

## Methodology
- User interviews: 50 participants
- Surveys: 500 responses
- Analytics data: 6-month period
- Usability testing: 25 sessions

## Key Findings

### User Personas
1. **The Efficiency Seeker** (40% of users)
   - Values speed and automation
   - Frustrated by manual processes
   - Tech-savvy early adopters

2. **The Collaborative Manager** (35% of users)
   - Needs team coordination features
   - Values communication tools
   - Requires approval workflows

3. **The Data-Driven Analyst** (25% of users)
   - Relies on detailed reporting
   - Needs export capabilities
   - Values customizable dashboards

### Pain Points
- Complex onboarding process (mentioned by 78% of users)
- Limited mobile functionality (65% of users)
- Slow loading times during peak hours (52% of users)
- Difficulty finding specific features (48% of users)

## Recommendations
1. Streamline onboarding with guided tours
2. Develop mobile-first responsive design
3. Optimize performance and caching
4. Improve navigation and search functionality
5. Implement contextual help system`,
      type: 'Research',
      lastModified: '5 days ago'
    }
  ];

  const formatLastModified = (lastModified: string) => {
    return lastModified;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recently used</h3>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {recentDocuments.map((document) => (
            <Card
              key={document.id}
              className="w-64 h-24 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex-shrink-0"
              onClick={() => onDocumentOpen(document)}
            >
              <CardContent className="p-4 h-full flex items-center">
                <div className="flex items-start gap-3 w-full">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
                      {document.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{document.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{formatLastModified(document.lastModified)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentDocuments;
