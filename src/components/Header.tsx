import React from 'react';
import { 
  ShieldAlert, 
  Network, 
  FileText, 
  Clock, 
  Sparkles, 
  Layers, 
  Printer, 
  Activity, 
  Compass
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDemoActive,
  setIsDemoActive
}) => {
  const tabs = [
    { id: 'challenge', label: 'Challenge Brief', icon: Compass },
    { id: 'command', label: 'Command Center', icon: Activity },
    { id: 'evidence', label: 'Evidence Explorer', icon: FileText },
    { id: 'network', label: 'Network Graph', icon: Network, highlight: true },
    { id: 'resolution', label: 'Entity Resolution', icon: Layers },
    { id: 'timeline', label: 'Temporal Timeline', icon: Clock },
    { id: 'leads', label: 'AI Intel Leads', icon: Sparkles },
    { id: 'dossier', label: 'Case Dossier', icon: Printer }
  ];

  return (
    <header className="tactical-panel no-print" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, zIndex: 50, position: 'sticky', top: 0, backgroundColor: '#0a0e17' }}>
      {/* Top Meta Bar */}
      <div style={{ padding: '8px 20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} className="animate-pulse-subtle" />
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#f8fafc' }}>
              NETRA CORE <span style={{ color: '#64748b' }}>v2.4.1-PROD</span>
            </span>
          </div>

          <div style={{ height: '14px', width: '1px', background: '#334155' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#94a3b8' }}>CASE:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>
              OPERATION NEXUS (CR-8821/MUMBAI)
            </span>
            <span className="badge badge-critical" style={{ fontSize: '10px' }}>THREAT: CRITICAL</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
            <span style={{ color: '#34d399' }}>● FUSION ACTIVE:</span>
            <span className="evidence-tag" style={{ color: '#cbd5e1' }}>MUMBAI POLICE</span>
            <span className="evidence-tag" style={{ color: '#cbd5e1' }}>DRI MZU</span>
            <span className="evidence-tag" style={{ color: '#cbd5e1' }}>EOW / ED</span>
          </div>

          <button
            onClick={() => setIsDemoActive(!isDemoActive)}
            className="btn-tactical"
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              background: isDemoActive ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
              borderColor: isDemoActive ? '#38bdf8' : '#334155',
              color: isDemoActive ? '#38bdf8' : '#94a3b8'
            }}
          >
            <Sparkles size={13} />
            {isDemoActive ? 'SIH PITCH MODE: ON' : 'SIH PITCH MODE: OFF'}
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            onClick={() => setActiveTab('challenge')} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 0' }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'linear-gradient(135deg, #0284c7, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #38bdf8' }}>
              <ShieldAlert size={18} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '1px', fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                NETRA
              </div>
              <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'var(--font-mono)' }}>
                Threat Relationship Analysis
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '16px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = '#f8fafc';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
                {t.highlight && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', marginLeft: '-2px' }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
