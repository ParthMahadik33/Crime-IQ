import React, { useState } from 'react';
import { 
  FileText, 
  PhoneCall, 
  CreditCard, 
  MapPin, 
  Car, 
  ShieldAlert, 
  Search, 
  Sparkles
} from 'lucide-react';
import firReportsData from '../data/fir_reports.json';
import callRecordsData from '../data/call_records.json';
import transactionsData from '../data/transactions.json';
import locationsData from '../data/locations.json';
import vehiclesData from '../data/vehicles.json';
import intelReportsData from '../data/intelligence_reports.json';

interface EvidenceExplorerProps {
  onNavigateToGraph: (nodeId?: string) => void;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({
  onNavigateToGraph
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'fir' | 'cdr' | 'finance' | 'location' | 'vehicle' | 'intel';
    data: any;
  }>({
    type: 'fir',
    data: firReportsData[0]
  });

  const [viewMode, setViewMode] = useState<'extracted' | 'raw'>('extracted');

  // Filter items based on activeCategory and searchQuery
  const filterMatches = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const categories = [
    { id: 'ALL', label: 'All Evidence', count: 3 + 13 + 8 + 12 + 3 + 3 },
    { id: 'FIR', label: 'FIR Reports', icon: FileText, count: firReportsData.length },
    { id: 'COMMUNICATION', label: 'Call Records (CDR)', icon: PhoneCall, count: callRecordsData.length },
    { id: 'FINANCIAL', label: 'Financial / Hawala', icon: CreditCard, count: transactionsData.length },
    { id: 'LOCATION', label: 'Location & ANPR', icon: MapPin, count: locationsData.length },
    { id: 'VEHICLE', label: 'Vehicles', icon: Car, count: vehiclesData.length },
    { id: 'INTELLIGENCE', label: 'Intelligence Reports', icon: ShieldAlert, count: intelReportsData.length }
  ];

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-cyan">EVIDENCE REPOSITORY</span>
            <span className="badge badge-purple">AI ENTITY EXTRACTION ENGINE</span>
          </div>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc' }}>
            Multi-Source Evidence Explorer
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Inspect unstructured police notes, CDR feeds, and bank slips. Watch NETRA parse entities into linked graph triples.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search suspect, phone, FIR, plate..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                padding: '8px 12px 8px 34px',
                color: '#f8fafc',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {categories.map(c => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`btn-tactical ${isActive ? 'btn-primary-tactical' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              {c.label} ({c.count})
            </button>
          );
        })}
      </div>

      {/* 2-Column Layout: Left List, Right Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '20px' }}>
        {/* Left: Scrollable Evidence Records */}
        <div className="tactical-panel" style={{ height: '640px', display: 'flex', flexDirection: 'column' }}>
          <div className="tactical-header">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              INGESTED RECORDS LIST ({activeCategory})
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Click record to analyze</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* FIRs */}
            {(activeCategory === 'ALL' || activeCategory === 'FIR') &&
              firReportsData.filter(f => filterMatches(f.firNumber + f.briefFacts + f.policeStation)).map(fir => (
                <div
                  key={fir.firNumber}
                  onClick={() => setSelectedItem({ type: 'fir', data: fir })}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: selectedItem.data?.firNumber === fir.firNumber ? '#1e293b' : '#080c14',
                    border: `1px solid ${selectedItem.data?.firNumber === fir.firNumber ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-critical">{fir.firNumber}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{new Date(fir.dateFiled).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                    {fir.policeStation}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Accused: {fir.primaryAccused.join(', ')}
                  </div>
                </div>
              ))}

            {/* CDRs */}
            {(activeCategory === 'ALL' || activeCategory === 'COMMUNICATION') &&
              callRecordsData.filter(c => filterMatches(c.callId + c.callerName + c.receiverName + c.interceptSummary)).map(cdr => (
                <div
                  key={cdr.callId}
                  onClick={() => setSelectedItem({ type: 'cdr', data: cdr })}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: selectedItem.data?.callId === cdr.callId ? '#1e293b' : '#080c14',
                    border: `1px solid ${selectedItem.data?.callId === cdr.callId ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-purple">{cdr.callId} // {cdr.callType}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{cdr.durationSeconds}s</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                    {cdr.callerName || cdr.callerNumber} ➔ {cdr.receiverName || cdr.receiverNumber}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Tower: {cdr.towerLocation}
                  </div>
                </div>
              ))}

            {/* Transactions */}
            {(activeCategory === 'ALL' || activeCategory === 'FINANCIAL') &&
              transactionsData.filter(t => filterMatches(t.txId + t.fromEntity + t.toEntity + t.referenceNote)).map(tx => (
                <div
                  key={tx.txId}
                  onClick={() => setSelectedItem({ type: 'finance', data: tx })}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: selectedItem.data?.txId === tx.txId ? '#1e293b' : '#080c14',
                    border: `1px solid ${selectedItem.data?.txId === tx.txId ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-success">{tx.txId} // {tx.mode}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>₹{(tx.amountINR / 100000).toFixed(1)} L</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                    {tx.fromEntity} ➔ {tx.toEntity}
                  </div>
                </div>
              ))}

            {/* Locations */}
            {(activeCategory === 'ALL' || activeCategory === 'LOCATION') &&
              locationsData.filter(l => filterMatches(l.eventId + l.entityName + l.locationName)).map(loc => (
                <div
                  key={loc.eventId}
                  onClick={() => setSelectedItem({ type: 'location', data: loc })}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: selectedItem.data?.eventId === loc.eventId ? '#1e293b' : '#080c14',
                    border: `1px solid ${selectedItem.data?.eventId === loc.eventId ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-cyan">{loc.eventId} // {loc.source}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{(loc.confidence * 100).toFixed(0)}% Conf</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
                    {loc.entityName} @ {loc.locationName}
                  </div>
                </div>
              ))}

            {/* Intel Reports */}
            {(activeCategory === 'ALL' || activeCategory === 'INTELLIGENCE') &&
              intelReportsData.filter(i => filterMatches(i.reportId + i.title + i.text)).map(intel => (
                <div
                  key={intel.reportId}
                  onClick={() => setSelectedItem({ type: 'intel', data: intel })}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: selectedItem.data?.reportId === intel.reportId ? '#1e293b' : '#080c14',
                    border: `1px solid ${selectedItem.data?.reportId === intel.reportId ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-critical">{intel.reportId}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{intel.sourceType}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
                    {intel.title}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Deep AI Entity Extractor & Structured Triple Viewer */}
        <div className="tactical-panel" style={{ height: '640px', display: 'flex', flexDirection: 'column' }}>
          <div className="tactical-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#38bdf8" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                AI Named Entity Extraction & Knowledge Triple Parser
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setViewMode('extracted')}
                className={`btn-tactical ${viewMode === 'extracted' ? 'btn-primary-tactical' : ''}`}
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                Structured Triples
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`btn-tactical ${viewMode === 'raw' ? 'btn-primary-tactical' : ''}`}
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                Raw Document
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {selectedItem.type === 'fir' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-critical">{selectedItem.data.firNumber}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px' }}>
                      {selectedItem.data.policeStation}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Incident Date: {new Date(selectedItem.data.incidentDate).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToGraph('entity-suspect-a')}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Trace in Network Graph ➔
                  </button>
                </div>

                {/* Highlighted Unstructured Text */}
                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    UNSTRUCTURED POLICE NARRATIVE (AUTO-TAGGED ENTITIES):
                  </div>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    On 12-Oct-2024 at 19:45 hrs, four armed individuals entered Mehta Diamond Vault located at <span className="entity-pill entity-pill-location">Hill Road Bandra</span>. 
                    Primary accused <span className="entity-pill entity-pill-person">Tariq Shaikh ("Guddu Bandra")</span> and driver <span className="entity-pill entity-pill-person">Imran Qureshi</span> 
                    fled in vehicle <span className="entity-pill entity-pill-vehicle">MH-02-CB-8812</span> with <span className="entity-pill entity-pill-account">₹4.2 Cr Diamond Loot</span>. 
                    Intercepts confirm prior communication with coordinator <span className="entity-pill entity-pill-person">Raja Bhai</span> on burner number <span className="entity-pill entity-pill-phone">+91 98201 44892</span>.
                  </p>
                </div>

                {/* Extracted Entity Badges */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>
                    EXTRACTED REPOSITORIES FOR KNOWLEDGE GRAPH:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '11px', color: '#fb923c', fontWeight: 600 }}>IDENTIFIED PERSONS</div>
                      <div style={{ fontSize: '12px', color: '#f8fafc' }}>{selectedItem.data.extractedEntities?.persons.join(', ')}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: 600 }}>COMMUNICATION TARGETS</div>
                      <div style={{ fontSize: '12px', color: '#f8fafc' }}>{selectedItem.data.extractedEntities?.phones.join(', ')}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '11px', color: '#22d3ee', fontWeight: 600 }}>GEOGRAPHIC LOCATIONS</div>
                      <div style={{ fontSize: '12px', color: '#f8fafc' }}>{selectedItem.data.extractedEntities?.locations.join(', ')}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '11px', color: '#f472b6', fontWeight: 600 }}>VEHICLES & ASSETS</div>
                      <div style={{ fontSize: '12px', color: '#f8fafc' }}>{selectedItem.data.extractedEntities?.vehicles.join(', ')}</div>
                    </div>
                  </div>
                </div>

                {/* Seized Items */}
                <div style={{ background: '#080c14', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                    SEIZED EVIDENCE ITEMS:
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {selectedItem.data.seizedItems?.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedItem.type === 'cdr' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-purple">{selectedItem.data.callId}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px' }}>
                      Telephony Intercept Session
                    </h3>
                  </div>

                  <button
                    onClick={() => onNavigateToGraph('entity-unknown-contact')}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Trace in Network Graph ➔
                  </button>
                </div>

                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Caller: <strong style={{ color: '#f8fafc' }}>{selectedItem.data.callerName || selectedItem.data.callerNumber}</strong> ({selectedItem.data.callerNumber})
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                    Receiver: <strong style={{ color: '#f8fafc' }}>{selectedItem.data.receiverName || selectedItem.data.receiverNumber}</strong> ({selectedItem.data.receiverNumber})
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #8b5cf6', fontSize: '13px', color: '#e2e8f0', fontStyle: 'italic' }}>
                    "{selectedItem.data.interceptSummary}"
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>IMEI NUMBER</div>
                    <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{selectedItem.data.imei}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>CELL TOWER LOCATION</div>
                    <div style={{ fontSize: '13px', color: '#f8fafc' }}>{selectedItem.data.towerLocation} ({selectedItem.data.towerId})</div>
                  </div>
                </div>
              </div>
            )}

            {selectedItem.type === 'finance' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-success">{selectedItem.data.txId}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px' }}>
                      Fund Remittance / Hawala Layering
                    </h3>
                  </div>

                  <button
                    onClick={() => onNavigateToGraph('entity-suspect-b')}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Trace in Network Graph ➔
                  </button>
                </div>

                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    ₹{(selectedItem.data.amountINR / 100000).toFixed(2)} Lakhs
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Mode: <strong style={{ color: '#f8fafc' }}>{selectedItem.data.mode}</strong> • Status: <span className="badge badge-critical">FLAGGED SUSPICIOUS</span>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '13px', color: '#cbd5e1' }}>
                    From: {selectedItem.data.fromEntity} ({selectedItem.data.fromAccount})
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
                    To: {selectedItem.data.toEntity} ({selectedItem.data.toAccount})
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                    Reference Note: {selectedItem.data.referenceNote}
                  </div>
                </div>
              </div>
            )}

            {selectedItem.type === 'intel' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-critical">{selectedItem.data.reportId}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px' }}>
                      {selectedItem.data.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Agency: {selectedItem.data.agency}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToGraph('entity-intermediary-linchpin')}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Trace in Network Graph ➔
                  </button>
                </div>

                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7 }}>
                    {selectedItem.data.text}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                    EXTRACTED KNOWLEDGE TRIPLES:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedItem.data.extractedTriples?.map((t: any, idx: number) => (
                      <div key={idx} style={{ background: '#0f172a', padding: '8px 12px', borderRadius: '4px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 600 }}>{t.subject}</span>
                        <span style={{ color: '#64748b', fontFamily: 'var(--font-mono)' }}>➔ [{t.predicate}] ➔</span>
                        <span style={{ color: '#34d399', fontWeight: 600 }}>{t.object}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8' }}>{(t.confidence * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedItem.type === 'location' && (
              <div>
                <span className="badge badge-cyan">{selectedItem.data.eventId}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px', marginBottom: '12px' }}>
                  {selectedItem.data.entityName}
                </h3>
                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#f8fafc', marginBottom: '4px' }}>
                    Location: <strong>{selectedItem.data.locationName}</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Timestamp: {new Date(selectedItem.data.timestamp).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    Coordinates: [{selectedItem.data.coordinates.join(', ')}] • Source: {selectedItem.data.source}
                  </div>
                </div>
              </div>
            )}

            {selectedItem.type === 'vehicle' && (
              <div>
                <span className="badge badge-purple">{selectedItem.data.plateNumber}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '6px', marginBottom: '12px' }}>
                  {selectedItem.data.makeModel} ({selectedItem.data.color})
                </h3>
                <div style={{ background: '#080c14', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#f8fafc', marginBottom: '4px' }}>
                    Registered Owner: <strong>{selectedItem.data.registeredOwner}</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Known Operators: {selectedItem.data.knownUsers.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
