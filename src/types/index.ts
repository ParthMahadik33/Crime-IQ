export type EntityType = 
  | 'person' 
  | 'phone' 
  | 'account' 
  | 'location' 
  | 'vehicle' 
  | 'incident' 
  | 'organization';

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'neutral';

export interface SuspectEntity {
  id: string;
  name: string;
  aliases: string[];
  type: EntityType;
  role: string;
  threatLevel: ThreatLevel;
  primaryPhone?: string;
  associatedAccounts?: string[];
  associatedVehicles?: string[];
  associatedLocations?: string[];
  photo?: string;
  summary: string;
  ipcSections?: string[];
  status: 'Absconding' | 'Under Surveillance' | 'Detained' | 'Identified Intermediary' | 'Unidentified Node';
  metadata: Record<string, any>;
}

export interface FIRReport {
  firNumber: string;
  policeStation: string;
  dateFiled: string;
  incidentDate: string;
  sections: string[];
  complainant: string;
  primaryAccused: string[];
  incidentLocation: string;
  seizedItems: string[];
  briefFacts: string;
  extractedEntities: {
    persons: string[];
    phones: string[];
    locations: string[];
    vehicles: string[];
    accounts: string[];
    financialTokens: string[];
  };
}

export interface CallRecord {
  callId: string;
  callerNumber: string;
  callerName?: string;
  receiverNumber: string;
  receiverName?: string;
  timestamp: string;
  durationSeconds: number;
  towerId: string;
  towerLocation: string;
  imei: string;
  callType: 'Voice' | 'Encrypted VoIP' | 'SMS';
  interceptSummary?: string;
}

export interface FinancialTransaction {
  txId: string;
  fromAccount: string;
  fromEntity: string;
  toAccount: string;
  toEntity: string;
  amountINR: number;
  timestamp: string;
  mode: 'IMPS' | 'RTGS' | 'Hawala Token' | 'Crypto P2P' | 'Cash Courier';
  referenceNote: string;
  flaggedSuspicious: boolean;
}

export interface LocationEvent {
  eventId: string;
  entityId: string;
  entityName: string;
  locationName: string;
  coordinates: [number, number]; // [lat, lng]
  timestamp: string;
  source: 'Cell Tower Triangulation' | 'ANPR Camera' | 'CCTV Facial Match' | 'ATM Terminal' | 'Informer Sighting';
  confidence: number;
}

export interface VehicleRecord {
  plateNumber: string;
  makeModel: string;
  color: string;
  registeredOwner: string;
  knownUsers: string[];
  anprSightings: {
    tollPlaza: string;
    timestamp: string;
    direction: string;
  }[];
}

export interface IntelligenceReport {
  reportId: string;
  agency: string;
  classification: 'TOP SECRET // CRIME BRANCH' | 'CONFIDENTIAL // DRI' | 'SECRET // SPECIAL CELL';
  sourceType: 'HUMINT' | 'SIGINT' | 'FININT' | 'OSINT';
  date: string;
  title: string;
  text: string;
  keyInsights: string[];
  extractedTriples: {
    subject: string;
    predicate: string;
    object: string;
    confidence: number;
  }[];
}

export interface NetworkRelationship {
  id: string;
  source: string;
  target: string;
  label: string;
  relationType: 
    | 'called' 
    | 'transferred_money' 
    | 'present_at' 
    | 'owns' 
    | 'associated_with' 
    | 'mentioned_in' 
    | 'alias_of' 
    | 'operates_depot'
    | 'ordered_heist';
  weight: number; // 1 - 100
  evidenceSource: string;
  evidenceId: string;
  timestamp?: string;
  details: string;
  isIndirectHiddenLink?: boolean;
}

export interface InvestigationLead {
  id: string;
  priority: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'ROUTINE';
  title: string;
  confidenceScore: number;
  summary: string;
  keyEntities: string[];
  evidenceTrail: {
    category: string;
    citation: string;
    detail: string;
  }[];
  recommendedActions: string[];
  actionType: 'WARRANT_ISSUANCE' | 'SURVEILLANCE_DEPLOYMENT' | 'ASSET_FREEZE' | 'INTERROGATION_LINE';
}

export interface EntityResolutionMatch {
  clusterId: string;
  resolvedCanonicalName: string;
  confidence: number;
  surfaceForms: string[];
  evidence: {
    criteria: string;
    score: number;
    description: string;
  }[];
  linkedRecords: string[];
  confirmed: boolean;
}

export interface HiddenPathResult {
  sourceId: string;
  targetId: string;
  pathNodes: string[];
  pathEdges: string[];
  confidenceScore: number;
  summary: string;
  evidenceSteps: {
    stepNumber: number;
    fromNode: string;
    toNode: string;
    relationship: string;
    evidenceSource: string;
    evidenceText: string;
    verified: boolean;
  }[];
  keyIntermediary: {
    id: string;
    name: string;
    role: string;
    significance: string;
  };
}
