import React from 'react';
import { 
  Share2, 
  Sparkles, 
  ArrowRight,
  Layers,
  Clock,
  FileText
} from 'lucide-react';
import firReportsData from '../data/fir_reports.json';
import leadsData from '../data/investigation_leads.json';

interface CommandCenterProps {
  onNavigate: (tab: string) => void;
  onSelectEntity?: (id: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onNavigate
}) => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Top Banner / Case Dossier Summary */}
      <div className="tactical-panel" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div className="scanline-effect" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-critical">OPERATION STATUS: LIVE Surveillance</span>
              <span className="badge badge-cyan">CASE CODE: OP-NEXUS-MUMBAI</span>
              <span className="evidence-tag">CR-8821/CrimeBranch</span>
            </div>
            <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
              OPERATION NEXUS: Command Intelligence Center
            </h1>
            <p style={{ maxWidth: '850px', fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
              Multi-Agency Threat Fusion Center linking <strong>Mumbai Police Crime Branch</strong> (Bandra Armed Heist), 
              <strong> Enforcement Directorate / EOW</strong> (Zaveri Hawala Shell Invoicing), and 
              <strong> Directorate of Revenue Intelligence</strong> (Bhiwandi Maritime Contraband Depot).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onNavigate('network')}
              className="btn-tactical btn-primary-tactical"
              style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 600 }}
            >
              <Share2 size={16} />
              Open Interactive Network Graph
            </button>
            <button
              onClick={() => onNavigate('leads')}
              className="btn-tactical"
              style={{ padding: '10px 16px', fontSize: '13px' }}
            >
              <Sparkles size={16} color="#38bdf8" />
              View 3 Active Leads
            </button>
          </div>
        </div>

        {/* Real Operational Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1e293b' }}>
          <div style={{ background: '#080c14', padding: '14px 18px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>
              TOTAL FUSED ENTITIES
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>12</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>8 Persons • 10 Phones/SIMs</span>
            </div>
          </div>

          <div style={{ background: '#080c14', padding: '14px 18px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>
              GRAPH RELATIONSHIPS
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>48</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Verified Link Assertions</span>
            </div>
          </div>

          <div style={{ background: '#080c14', padding: '14px 18px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>
              HIDDEN BRIDGES DETECTED
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#fb7185', fontFamily: 'var(--font-mono)' }}>4</span>
              <span style={{ fontSize: '12px', color: '#fb7185' }}>Multi-hop Pathways</span>
            </div>
          </div>

          <div style={{ background: '#080c14', padding: '14px 18px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>
              ACTIONABLE LEADS
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>3</span>
              <span style={{ fontSize: '12px', color: '#34d399' }}>High Priority Directives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Command Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '24px' }}>
        {/* Left Column: Incidents & Linchpin Focus */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Key Intermediary Focus Card */}
          <div className="tactical-card" style={{ padding: '20px', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-critical">KEY INTERMEDIARY // HIGH RISK</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#94a3b8' }}>ID: entity-intermediary-linchpin</span>
              </div>
              <button 
                onClick={() => onNavigate('network')}
                className="btn-tactical" 
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                Inspect in Graph ➔
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', color: '#fb7185', fontFamily: 'var(--font-mono)' }}>
                RK
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                  Raza Khan (Aliases: "Raja", "RK", "R. Khan", "Farhan Bhai")
                </h3>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '10px' }}>
                  Identified by NETRA as the shadow linchpin bridging all 3 incidents. Dispatched Tariq Shaikh for the robbery, laundered ₹1.2 Cr proceeds via Karan Dave's shell company Apex Marine, and booked Vikram Solanki's Bhiwandi yard for illicit sea container transit.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="evidence-tag">SIM: +91 98201 44892</span>
                  <span className="evidence-tag">Vehicle: MH-01-EA-4920 (Scorpio)</span>
                  <span className="evidence-tag">Shell: Apex Marine Exports</span>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>Resolution Match: 96.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Unified Incident Summaries */}
          <div className="tactical-panel" style={{ padding: '20px' }}>
            <h3 className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Active Incident Dossiers
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {firReportsData.map(fir => (
                <div 
                  key={fir.firNumber}
                  style={{ background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="evidence-tag">{fir.firNumber}</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{fir.policeStation}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                      {fir.briefFacts.slice(0, 95)}...
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Accused: {fir.primaryAccused.join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('evidence')}
                    className="btn-tactical"
                    style={{ padding: '6px 12px', fontSize: '11px', whiteSpace: 'nowrap' }}
                  >
                    View FIR
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Leads & Investigation Workflows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Priority Lead Box */}
          <div className="tactical-panel" style={{ padding: '20px', borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className="badge badge-success">TOP OPERATIONAL DIRECTIVE</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>CONFIDENCE: 96%</span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              {leadsData[0].title}
            </h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
              {leadsData[0].summary}
            </p>

            <div style={{ background: '#080c14', padding: '10px 12px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                RECOMMENDED ACTION:
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                {leadsData[0].recommendedActions[0]}
              </div>
            </div>

            <button
              onClick={() => onNavigate('leads')}
              className="btn-tactical btn-primary-tactical"
              style={{ width: '100%', padding: '8px', fontSize: '12px' }}
            >
              Explore Full Lead Evidence Trail ➔
            </button>
          </div>

          {/* Quick Investigation Modules Nav */}
          <div className="tactical-panel" style={{ padding: '20px' }}>
            <h4 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
              Investigative Intelligence Workflows
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => onNavigate('network')}
                className="btn-tactical"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', textAlign: 'left' }}
              >
                <Share2 size={16} color="#38bdf8" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Criminal Network Graph</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Multi-hop shortest path & bridge centrality</div>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => onNavigate('resolution')}
                className="btn-tactical"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', textAlign: 'left' }}
              >
                <Layers size={16} color="#a855f7" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Entity Resolution Studio</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Probabilistic alias matching & IMEI fusion</div>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => onNavigate('timeline')}
                className="btn-tactical"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', textAlign: 'left' }}
              >
                <Clock size={16} color="#f59e0b" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Temporal Crime River</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Scrub events by T-72h, Heist Day, and Laundering</div>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => onNavigate('dossier')}
                className="btn-tactical"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', textAlign: 'left' }}
              >
                <FileText size={16} color="#10b981" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Court-Ready Intelligence Dossier</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Printable charge-sheet brief & chain of custody</div>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
