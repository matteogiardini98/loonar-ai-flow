
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
  // Updated document examples with the requested types
  const recentDocuments: Document[] = [
    {
      id: '1',
      name: 'Infrastructure Modernization Proposal',
      content: `# Infrastructure Modernization Proposal

## Executive Summary
This proposal outlines a comprehensive infrastructure modernization initiative to upgrade our legacy systems and enhance operational efficiency across all departments.

## Project Scope
- Cloud migration strategy for core applications
- Network infrastructure upgrade
- Security framework enhancement
- Data center consolidation

## Budget Requirements
Total estimated cost: $2.5M over 18 months
- Phase 1 (Cloud Migration): $800K
- Phase 2 (Network Upgrade): $900K
- Phase 3 (Security Implementation): $500K
- Contingency (10%): $300K

## Timeline
- Q1 2024: Planning and vendor selection
- Q2-Q3 2024: Phase 1 implementation
- Q4 2024-Q1 2025: Phase 2 and 3 execution
- Q2 2025: Testing and optimization

## Expected Benefits
- 40% reduction in operational costs
- 99.9% system uptime guarantee
- Enhanced security posture
- Improved scalability for future growth`,
      type: 'Proposal',
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      name: 'Regulatory Compliance Matrix - SOX & GDPR',
      content: `# Regulatory Compliance Matrix

## Compliance Framework Overview
This matrix tracks our organization's compliance status across SOX (Sarbanes-Oxley) and GDPR (General Data Protection Regulation) requirements.

## SOX Compliance Status
### Section 302 - Corporate Responsibility
- ✅ CEO/CFO Certifications - Complete
- ✅ Internal Controls Assessment - Complete
- ⚠️ Quarterly Reviews - In Progress
- ❌ Documentation Updates - Pending

### Section 404 - Management Assessment
- ✅ Control Framework Implementation - Complete
- ✅ External Auditor Testing - Complete
- ⚠️ Deficiency Remediation - 80% Complete

## GDPR Compliance Status
### Data Protection Principles
- ✅ Lawfulness, Fairness, Transparency - Complete
- ✅ Purpose Limitation - Complete
- ⚠️ Data Minimization - 90% Complete
- ✅ Accuracy - Complete
- ⚠️ Storage Limitation - In Review

### Individual Rights
- ✅ Right to Information - Complete
- ✅ Right of Access - Complete
- ⚠️ Right to Rectification - 95% Complete
- ❌ Right to Erasure - Implementation Required

## Risk Assessment
- High Risk: 2 items requiring immediate attention
- Medium Risk: 5 items with 30-day remediation plan
- Low Risk: 8 items for continuous monitoring`,
      type: 'Compliance Matrix',
      lastModified: '1 day ago'
    },
    {
      id: '3',
      name: 'RFP Analysis - Digital Transformation Services',
      content: `# Pre-Bid RFP Analysis
## RFP-2024-DT-001: Digital Transformation Services

### RFP Overview
- **Issuing Agency**: Department of Technology Services
- **Total Contract Value**: $15M over 3 years
- **Submission Deadline**: March 15, 2024, 2:00 PM EST
- **Pre-proposal Conference**: February 20, 2024

### Key Requirements Analysis
#### Technical Requirements
- Cloud-first architecture (mandatory)
- API-driven integration capabilities
- Modern web application framework
- Mobile-responsive design
- 99.9% uptime SLA requirement

#### Functional Requirements
- User management system (5,000+ users)
- Document management workflow
- Real-time collaboration tools
- Advanced reporting and analytics
- Multi-language support (English, Spanish, French)

### Competitive Landscape
#### Likely Competitors
1. **TechCorp Solutions** - Strong in government sector
2. **CloudWorks Inc** - Competitive pricing model
3. **Digital Partners LLC** - Local presence advantage

### Win Probability Assessment
- **Technical Capability**: 95% match
- **Experience Requirements**: 100% qualified
- **Price Competitiveness**: Medium confidence
- **Overall Win Probability**: 75%

### Recommended Bid Strategy
- Emphasize security and compliance expertise
- Highlight previous government project successes
- Propose phased implementation approach
- Include local workforce commitment`,
      type: 'Pre-bid RFP Analysis',
      lastModified: '3 days ago'
    },
    {
      id: '4',
      name: 'Cybersecurity Enhancement Proposal',
      content: `# Cybersecurity Enhancement Proposal

## Current Security Posture Assessment
Our organization faces evolving cyber threats that require immediate attention and strategic investment in advanced security measures.

## Identified Vulnerabilities
### Critical Issues
- Outdated firewall configurations
- Insufficient endpoint protection
- Limited security awareness training
- Absence of zero-trust architecture

### Risk Exposure
- Potential for ransomware attacks
- Data breach vulnerabilities
- Compliance gaps with industry standards
- Inadequate incident response capabilities

## Proposed Security Enhancements
### Phase 1: Immediate Actions (30 days)
- Deploy advanced endpoint detection and response (EDR)
- Implement multi-factor authentication across all systems
- Conduct emergency security awareness training
- Establish 24/7 security operations center (SOC)

### Phase 2: Strategic Improvements (90 days)
- Zero-trust network architecture implementation
- Advanced threat intelligence integration
- Automated security orchestration platform
- Enhanced backup and disaster recovery systems

## Investment Requirements
- Initial Implementation: $750K
- Annual Operating Costs: $200K
- Training and Certification: $50K
- Total First Year: $1M

## Expected ROI
- 80% reduction in security incidents
- Compliance with all regulatory requirements
- $2M+ savings from prevented breaches
- Enhanced customer trust and reputation`,
      type: 'Proposal',
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
