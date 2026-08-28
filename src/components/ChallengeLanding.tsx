import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  PhoneCall, 
  CreditCard, 
  MapPin, 
  AlertTriangle,
  Zap,
  CheckCircle,
  Cpu
} from 'lucide-react';
import firReportsData from '../data/fir_reports.json';
import callRecordsData from '../data/call_records.json';
import transactionsData from '../data/transactions.json';
import locationsData from '../data/locations.json';

interface ChallengeLandingProps {
  onEnterInvestigation: () => void;
  onExploreEvidence: () => void;
}

export const ChallengeLanding: React.FC<ChallengeLandingProps> = ({
  onEnterInvestigation,
  onExploreEvidence
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<'fir' | 'cdr' | 'finance' | 'location'>('fir');
  const [challengeRevealed, setChallengeRevealed] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px 100px 20px' }}>
      {/* Hero Presentation Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-critical" style={{ padding: '4px 12px', fontSize: '12px' }}>
            <AlertTriangle size={13} />
            CLASSIFIED LAW ENFORCEMENT INTELLIGENCE EXERCISE
          </span>
          <span className="badge badge-cyan" style={{ padding: '4px 12px', fontSize: '12px' }}>
            SMART INDIA HACKATHON
          </span>
        </div>

        <h1 className="font-display" style={{ fontSize: '38px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px', marginBottom: '12px' }}>
          OPERATION NEXUS: <span style={{ color: '#38bdf8' }}>The Fragmented Evidence Challenge</span>
        </h1>
        
        <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '16px', color: '#94a3b8', lineHeight: 1.6 }}>
          Three severe criminal incidents have occurred across Mumbai within 48 hours. 
          To traditional investigating teams, they appear entirely separate. 
          <strong style={{ color: '#f8fafc' }}> Can a human investigator discover the hidden nexus before the contraband leaves Indian waters?</strong>
        </p>

        {/* Big Action Callouts */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          <button
            onClick={onEnterInvestigation}
            className="btn-tactical btn-primary-tactical"
            style={{ padding: '12px 28px', fontSize: '15px', fontWeight: 700, borderRadius: '8px' }}
          >
            <Cpu size={18} />
            ACTIVATE NETRA FUSION (SOLVE CASE)
            <ArrowRight size={18} />
          </button>
          
          <button
            onClick={onExploreEvidence}
            className="btn-tactical"
            style={{ padding: '12px 22px', fontSize: '14px', borderRadius: '8px' }}
          >
            <FileText size={16} />
            Inspect Raw Evidence Logs
          </button>
        </div>
      </div>

      {/* The 3 Apparent Incidents Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div className="tactical-card" style={{ padding: '20px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-critical" style={{ fontSize: '10px' }}>INCIDENT 1 // ROBBERY</span>
            <span className="evidence-tag">FIR 412/2024</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
            Bandra Diamond Heist
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
            Armed holdup of ₹4.2 Cr diamond vault at Hill Road. Primary accused: <strong>Tariq Shaikh ("Guddu Bandra")</strong>.
          </p>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Agency: Mumbai Police Crime Branch Unit 9
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-high" style={{ fontSize: '10px' }}>INCIDENT 2 // MONEY LAUNDERING</span>
            <span className="evidence-tag">EOW 89/2024</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
            Zaveri Hawala & Shell Invoicing
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
            ₹12 Cr illicit bullion layering via dummy export firm Apex Marine. Accused: <strong>Karan Dave ("KD Bullion")</strong>.
          </p>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Agency: Economic Offences Wing / ED Cell
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '20px', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '10px' }}>INCIDENT 3 // MARITIME CONTRABAND</span>
            <span className="evidence-tag">DRI IR-772</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
            Bhiwandi Container Depot Tampering
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
            Illicit staging yard preparing export containers for Jebel Ali. Accused: <strong>Vikram Solanki ("Vicky Bhiwandi")</strong>.
          </p>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Agency: Directorate of Revenue Intelligence (DRI)
          </div>
        </div>
      </div>

      {/* Interactive Evidence Inspection Grid */}
      <div className="tactical-panel" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>
              Fragmented Intelligence Sources (Siloed Silos)
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Each agency maintains isolated records. Select an evidence card to inspect real intercepted raw entries:
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedEvidence('fir')}
              className={`btn-tactical ${selectedEvidence === 'fir' ? 'btn-primary-tactical' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <FileText size={14} />
              FIR Reports
            </button>
            <button
              onClick={() => setSelectedEvidence('cdr')}
              className={`btn-tactical ${selectedEvidence === 'cdr' ? 'btn-primary-tactical' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <PhoneCall size={14} />
              Call Records (CDR)
            </button>
            <button
              onClick={() => setSelectedEvidence('finance')}
              className={`btn-tactical ${selectedEvidence === 'finance' ? 'btn-primary-tactical' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <CreditCard size={14} />
              Hawala / Bank Flow
            </button>
            <button
              onClick={() => setSelectedEvidence('location')}
              className={`btn-tactical ${selectedEvidence === 'location' ? 'btn-primary-tactical' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <MapPin size={14} />
              Location & ANPR
            </button>
          </div>
        </div>

        {/* Selected Evidence Card Content */}
        <div style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: '8px', padding: '20px' }}>
          {selectedEvidence === 'fir' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-critical">POLICE FIR EXCERPT: FIR NO. 412/2024</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Date: 12-Oct-2024 // Bandra Police Station</span>
              </div>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '14px' }}>
                "{firReportsData[0].briefFacts}"
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px' }}>
                <span style={{ color: '#94a3b8' }}>Mentioned Entities:</span>
                <span className="evidence-tag">Tariq Shaikh</span>
                <span className="evidence-tag">Imran Qureshi</span>
                <span className="evidence-tag">Raja Bhai (+91 98201 44892)</span>
                <span className="evidence-tag">Swift MH-02-CB-8812</span>
              </div>
            </div>
          )}

          {selectedEvidence === 'cdr' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-purple">SIGINT TELEPHONY STREAM (EXCERPT 4 OF 28 CALLS)</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Extracted via Telecom Intercept Gateway</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {callRecordsData.slice(0, 4).map(c => (
                  <div key={c.callId} style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{c.callId} // {c.callType} ({c.durationSeconds}s)</span>
                      <span style={{ color: '#64748b' }}>{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
                      {c.callerName || c.callerNumber} ➔ {c.receiverName || c.receiverNumber}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      "{c.interceptSummary}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEvidence === 'finance' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-success">FINANCIAL TRANSACTION & HAWALA LEDGER EXCERPTS</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>PMLA Banking Logs & Token Seizure</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {transactionsData.slice(0, 4).map(t => (
                  <div key={t.txId} style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>{t.txId} // {t.mode}</span>
                      <span style={{ color: '#f8fafc', fontWeight: 700 }}>₹{(t.amountINR / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                      {t.fromEntity} ➔ {t.toEntity}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
                      Ref: {t.referenceNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEvidence === 'location' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-cyan">LOCATION & HIGHWAY ANPR SIGHTINGS</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Mumbai City Surveillance Grid</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {locationsData.slice(0, 4).map(l => (
                  <div key={l.eventId} style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: '#22d3ee', fontFamily: 'var(--font-mono)' }}>{l.eventId} // {l.source}</span>
                      <span style={{ color: '#64748b' }}>Confidence: {(l.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                      {l.entityName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {l.locationName} @ {new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The Investigator Cognitive Overload Challenge Card */}
      <div 
        className="tactical-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(2, 132, 199, 0.1))', 
          border: '1px solid #38bdf8', 
          padding: '24px',
          borderRadius: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Zap size={18} color="#38bdf8" />
              <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
                The Live SIH Challenge for Judges & Investigators
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '800px', marginBottom: '16px' }}>
              "Looking at these disparate records, is <strong>Tariq Shaikh (Bandra Robbery)</strong> connected to <strong>Vikram Solanki (Bhiwandi Depot)</strong>?"
              <br />
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                Manually tracing through 500+ daily CDRs, multi-layered hawala front accounts, and fragmented aliases ("RK", "R. Khan", "Raja") takes human teams 3 to 5 weeks.
              </span>
            </p>

            {challengeRevealed ? (
              <div style={{ background: '#0a0e17', border: '1px solid #10b981', padding: '16px', borderRadius: '6px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <CheckCircle size={16} />
                  NETRA DISCOVERY RESULT:
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <strong>Yes!</strong> Connected via 4-Hop Indirect Path: 
                  <span style={{ color: '#38bdf8' }}> Tariq Shaikh</span> ➔ 
                  <span style={{ color: '#c084fc' }}> Burner SIM (+91 98201 44892)</span> ➔ 
                  <span style={{ color: '#fb7185' }}> Raza Khan ("RK" / Linchpin)</span> ➔ 
                  <span style={{ color: '#34d399' }}> Apex Marine Wire (₹18.5L)</span> ➔ 
                  <span style={{ color: '#38bdf8' }}> Vikram Solanki</span>.
                </div>
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setChallengeRevealed(!challengeRevealed)}
                className="btn-tactical"
                style={{ fontSize: '13px', borderColor: '#38bdf8', color: '#38bdf8' }}
              >
                {challengeRevealed ? 'Hide Quick Answer' : 'Test AI Link Prediction'}
              </button>

              <button
                onClick={onEnterInvestigation}
                className="btn-tactical btn-primary-tactical"
                style={{ fontSize: '13px', fontWeight: 700 }}
              >
                Launch Full Knowledge Graph Demo ➔
              </button>
            </div>
          </div>

          {/* Side Stat Box */}
          <div style={{ minWidth: '220px', background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              FUSED DATASETS
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              100%
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              4 Agencies • 6 Data Modalities • 0 Dead Ends
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
