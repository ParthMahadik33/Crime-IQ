import React, { useState } from 'react';
import { 
  Zap, 
  GitMerge, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { entityResolutionEngine } from '../services/EntityResolutionEngine';
import type { EntityResolutionMatch } from '../types';

interface EntityResolutionViewProps {
  onNavigateToGraph: (entityId?: string) => void;
}

export const EntityResolutionView: React.FC<EntityResolutionViewProps> = ({
  onNavigateToGraph
}) => {
  const [clusters] = useState<EntityResolutionMatch[]>(entityResolutionEngine.getClusters());
  const [selectedCluster, setSelectedCluster] = useState<EntityResolutionMatch>(clusters[0]);
  const [mergedClusters, setMergedClusters] = useState<Record<string, boolean>>({
    'ER-CLUSTER-RAZA-KHAN': true,
    'ER-CLUSTER-KARAN-DAVE': true,
    'ER-CLUSTER-VIKRAM-SOLANKI': true
  });

  // Interactive Live Playground State
  const [inputName1, setInputName1] = useState<string>('Raza Khan');
  const [inputName2, setInputName2] = useState<string>('R. Khan');
  const [hasSharedPhone, setHasSharedPhone] = useState<boolean>(true);
  const [hasSharedLocation, setHasSharedLocation] = useState<boolean>(true);
  const [hasSharedAccount, setHasSharedAccount] = useState<boolean>(true);
  const [hasSharedIntel, setHasSharedIntel] = useState<boolean>(true);

  const customScore = entityResolutionEngine.calculateMultiFacetedResolution(
    inputName1,
    inputName2,
    hasSharedPhone,
    hasSharedLocation,
    hasSharedAccount,
    hasSharedIntel
  );

  const handleMergeToggle = (clusterId: string) => {
    const nextState = !mergedClusters[clusterId];
    setMergedClusters(prev => ({ ...prev, [clusterId]: nextState }));
    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    }
  };

  const isCurrentClusterMerged = !!mergedClusters[selectedCluster.clusterId];

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-purple">ENTITY DISAMBIGUATION CORE</span>
            <span className="badge badge-success">PROBABILISTIC & DETERMINISTIC FUSION</span>
          </div>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc' }}>
            Entity Resolution & Alias Fusion Studio
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '850px' }}>
            Criminals deliberately fragment identities across different systems. NETRA’s multi-faceted resolution algorithm fuses phonetic similarity, IMEI co-location, shared bank accounts, and intelligence debriefs to establish canonical identity clusters.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleMergeToggle(selectedCluster.clusterId)}
            className={`btn-tactical ${isCurrentClusterMerged ? 'btn-primary-tactical' : ''}`}
            style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}
          >
            <GitMerge size={15} />
            {isCurrentClusterMerged ? 'CONFIRMED FUSED CLUSTER ✓' : 'MERGE & CONFIRM IDENTITY'}
          </button>
          
          <button
            onClick={() => onNavigateToGraph('entity-intermediary-linchpin')}
            className="btn-tactical"
            style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderColor: '#38bdf8', color: '#38bdf8' }}
          >
            View Resolved Node on Graph ➔
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '24px', marginBottom: '32px' }}>
        {/* Left Column: Discovered Identity Clusters List */}
        <div className="tactical-panel" style={{ padding: '20px' }}>
          <div className="tactical-header" style={{ margin: '-20px -20px 16px -20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              DISCOVERED IDENTITY CLUSTERS ({clusters.length})
            </span>
            <span style={{ fontSize: '11px', color: '#34d399' }}>● 100% Disambiguated</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clusters.map(cluster => {
              const isSelected = selectedCluster.clusterId === cluster.clusterId;
              const isFused = !!mergedClusters[cluster.clusterId];
              return (
                <div
                  key={cluster.clusterId}
                  onClick={() => setSelectedCluster(cluster)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(15, 23, 42, 0.9)' : '#080c14',
                    border: `1px solid ${isSelected ? '#38bdf8' : '#1e293b'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
                        {cluster.resolvedCanonicalName}
                      </span>
                      {isFused && (
                        <span className="badge badge-success" style={{ fontSize: '9px', padding: '1px 6px' }}>
                          FUSED
                        </span>
                      )}
                    </div>
                    <span className="badge badge-cyan">
                      {(cluster.confidence * 100).toFixed(1)}% Match
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                    {cluster.surfaceForms.length} Surface Forms Detected:
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {cluster.surfaceForms.map((sf, idx) => (
                      <span key={idx} className="evidence-tag" style={{ color: '#c084fc', fontSize: '10px' }}>
                        {sf.split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Evidence Breakdown of Selected Cluster */}
        <div className="tactical-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-critical">
                  CANONICAL IDENTITY CLUSTER
                </span>
                {isCurrentClusterMerged && (
                  <span className="badge badge-success">
                    <CheckCircle2 size={11} /> CANONICALLY MERGED
                  </span>
                )}
              </div>
              <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>
                {selectedCluster.resolvedCanonicalName}
              </h2>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Cluster ID: <span className="evidence-tag">{selectedCluster.clusterId}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {(selectedCluster.confidence * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Overall Fusion Confidence</div>
            </div>
          </div>

          {/* Surface Forms List */}
          <div style={{ background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              MATCHED SURFACE FORMS ACROSS POLICE REPOSITORIES:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.7 }}>
              {selectedCluster.surfaceForms.map((sf, idx) => (
                <li key={idx}>
                  <strong style={{ color: '#f8fafc' }}>{sf.split('(')[0]}</strong>
                  <span style={{ color: '#94a3b8' }}> ({sf.split('(')[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence Criteria Breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
              MATHEMATICAL EVIDENCE LEDGER:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCluster.evidence.map((ev, idx) => (
                <div 
                  key={idx} 
                  style={{ background: '#0f172a', padding: '12px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#38bdf8', fontSize: '13px' }}>
                      {ev.criteria}
                    </span>
                    <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
                      Score: {(ev.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {ev.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Record Citations */}
          <div style={{ background: '#080c14', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
              VERIFIED LINKED EVIDENTIARY CITATIONS:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {selectedCluster.linkedRecords.map((rec, idx) => (
                <span key={idx} className="evidence-tag">
                  {rec}
                </span>
              ))}
            </div>
          </div>

          {/* Merge & Disambiguate Action Bar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleMergeToggle(selectedCluster.clusterId)}
              className="btn-tactical btn-primary-tactical"
              style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700 }}
            >
              <GitMerge size={15} />
              {isCurrentClusterMerged ? 'RE-CONFIRM CANONICAL MERGE' : 'CONFIRM CANONICAL MERGE'}
            </button>
            
            <button
              onClick={() => onNavigateToGraph('entity-intermediary-linchpin')}
              className="btn-tactical"
              style={{ padding: '10px 16px', fontSize: '13px' }}
            >
              Highlight on Knowledge Graph ➔
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Entity Disambiguation Playground */}
      <div 
        className="tactical-panel" 
        style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, #0f172a, rgba(168, 85, 247, 0.1))',
          border: '1px solid rgba(168, 85, 247, 0.4)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Zap size={20} color="#c084fc" />
          <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
            Interactive Disambiguation & Match Calculator
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
          Test the resolution algorithm live with any pair of alias strings and toggle circumstantial evidence factors:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr 4fr', gap: '20px', alignItems: 'center' }}>
          {/* Inputs */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Alias Form 1:</label>
            <input
              type="text"
              value={inputName1}
              onChange={e => setInputName1(e.target.value)}
              style={{
                width: '100%',
                background: '#080c14',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#f8fafc',
                fontSize: '13px',
                marginBottom: '12px'
              }}
            />

            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Alias Form 2:</label>
            <input
              type="text"
              value={inputName2}
              onChange={e => setInputName2(e.target.value)}
              style={{
                width: '100%',
                background: '#080c14',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#f8fafc',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Toggle Factors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#080c14', padding: '14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasSharedPhone}
                onChange={e => setHasSharedPhone(e.target.checked)}
              />
              Shared Phone / Burner SIM (+30%)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasSharedLocation}
                onChange={e => setHasSharedLocation(e.target.checked)}
              />
              Cell Tower Co-Location (+15%)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasSharedAccount}
                onChange={e => setHasSharedAccount(e.target.checked)}
              />
              Bank / Hawala Remittance (+10%)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasSharedIntel}
                onChange={e => setHasSharedIntel(e.target.checked)}
              />
              Intelligence Cross-Citation (+10%)
            </label>
          </div>

          {/* Live Output */}
          <div style={{ background: '#080c14', padding: '20px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              CALCULATED MATCH PROBABILITY
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: customScore.confidence > 0.8 ? '#34d399' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {(customScore.confidence * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              String Edit Similarity: {(customScore.stringSimilarity * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
