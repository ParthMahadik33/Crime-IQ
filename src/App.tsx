import { useState } from 'react';
import { Header } from './components/Header';
import { DemoPitchBar } from './components/DemoPitchBar';
import { ChallengeLanding } from './components/ChallengeLanding';
import { CommandCenter } from './components/CommandCenter';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { NetworkGraph } from './components/NetworkGraph';
import { EntityResolutionView } from './components/EntityResolutionView';
import { TemporalTimeline } from './components/TemporalTimeline';
import { InvestigationLeads } from './components/InvestigationLeads';
import { CaseDossierExport } from './components/CaseDossierExport';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('challenge');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(true);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [selectedEntityForGraph, setSelectedEntityForGraph] = useState<string>('entity-suspect-a');

  // Trigger from any component to jump to graph with entity selected
  const handleNavigateToGraph = (entityId?: string) => {
    if (entityId) setSelectedEntityForGraph(entityId);
    setActiveTab('network');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080c14', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Tactical Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        demoStep={demoStep}
        setDemoStep={setDemoStep}
        isDemoActive={isDemoActive}
        setIsDemoActive={setIsDemoActive}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'challenge' && (
          <ChallengeLanding
            onEnterInvestigation={() => setActiveTab('command')}
            onExploreEvidence={() => setActiveTab('evidence')}
          />
        )}

        {activeTab === 'command' && (
          <CommandCenter
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectEntity={(id) => handleNavigateToGraph(id)}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceExplorer
            onNavigateToGraph={(nodeId) => handleNavigateToGraph(nodeId)}
          />
        )}

        {activeTab === 'network' && (
          <NetworkGraph
            initialSelectedEntityId={selectedEntityForGraph}
            onNavigateToLeads={() => setActiveTab('leads')}
            onNavigateToResolution={() => setActiveTab('resolution')}
            onNavigateToTimeline={() => setActiveTab('timeline')}
          />
        )}

        {activeTab === 'resolution' && (
          <EntityResolutionView
            onNavigateToGraph={(entityId) => handleNavigateToGraph(entityId)}
          />
        )}

        {activeTab === 'timeline' && (
          <TemporalTimeline
            onNavigateToGraph={(nodeId) => handleNavigateToGraph(nodeId)}
          />
        )}

        {activeTab === 'leads' && (
          <InvestigationLeads
            onNavigateToGraph={(nodeId) => handleNavigateToGraph(nodeId)}
            onNavigateToDossier={() => setActiveTab('dossier')}
          />
        )}

        {activeTab === 'dossier' && (
          <CaseDossierExport />
        )}
      </main>

      {/* Guided SIH Hackathon Pitch Controller Bar */}
      {isDemoActive && (
        <DemoPitchBar
          currentStep={demoStep}
          setStep={setDemoStep}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}

export default App;
