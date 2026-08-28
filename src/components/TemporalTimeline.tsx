import React, { useState } from 'react';
import { 
  Clock, 
  FileText, 
  PhoneCall, 
  CreditCard, 
  MapPin, 
  ShieldAlert
} from 'lucide-react';
import { temporalEngine } from '../services/TemporalEngine';
import type { TimelineEvent } from '../services/TemporalEngine';

interface TemporalTimelineProps {
  onNavigateToGraph: (nodeId?: string) => void;
}

export const TemporalTimeline: React.FC<TemporalTimelineProps> = ({
  onNavigateToGraph
}) => {
  const [activePhase, setActivePhase] = useState<'all' | 'before' | 'during' | 'after'>('all');
  const [activeCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const allEvents = temporalEngine.getAllEvents();
  
  const filteredEvents = allEvents.filter(e => {
    const phaseMatch = activePhase === 'all' || e.phase === activePhase;
    const catMatch = activeCategory === 'ALL' || e.category === activeCategory;
    return phaseMatch && catMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'FIR': return <FileText size={15} color="#fb7185" />;
      case 'COMMUNICATION': return <PhoneCall size={15} color="#c084fc" />;
      case 'FINANCIAL': return <CreditCard size={15} color="#34d399" />;
      case 'LOCATION': return <MapPin size={15} color="#22d3ee" />;
      case 'INTELLIGENCE': return <ShieldAlert size={15} color="#fb923c" />;
      default: return <Clock size={15} color="#94a3b8" />;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical': return <span className="badge badge-critical">CRITICAL EVENT</span>;
      case 'high': return <span className="badge badge-high">HIGH PRIORITY</span>;
      case 'medium': return <span className="badge badge-medium">EVIDENTIARY</span>;
      default: return <span className="badge badge-neutral">LOGGED</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-cyan">TEMPORAL CRIME RIVER</span>
            <span className="badge badge-purple">TIME-SPACE SYNCHRONIZATION</span>
          </div>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc' }}>
            Chronological Investigation Timeline
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Reconstruct the exact sequence of events across phone calls, banking transfers, vehicle tolls, and incident strikes.
          </p>
        </div>

        {/* Phase Buttons */}
        <div style={{ display: 'flex', gap: '8px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <button
            onClick={() => setActivePhase('all')}
            className={`btn-tactical ${activePhase === 'all' ? 'btn-primary-tactical' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            All Events ({allEvents.length})
          </button>
          <button
            onClick={() => setActivePhase('before')}
            className={`btn-tactical ${activePhase === 'before' ? 'btn-primary-tactical' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            T-72h Recon Phase
          </button>
          <button
            onClick={() => setActivePhase('during')}
            className={`btn-tactical ${activePhase === 'during' ? 'btn-primary-tactical' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            Crime Day Strike
          </button>
          <button
            onClick={() => setActivePhase('after')}
            className={`btn-tactical ${activePhase === 'after' ? 'btn-primary-tactical' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            Laundering & Transit
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid: Timeline Stream on Left, Event Detail on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '24px' }}>
        {/* Left: Scrollable Timeline River */}
        <div className="tactical-panel" style={{ height: '660px', display: 'flex', flexDirection: 'column' }}>
          <div className="tactical-header">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              CHRONOLOGICAL EVENT STREAM ({filteredEvents.length} EVENTS)
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Scrub down to advance time</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ position: 'relative', borderLeft: '2px solid #1e293b', marginLeft: '12px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredEvents.map((evt) => {
                const isSelected = selectedEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    style={{
                      position: 'relative',
                      background: isSelected ? 'rgba(15, 23, 42, 0.95)' : '#080c14',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${isSelected ? '#38bdf8' : '#1e293b'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Node Dot on Timeline */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-29px',
                        top: '18px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: isSelected ? '#38bdf8' : '#0f172a',
                        border: `2px solid ${evt.severity === 'critical' ? '#ef4444' : evt.severity === 'high' ? '#f97316' : '#38bdf8'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />

                    {/* Event Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getCategoryIcon(evt.category)}
                        <span className="evidence-tag">{evt.rawRecordRef}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        {evt.formattedTime}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                      {evt.title}
                    </h4>

                    <div style={{ fontSize: '12px', color: '#38bdf8', marginBottom: '6px' }}>
                      {evt.subtitle}
                    </div>

                    <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '8px' }}>
                      {evt.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'gap', gap: '4px', flexWrap: 'wrap' }}>
                        {evt.involvedEntities.map((ent, i) => (
                          <span key={i} className="evidence-tag" style={{ fontSize: '10px', color: '#cbd5e1' }}>
                            {ent}
                          </span>
                        ))}
                      </div>
                      {getSeverityBadge(evt.severity)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Event Deep Inspector */}
        <div className="tactical-panel" style={{ height: '660px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div className="tactical-header" style={{ margin: '-24px -24px 20px -24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              EVENT EVIDENTIARY AUDIT
            </span>
            <span className="badge badge-cyan">VERIFIED CITATION</span>
          </div>

          {selectedEvent ? (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                {getCategoryIcon(selectedEvent.category)}
                <span className="badge badge-purple">{selectedEvent.category}</span>
                <span className="evidence-tag">{selectedEvent.rawRecordRef}</span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                {selectedEvent.title}
              </h3>

              <div style={{ fontSize: '13px', color: '#38bdf8', marginBottom: '16px' }}>
                {selectedEvent.subtitle}
              </div>

              <div style={{ background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  RECORDED TIMESTAMP:
                </div>
                <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 600 }}>
                  {selectedEvent.formattedTime} (Phase: {selectedEvent.phase.toUpperCase()})
                </div>
              </div>

              <div style={{ background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  EVIDENTIARY DESCRIPTION & TRANSCRIPT:
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {selectedEvent.description}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                  INVOLVED ENTITY NODES:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedEvent.involvedEntities.map((ent, idx) => (
                    <span key={idx} className="evidence-tag" style={{ color: '#38bdf8', padding: '4px 8px' }}>
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              {selectedEvent.involvedNodeIds && selectedEvent.involvedNodeIds.length > 0 && (
                <button
                  onClick={() => onNavigateToGraph(selectedEvent.involvedNodeIds![0])}
                  className="btn-tactical btn-primary-tactical"
                  style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600 }}
                >
                  Locate & Highlight Nodes on Network Graph ➔
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <Clock size={32} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <p style={{ fontSize: '13px' }}>Click any timeline record on the left to inspect full intercepted transcripts, involved suspect nodes, and audit trails.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
