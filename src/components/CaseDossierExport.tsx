import React from 'react';
import { 
  Printer
} from 'lucide-react';
import suspectsData from '../data/suspects.json';

export const CaseDossierExport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Top Action Bar */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', background: '#0f172a', padding: '16px 20px', borderRadius: '8px', border: '1px solid #1e293b' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>
            Court-Ready Case Dossier & Evidentiary Briefing
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Formatted for submission to the Special Judge (MCOCA & PMLA) and multi-agency briefings.
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="btn-tactical btn-primary-tactical"
          style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 700 }}
        >
          <Printer size={16} />
          Print / Save PDF Dossier
        </button>
      </div>

      {/* Official Printable Document Container */}
      <div 
        className="tactical-panel print-dossier" 
        style={{ 
          background: '#0a0e17', 
          padding: '40px', 
          borderRadius: '8px', 
          border: '1px solid #334155',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Formal Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #38bdf8', paddingBottom: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
            INTELLIGENCE FUSION CENTER // SPECIAL INVESTIGATION TEAM
          </div>
          <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
            FINAL INVESTIGATION REPORT: OPERATION NEXUS
          </h1>
          <div style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
            CASE REF: NETRA/SIT-MUM/2024/CR-8821 • CLASSIFICATION: CONFIDENTIAL // COURT SUBMISSION
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
            Generated on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • Multi-Agency Joint Task Force
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
            1. Executive Investigation Summary
          </h3>
          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7 }}>
            Automated intelligence fusion across 3 initially disjointed criminal proceedings in Mumbai—the Bandra Armed Jewellery Heist (FIR No. 412/2024), Dave Bullion Hawala Layering (EOW Case 89/2024), and Bhiwandi Maritime Contraband Staging (DRI/MZU/INT-772)—has established the existence of a single, highly coordinated criminal enterprise. 
            Graph analytics, telephony triangulation, and probabilistic entity resolution have confirmed subject <strong>RAZA KHAN (alias "Raja" / "RK")</strong> as the central linchpin connecting field robbery operators with white-collar hawala layering and maritime export transit.
          </p>
        </div>

        {/* Primary Targets Table */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
            2. Identified Key Targets & Canonical Identity Clusters
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '8px 10px', color: '#94a3b8' }}>Target Name</th>
                <th style={{ padding: '8px 10px', color: '#94a3b8' }}>Resolved Aliases</th>
                <th style={{ padding: '8px 10px', color: '#94a3b8' }}>Syndicate Role</th>
                <th style={{ padding: '8px 10px', color: '#94a3b8' }}>Key Identifiers (Phone / Vehicle)</th>
                <th style={{ padding: '8px 10px', color: '#94a3b8' }}>Statutory Sections</th>
              </tr>
            </thead>
            <tbody>
              {suspectsData.slice(0, 4).map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 700, color: '#f8fafc' }}>{s.name}</td>
                  <td style={{ padding: '8px 10px', color: '#c084fc' }}>{s.aliases?.join(', ') || 'N/A'}</td>
                  <td style={{ padding: '8px 10px', color: '#cbd5e1' }}>{s.role}</td>
                  <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                    {s.primaryPhone || 'N/A'} {s.associatedVehicles ? `[${s.associatedVehicles.join('')}]` : ''}
                  </td>
                  <td style={{ padding: '8px 10px', color: '#fb7185' }}>{s.ipcSections?.slice(0, 2).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4-Hop Discovered Connection Trail */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
            3. Evidentiary Linkage Chain (Multi-Hop Pathway)
          </h3>
          <div style={{ background: '#080c14', padding: '16px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '13px', color: '#f8fafc', marginBottom: '10px', fontWeight: 600 }}>
              Path: Tariq Shaikh (Robbery Squad) ➔ Burner SIM (+91 98201 44892) ➔ Raza Khan ("Raja") ➔ Apex Marine Bank Account ➔ Vikram Solanki (Port Logistics)
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.8 }}>
              <li><strong>Hop 1 (Telephony CDR-101/102):</strong> Tariq Shaikh received green-light command call on 12-Oct 19:27 hrs (18 min prior to robbery) from SIM 4892.</li>
              <li><strong>Hop 2 (Disambiguation Match 96.4%):</strong> SIM 4892 (IMEI 864912048892104) co-located with Scorpio MH-01-EA-4920 registered to R. Khan.</li>
              <li><strong>Hop 3 (Hawala Transfer TX-401):</strong> Karan Dave (Dave Bullion) wired ₹1.20 Cr into Apex Marine Exports (signatory R. Khan) following heist bullion alert.</li>
              <li><strong>Hop 4 (Logistics Remittance TX-402):</strong> Apex Marine wired ₹18.5 Lakhs to Vikram Solanki (Solanki Freight) for Shed 4B container tampering.</li>
            </ul>
          </div>
        </div>

        {/* Actionable Directives */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
            4. Recommended Law Enforcement Directives
          </h3>
          <ol style={{ paddingLeft: '20px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.7 }}>
            <li>Issue Non-Bailable Arrest Warrant against <strong>Raza Khan</strong> under MCOCA Sec 3 & IPC 120B.</li>
            <li>Immediate maritime physical interception of export container <strong>TGHU-940128-4</strong> at Nhava Sheva Port Terminal 2.</li>
            <li>Freeze bank accounts <strong>HDFC-904128841 (Apex Marine)</strong> and <strong>AXIS-771920394 (Raza Khan)</strong> under PMLA Sec 17.</li>
            <li>Issue Interpol Purple Notice for blockchain OTC liquidity broker <strong>Sameer Merchant</strong>.</li>
          </ol>
        </div>

        {/* Officer Sign-off Block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderTop: '1px solid #334155', paddingTop: '24px', marginTop: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '35px' }} />
            <div style={{ borderTop: '1px dashed #64748b', paddingTop: '6px', fontSize: '11px', color: '#f8fafc', fontWeight: 600 }}>
              (ACP R. K. Shinde)
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Crime Branch Unit 9, Mumbai Police</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '35px' }} />
            <div style={{ borderTop: '1px dashed #64748b', paddingTop: '6px', fontSize: '11px', color: '#f8fafc', fontWeight: 600 }}>
              (V. N. Iyer, IRS)
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Deputy Director, DRI MZU</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '35px' }} />
            <div style={{ borderTop: '1px dashed #64748b', paddingTop: '6px', fontSize: '11px', color: '#f8fafc', fontWeight: 600 }}>
              (Ananya Roy)
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Lead Intelligence Analyst, NETRA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
