import React, { useEffect, useRef, useState } from 'react';
import { Network as VisNetwork, DataSet } from 'vis-network/standalone';
import { 
  Network, 
  Filter, 
  Maximize2, 
  Sparkles, 
  Zap, 
  AlertTriangle,
  RotateCcw,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { graphEngine } from '../services/GraphEngine';
import type { GraphNode, GraphEdge } from '../services/GraphEngine';
import type { SuspectEntity, HiddenPathResult } from '../types';

interface NetworkGraphProps {
  initialSelectedEntityId?: string;
  onNavigateToLeads?: () => void;
  onNavigateToResolution?: () => void;
  onNavigateToTimeline?: () => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  initialSelectedEntityId,
  onNavigateToLeads,
  onNavigateToResolution,
  onNavigateToTimeline
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<VisNetwork | null>(null);

  // Entities & Graph Data
  const [entities] = useState<SuspectEntity[]>(graphEngine.getEntities());
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(initialSelectedEntityId || 'entity-suspect-a');
  
  // Hidden Connection Tool State
  const [sourceEntityId, setSourceEntityId] = useState<string>('entity-suspect-a');
  const [targetEntityId, setTargetEntityId] = useState<string>('entity-suspect-c');
  const [hiddenPathResult, setHiddenPathResult] = useState<HiddenPathResult | null>(null);
  const [isDiscoveringPath, setIsDiscoveringPath] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  // Graph Filters
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterRelation, setFilterRelation] = useState<string>('ALL');

  // Initialize Network Graph
  useEffect(() => {
    if (!containerRef.current) return;

    const rawData = graphEngine.getVisGraphData();
    
    // Filter nodes & edges if active
    let filteredNodes = rawData.nodes;
    if (filterType !== 'ALL') {
      filteredNodes = filteredNodes.filter(n => n.type === filterType);
    }

    const nodeIds = new Set(filteredNodes.map(n => n.id));
    let filteredEdges = rawData.edges.filter(e => nodeIds.has(e.from) && nodeIds.has(e.to));
    if (filterRelation !== 'ALL') {
      filteredEdges = filteredEdges.filter(e => e.relationType === filterRelation);
    }

    const data = {
      nodes: new DataSet<GraphNode>(filteredNodes),
      edges: new DataSet<GraphEdge>(filteredEdges)
    };

    const options: any = {
      nodes: {
        shape: 'dot',
        size: 24,
        font: {
          color: '#f8fafc',
          size: 13,
          face: 'Outfit, Inter, sans-serif',
          strokeWidth: 3,
          strokeColor: '#0a0e17'
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 1.5,
        color: {
          color: '#475569',
          highlight: '#38bdf8',
          hover: '#38bdf8'
        },
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.2
        },
        arrows: {
          to: { enabled: true, scaleFactor: 0.7 }
        },
        font: {
          color: '#94a3b8',
          size: 10,
          align: 'middle',
          background: '#0f172a'
        }
      },
      physics: {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -70,
          centralGravity: 0.015,
          springLength: 140,
          springConstant: 0.08,
          damping: 0.4
        },
        stabilization: {
          iterations: 150
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        navigationButtons: false,
        keyboard: false,
        zoomView: true
      }
    };

    const network = new VisNetwork(containerRef.current, data, options);
    networkInstanceRef.current = network;

    // Node click handler
    network.on('click', (params) => {
      if (params.nodes && params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0] as string;
        setSelectedEntityId(clickedNodeId);
      }
    });

    return () => {
      network.destroy();
      networkInstanceRef.current = null;
    };
  }, [filterType, filterRelation]);

  // Handle Finding Hidden Connection with Progressive Reveal
  const handleFindHiddenConnection = () => {
    setIsDiscoveringPath(true);
    setHiddenPathResult(null);
    setActiveStepIndex(-1);

    // Compute deterministic path result
    const result = graphEngine.findHiddenConnection(sourceEntityId, targetEntityId);

    // Progressive step reveal animation
    setTimeout(() => {
      setHiddenPathResult(result);
      setIsDiscoveringPath(false);
      
      // Animate steps 1 by 1
      result.evidenceSteps.forEach((_, idx) => {
        setTimeout(() => {
          setActiveStepIndex(idx);
        }, (idx + 1) * 350);
      });

      // Highlight path on graph canvas
      if (networkInstanceRef.current && result.pathNodes.length > 0) {
        networkInstanceRef.current.selectNodes(result.pathNodes, true);
        networkInstanceRef.current.fit({
          nodes: result.pathNodes,
          animation: { duration: 800, easingFunction: 'easeInOutQuad' }
        });
      }

      // Trigger celebratory discovery confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleResetGraph = () => {
    setHiddenPathResult(null);
    setActiveStepIndex(-1);
    if (networkInstanceRef.current) {
      networkInstanceRef.current.unselectAll();
      networkInstanceRef.current.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });
    }
  };

  const selectedEntity = selectedEntityId ? graphEngine.getEntityById(selectedEntityId) : null;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 20px 100px 20px' }}>
      {/* Top Controls & Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">KNOWLEDGE GRAPH CANVAS</span>
            <span className="badge badge-critical">MULTI-HOP LINK ANALYSIS</span>
          </div>
          <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc' }}>
            Interactive Criminal Intelligence Network
          </h1>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <Filter size={13} color="#94a3b8" />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Entity:</span>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#f8fafc', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#0f172a' }}>All Entities</option>
              <option value="person" style={{ background: '#0f172a' }}>Persons (8)</option>
              <option value="phone" style={{ background: '#0f172a' }}>Burner Phones (1)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Relation:</span>
            <select
              value={filterRelation}
              onChange={e => setFilterRelation(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#f8fafc', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#0f172a' }}>All Relations</option>
              <option value="called" style={{ background: '#0f172a' }}>Telephony Calls (CDR)</option>
              <option value="transferred_money" style={{ background: '#0f172a' }}>Hawala & Wire Transfers</option>
              <option value="associated_with" style={{ background: '#0f172a' }}>Direct Association</option>
            </select>
          </div>

          <button
            onClick={() => networkInstanceRef.current?.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } })}
            className="btn-tactical"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            title="Fit to Screen"
          >
            <Maximize2 size={13} />
            Fit View
          </button>
        </div>
      </div>

      {/* HERO SECTION: "FIND HIDDEN CONNECTION" DISCOVERY BOX */}
      <div 
        className="tactical-panel" 
        style={{ 
          padding: '16px 20px', 
          marginBottom: '16px', 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 132, 199, 0.15))', 
          border: '1px solid #38bdf8' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '15px', color: '#f8fafc', letterSpacing: '0.5px' }}>
                  DISCOVER HIDDEN SYNDICATE CONNECTION
                </span>
                <span className="badge badge-success" style={{ fontSize: '10px' }}>AI GRAPH TRAVERSAL</span>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Select two seemingly disconnected entities to compute multi-hop bridge pathways and verify evidentiary citations:
              </div>
            </div>
          </div>

          {/* Selector Dropdowns & Trigger Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#080c14', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '11px', color: '#f97316', fontWeight: 600 }}>SOURCE:</span>
              <select
                value={sourceEntityId}
                onChange={e => setSourceEntityId(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#f8fafc', fontSize: '13px', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                {entities.map(e => (
                  <option key={e.id} value={e.id} style={{ background: '#0f172a' }}>
                    {e.name} ({e.role.split('/')[0]})
                  </option>
                ))}
              </select>
            </div>

            <span style={{ color: '#38bdf8', fontWeight: 800 }}>➔</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#080c14', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 600 }}>TARGET:</span>
              <select
                value={targetEntityId}
                onChange={e => setTargetEntityId(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#f8fafc', fontSize: '13px', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                {entities.map(e => (
                  <option key={e.id} value={e.id} style={{ background: '#0f172a' }}>
                    {e.name} ({e.role.split('/')[0]})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleFindHiddenConnection}
              disabled={isDiscoveringPath}
              className="btn-tactical btn-primary-tactical"
              style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 700 }}
            >
              <Sparkles size={15} />
              {isDiscoveringPath ? 'Traversing Graph...' : 'FIND HIDDEN CONNECTION'}
            </button>

            {hiddenPathResult && (
              <button
                onClick={handleResetGraph}
                className="btn-tactical"
                style={{ padding: '8px 12px', fontSize: '12px' }}
                title="Reset View"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Result Breakdown Card (Progressively Revealed) */}
        {hiddenPathResult && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-critical" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  <AlertTriangle size={13} />
                  HIDDEN CONNECTION DISCOVERED: {hiddenPathResult.confidenceScore}% CONFIDENCE
                </span>
                <span style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 600 }}>
                  Key Linchpin Identified: <strong style={{ color: '#fb7185' }}>{hiddenPathResult.keyIntermediary.name}</strong> ({hiddenPathResult.keyIntermediary.role})
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {onNavigateToLeads && (
                  <button
                    onClick={onNavigateToLeads}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    Open Generated AI Lead ➔
                  </button>
                )}
                {onNavigateToResolution && (
                  <button
                    onClick={onNavigateToResolution}
                    className="btn-tactical"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    View Alias Disambiguation
                  </button>
                )}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px', lineHeight: 1.5 }}>
              {hiddenPathResult.summary}
            </p>

            {/* Step-by-Step Evidence Chain Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${hiddenPathResult.evidenceSteps.length}, 1fr)`, gap: '10px' }}>
              {hiddenPathResult.evidenceSteps.map((step, idx) => {
                const isStepActive = idx <= activeStepIndex;
                return (
                  <div
                    key={step.stepNumber}
                    style={{
                      background: isStepActive ? '#080c14' : 'rgba(8, 12, 20, 0.4)',
                      padding: '12px',
                      borderRadius: '6px',
                      border: `1px solid ${isStepActive ? '#38bdf8' : '#1e293b'}`,
                      transition: 'all 0.3s ease',
                      opacity: isStepActive ? 1 : 0.4,
                      transform: isStepActive ? 'translateY(0)' : 'translateY(4px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                        HOP {step.stepNumber}
                      </span>
                      <span className="evidence-tag" style={{ fontSize: '10px' }}>
                        {step.evidenceSource.split(' ')[0]}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                      {step.relationship}
                    </div>

                    <div style={{ fontSize: '11px', color: '#38bdf8', marginBottom: '6px' }}>
                      {step.fromNode.split('(')[0]} ➔ {step.toNode.split('(')[0]}
                    </div>

                    <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
                      {step.evidenceText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Canvas + Inspector View */}
      <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '20px' }}>
        {/* Left: Graph Canvas */}
        <div className="tactical-panel" style={{ height: '620px', position: 'relative', overflow: 'hidden' }}>
          <div className="tactical-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Network size={16} color="#38bdf8" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                FORCE-DIRECTED LINK ANALYSIS CANVAS
              </span>
            </div>

            {/* Canvas Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fb7185' }}>
                ● Critical Suspect / Linchpin
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fb923c' }}>
                ● High Threat
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c084fc' }}>
                ◆ Burner SIM
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399' }}>
                — Money Wire
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#a855f7' }}>
                — Phone Call
              </span>
            </div>
          </div>

          {/* Vis.js Canvas Container */}
          <div ref={containerRef} style={{ width: '100%', height: 'calc(100% - 45px)', background: '#080c14' }} />
        </div>

        {/* Right: Deep Node Inspector Sidebar */}
        <div className="tactical-panel" style={{ height: '620px', display: 'flex', flexDirection: 'column' }}>
          <div className="tactical-header">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              ENTITY DOSSIER INSPECTOR
            </span>
            {selectedEntity && (
              <span className={`badge badge-${selectedEntity.threatLevel}`}>
                {selectedEntity.threatLevel.toUpperCase()}
              </span>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
            {selectedEntity ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <div 
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '8px', 
                      background: selectedEntity.threatLevel === 'critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                      border: `1px solid ${selectedEntity.threatLevel === 'critical' ? '#ef4444' : '#38bdf8'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '16px',
                      fontFamily: 'var(--font-mono)',
                      color: '#f8fafc'
                    }}
                  >
                    {selectedEntity.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                      {selectedEntity.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 500 }}>
                      {selectedEntity.role}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      Status: <strong style={{ color: '#cbd5e1' }}>{selectedEntity.status}</strong>
                    </div>
                  </div>
                </div>

                {/* Known Aliases */}
                {selectedEntity.aliases && selectedEntity.aliases.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      KNOWN ALIASES / DISAMBIGUATION TAGS:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selectedEntity.aliases.map((a, i) => (
                        <span key={i} className="evidence-tag" style={{ color: '#fb923c' }}>
                          "{a}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Identifiers */}
                <div style={{ background: '#080c14', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                  {selectedEntity.primaryPhone && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>Primary Phone:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#c084fc', fontWeight: 600 }}>{selectedEntity.primaryPhone}</span>
                    </div>
                  )}
                  {selectedEntity.associatedVehicles && selectedEntity.associatedVehicles.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>Vehicle:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#f472b6', fontWeight: 600 }}>{selectedEntity.associatedVehicles.join(', ')}</span>
                    </div>
                  )}
                  {selectedEntity.associatedAccounts && selectedEntity.associatedAccounts.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>Bank Accounts:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#34d399', fontWeight: 600 }}>{selectedEntity.associatedAccounts.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Bio Summary */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                    INVESTIGATIVE BRIEF:
                  </div>
                  <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {selectedEntity.summary}
                  </p>
                </div>

                {/* IPC Sections */}
                {selectedEntity.ipcSections && selectedEntity.ipcSections.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      CHARGED IPC & STATUTORY SECTIONS:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selectedEntity.ipcSections.map((sec, i) => (
                        <span key={i} className="badge badge-critical" style={{ fontSize: '10px' }}>
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => {
                      setSourceEntityId(selectedEntity.id);
                      setTargetEntityId('entity-suspect-c');
                      handleFindHiddenConnection();
                    }}
                    className="btn-tactical btn-primary-tactical"
                    style={{ padding: '8px', fontSize: '12px' }}
                  >
                    <Zap size={14} />
                    Trace Connections From This Node
                  </button>
                  {onNavigateToTimeline && (
                    <button
                      onClick={onNavigateToTimeline}
                      className="btn-tactical"
                      style={{ padding: '8px', fontSize: '12px' }}
                    >
                      Inspect Node on Temporal Timeline
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <Info size={28} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                <p style={{ fontSize: '13px' }}>Click any entity node on the canvas to inspect dossier details, direct connections, and evidentiary citations.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
