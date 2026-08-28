import React, { useState } from 'react';
import { 
  FileCheck, 
  Share2, 
  Gavel
} from 'lucide-react';
import { leadGenerator } from '../services/LeadGenerator';
import type { InvestigationLead } from '../types';

interface InvestigationLeadsProps {
  onNavigateToGraph: (nodeId?: string) => void;
  onNavigateToDossier: () => void;
}

export const InvestigationLeads: React.FC<InvestigationLeadsProps> = ({
  onNavigateToGraph,
  onNavigateToDossier
}) => {
  const [leads] = useState<InvestigationLead[]>(leadGenerator.getAllLeads());
  const [selectedLead, setSelectedLead] = useState<InvestigationLead>(leads[0]);
  const [warrantModalOpen, setWarrantModalOpen] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-success">ACTIONABLE INTELLIGENCE SYNTHESIS</span>
            <span className="badge badge-critical">HIGH VALUE OPERATIONAL DIRECTIVES</span>
          </div>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc' }}>
            AI Investigation Leads & Warrant Recommendations
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '850px' }}>
            Unlike black-box AI tools, NETRA synthesizes leads directly from graph bridge analytics and multi-source evidence trails. Every recommendation is court-defensible and cross-referenced with exact FIR, CDR, and Banking tokens.
          </p>
        </div>

        <button
          onClick={onNavigateToDossier}
          className="btn-tactical btn-primary-tactical"
          style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}
        >
          <FileCheck size={16} />
          Export Court Briefing Dossier
        </button>
      </div>

      {/* 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '24px' }}>
        {/* Left: Leads List */}
        <div className="tactical-panel" style={{ padding: '20px' }}>
          <div className="tactical-header" style={{ margin: '-20px -20px 16px -20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              SYNTHESIZED INVESTIGATION LEADS ({leads.length})
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8' }}>Sorted by Risk Centrality</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leads.map(lead => {
              const isSelected = selectedLead.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(15, 23, 42, 0.95)' : '#080c14',
                    border: `1px solid ${isSelected ? '#38bdf8' : '#1e293b'}`,
                    borderLeft: `4px solid ${lead.priority === 'HIGH PRIORITY' ? '#ef4444' : '#f59e0b'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className={`badge ${lead.priority === 'HIGH PRIORITY' ? 'badge-critical' : 'badge-high'}`}>
                      {lead.priority}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                      {lead.confidenceScore}% Confidence
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                    {lead.title}
                  </h3>

                  <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '10px' }}>
                    {lead.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="evidence-tag">{lead.id}</span>
                    <span style={{ fontSize: '11px', color: '#38bdf8' }}>
                      {lead.evidenceTrail.length} Evidence Items ➔
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Lead Deep Directive Card */}
        <div className="tactical-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className={`badge ${selectedLead.priority === 'HIGH PRIORITY' ? 'badge-critical' : 'badge-high'}`}>
                  {selectedLead.priority}
                </span>
                <span className="evidence-tag">{selectedLead.id}</span>
              </div>

              <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc' }}>
                {selectedLead.title}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {selectedLead.confidenceScore}%
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Evidence Confidence Score</div>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
            {selectedLead.summary}
          </p>

          {/* Evidence Trail List */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
              VERIFIED EVIDENCE CHAIN (AUDIT TRAIL):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedLead.evidenceTrail.map((ev, idx) => (
                <div key={idx} style={{ background: '#080c14', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#38bdf8' }}>
                      {ev.category}
                    </span>
                    <span className="evidence-tag">{ev.citation}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {ev.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Operational Directives */}
          <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #10b981', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              <Gavel size={16} />
              RECOMMENDED LAW ENFORCEMENT ACTIONS:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#f8fafc', lineHeight: 1.7 }}>
              {selectedLead.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigateToGraph(selectedLead.keyEntities[0])}
              className="btn-tactical btn-primary-tactical"
              style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600 }}
            >
              <Share2 size={15} />
              Highlight Evidence Path on Network Graph
            </button>

            <button
              onClick={() => setWarrantModalOpen(true)}
              className="btn-tactical"
              style={{ padding: '10px 16px', fontSize: '13px', borderColor: '#f59e0b', color: '#f59e0b' }}
            >
              <Gavel size={15} />
              Generate Warrant Draft
            </button>
          </div>
        </div>
      </div>

      {/* Warrant Modal Preview */}
      {warrantModalOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0, 0, 0, 0.85)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 100, 
            padding: '20px' 
          }}
        >
          <div className="tactical-panel" style={{ maxWidth: '640px', width: '100%', padding: '24px', background: '#0f172a', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-critical">COURT OF SPECIAL JUDGE (MCOCA & PMLA)</span>
              <button 
                onClick={() => setWarrantModalOpen(false)}
                className="btn-tactical"
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                ✕ Close
              </button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
              Special Warrant Application Draft: {selectedLead.id}
            </h3>

            <div style={{ background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px', maxHeight: '280px', overflowY: 'auto' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>IN THE COURT OF THE SPECIAL JUDGE, GREATER MUMBAI</strong><br />
                Special Case No. 882/2024 (Under MCOCA Sec 3 & IPC 120B / 395)
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>APPLICATION FOR NON-BAILABLE ARREST WARRANT & ASSET SEIZURE</strong>
              </p>
              <p style={{ marginBottom: '8px' }}>
                The Investigating Officer respectfully submits that subject <strong>RAZA KHAN (alias Raja / RK)</strong> has been established via automated link analysis as the linchpin orchestrating the Bandra Diamond Heist (FIR 412/2024) and routing proceeds through shell entity Apex Marine Exports (EOW Case 89/2024).
              </p>
              <p>
                <strong>GROUNDS:</strong><br />
                1. 3 separate CDR intercepts with burner +91 98201 44892.<br />
                2. Direct RTGS remittance of ₹1.2 Cr from Dave Bullion to Apex Marine Exports.<br />
                3. Physical ANPR hits of Scorpio MH-01-EA-4920 at Bandra Sea Link and Bhiwandi Depot.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => {
                  window.print();
                  setWarrantModalOpen(false);
                }}
                className="btn-tactical btn-primary-tactical"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                Print / Save Warrant Affidavit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
