import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play
} from 'lucide-react';

interface DemoPitchBarProps {
  currentStep: number;
  setStep: (step: number) => void;
  setActiveTab: (tab: string) => void;
  triggerHiddenConnection?: () => void;
  triggerEntityResolutionDemo?: () => void;
}

export const DEMO_STEPS = [
  {
    step: 1,
    tab: 'challenge',
    title: '1. The Problem: Fragmented Incidents',
    speakerNote: 'Judges, three major crimes hit Mumbai: A jewelry heist in Bandra, Hawala money in Zaveri Bazaar, and a container tampering case in Bhiwandi. Manually, there is zero direct link.',
    actionLabel: 'View Evidence Logs'
  },
  {
    step: 2,
    tab: 'command',
    title: '2. Multi-Agency Fusion Center',
    speakerNote: 'NETRA ingests FIRs, CDRs, Hawala bank records, ANPR vehicle tracking, and intel memos into a unified investigative command center.',
    actionLabel: 'Enter Command Center'
  },
  {
    step: 3,
    tab: 'evidence',
    title: '3. AI Named Entity Extraction',
    speakerNote: 'Watch how messy police notes and CDR logs are automatically transformed into structured intelligence triples with extracted persons, phones, and accounts.',
    actionLabel: 'Explore Entity Extraction'
  },
  {
    step: 4,
    tab: 'network',
    title: '4. The Knowledge Graph Canvas',
    speakerNote: 'This is the criminal intelligence graph. Notice that Suspect A (Tariq) and Suspect C (Vikram) appear completely disconnected on opposite sides.',
    actionLabel: 'Open Network Canvas'
  },
  {
    step: 5,
    tab: 'network',
    title: '5. The Hero Moment: Find Hidden Connection',
    speakerNote: 'We select Tariq Shaikh and Vikram Solanki and click FIND HIDDEN CONNECTION. Watch NETRA discover the multi-hop indirect relationship.',
    actionLabel: 'Trigger Hidden Link Discovery',
    isAutoTrigger: true
  },
  {
    step: 6,
    tab: 'resolution',
    title: '6. Entity Disambiguation Engine',
    speakerNote: 'How did we know "Raza Khan", "R. Khan", "RK", and "Raja" were the same person? Our multi-faceted resolution algorithm resolved them with 96.4% confidence.',
    actionLabel: 'Inspect Entity Resolution'
  },
  {
    step: 7,
    tab: 'timeline',
    title: '7. Temporal Co-Location & Sequencing',
    speakerNote: 'Timeline analysis proves Raza Khan called the heist crew 18 min before the robbery, alerted the fencer 90 min later, and wired the logistics yard the next morning.',
    actionLabel: 'Scrub Temporal Timeline'
  },
  {
    step: 8,
    tab: 'leads',
    title: '8. Actionable AI Investigation Leads',
    speakerNote: 'NETRA does not just draw lines. It outputs court-defensible investigation leads with specific warrant recommendations under MCOCA and PMLA.',
    actionLabel: 'View Operational Leads'
  },
  {
    step: 9,
    tab: 'dossier',
    title: '9. Court-Ready Case Dossier',
    speakerNote: 'Finally, investigators can generate and print a formal intelligence brief with a verified chain of custody for the Special Court.',
    actionLabel: 'Generate Official Dossier'
  }
];

export const DemoPitchBar: React.FC<DemoPitchBarProps> = ({
  currentStep,
  setStep,
  setActiveTab,
  triggerHiddenConnection
}) => {
  const stepInfo = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];

  const handleNext = () => {
    if (currentStep < DEMO_STEPS.length) {
      const nextStep = currentStep + 1;
      setStep(nextStep);
      const nextTab = DEMO_STEPS[nextStep - 1].tab;
      setActiveTab(nextTab);
      if (DEMO_STEPS[nextStep - 1].isAutoTrigger && triggerHiddenConnection) {
        setTimeout(() => triggerHiddenConnection(), 400);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setStep(prevStep);
      setActiveTab(DEMO_STEPS[prevStep - 1].tab);
    }
  };

  const handleJumpToStep = (sIndex: number) => {
    setStep(sIndex + 1);
    setActiveTab(DEMO_STEPS[sIndex].tab);
    if (DEMO_STEPS[sIndex].isAutoTrigger && triggerHiddenConnection) {
      setTimeout(() => triggerHiddenConnection(), 400);
    }
  };

  return (
    <div 
      className="no-print" 
      style={{ 
        position: 'fixed', 
        bottom: '16px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 99, 
        width: '90%', 
        maxWidth: '1080px',
        background: 'rgba(10, 14, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #38bdf8',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.2)',
        padding: '12px 20px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Step Progression Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => handleJumpToStep(idx)}
              title={s.title}
              style={{
                width: currentStep === idx + 1 ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentStep === idx + 1 ? '#38bdf8' : currentStep > idx + 1 ? '#10b981' : '#334155',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Narrative & Speaker Prompt */}
        <div style={{ flex: 1, minWidth: 0, padding: '0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
              SIH PRESENTATION STEP {currentStep} OF {DEMO_STEPS.length}
            </span>
            <span style={{ fontWeight: 700, fontSize: '13px', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {stepInfo.title}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600, fontStyle: 'normal' }}>Speaker Cue: </span>
            "{stepInfo.speakerNote}"
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="btn-tactical"
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            <ChevronLeft size={15} />
            Prev
          </button>

          <button
            onClick={() => {
              setActiveTab(stepInfo.tab);
              if (stepInfo.isAutoTrigger && triggerHiddenConnection) {
                triggerHiddenConnection();
              }
            }}
            className="btn-tactical btn-primary-tactical"
            style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 600 }}
          >
            <Play size={13} fill="#ffffff" />
            {stepInfo.actionLabel}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === DEMO_STEPS.length}
            className="btn-tactical"
            style={{ padding: '6px 10px', fontSize: '12px', background: currentStep < DEMO_STEPS.length ? '#0284c7' : '#1e293b', color: '#fff' }}
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
