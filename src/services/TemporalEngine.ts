import firReportsData from '../data/fir_reports.json';
import callRecordsData from '../data/call_records.json';
import transactionsData from '../data/transactions.json';
import locationsData from '../data/locations.json';
import intelReportsData from '../data/intelligence_reports.json';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  formattedTime: string;
  category: 'FIR' | 'COMMUNICATION' | 'FINANCIAL' | 'LOCATION' | 'INTELLIGENCE';
  title: string;
  subtitle: string;
  description: string;
  involvedEntities: string[];
  involvedNodeIds?: string[];
  severity: 'critical' | 'high' | 'medium' | 'info';
  phase: 'before' | 'during' | 'after';
  rawRecordRef: string;
  metadata?: Record<string, any>;
}

export class TemporalEngine {
  private events: TimelineEvent[] = [];

  constructor() {
    this.compileUnifiedEvents();
  }

  private compileUnifiedEvents() {
    const list: TimelineEvent[] = [];

    // 1. Intelligence Reports
    intelReportsData.forEach(ir => {
      const isPre = new Date(ir.date) < new Date('2024-10-12T00:00:00Z');
      list.push({
        id: ir.reportId,
        timestamp: ir.date,
        formattedTime: new Date(ir.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: 'INTELLIGENCE',
        title: ir.title,
        subtitle: `${ir.agency} // ${ir.classification}`,
        description: ir.text.slice(0, 140) + '...',
        involvedEntities: ir.extractedTriples.map(t => t.subject),
        involvedNodeIds: ['entity-intermediary-linchpin'],
        severity: 'high',
        phase: isPre ? 'before' : 'after',
        rawRecordRef: ir.reportId
      });
    });

    // 2. Call Records
    callRecordsData.forEach(cdr => {
      const d = new Date(cdr.timestamp);
      let phase: 'before' | 'during' | 'after' = 'during';
      if (d < new Date('2024-10-12T00:00:00Z')) phase = 'before';
      else if (d > new Date('2024-10-12T23:59:59Z')) phase = 'after';

      const isCriticalCall = cdr.callId === 'CDR-102' || cdr.callId === 'CDR-108' || cdr.callId === 'CDR-104';

      list.push({
        id: cdr.callId,
        timestamp: cdr.timestamp,
        formattedTime: new Date(cdr.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: 'COMMUNICATION',
        title: `Call Intercept: ${cdr.callerName || cdr.callerNumber} ➔ ${cdr.receiverName || cdr.receiverNumber}`,
        subtitle: `${cdr.callType} (${cdr.durationSeconds}s) via Tower ${cdr.towerLocation}`,
        description: cdr.interceptSummary || 'Voice call logged by cell tower',
        involvedEntities: [cdr.callerName || cdr.callerNumber, cdr.receiverName || cdr.receiverNumber],
        involvedNodeIds: [
          cdr.callerNumber.includes('11029') ? 'entity-suspect-a' :
          cdr.callerNumber.includes('44892') ? 'entity-intermediary-linchpin' :
          cdr.callerNumber.includes('77201') ? 'entity-suspect-b' : 'entity-unknown-contact',
          cdr.receiverNumber.includes('33419') ? 'entity-suspect-c' :
          cdr.receiverNumber.includes('44892') ? 'entity-intermediary-linchpin' : 'entity-suspect-b'
        ],
        severity: isCriticalCall ? 'critical' : 'medium',
        phase,
        rawRecordRef: cdr.callId,
        metadata: {
          imei: cdr.imei,
          towerId: cdr.towerId
        }
      });
    });

    // 3. Transactions
    transactionsData.forEach(tx => {
      list.push({
        id: tx.txId,
        timestamp: tx.timestamp,
        formattedTime: new Date(tx.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: 'FINANCIAL',
        title: `Fund Flow: ₹${(tx.amountINR / 100000).toFixed(1)} Lakhs (${tx.mode})`,
        subtitle: `${tx.fromEntity} ➔ ${tx.toEntity}`,
        description: `Note: ${tx.referenceNote}`,
        involvedEntities: [tx.fromEntity, tx.toEntity],
        involvedNodeIds: [
          tx.fromEntity.includes('Dave') ? 'entity-suspect-b' :
          tx.fromEntity.includes('Apex') ? 'entity-intermediary-linchpin' : 'entity-altaf-memon',
          tx.toEntity.includes('Solanki') ? 'entity-suspect-c' :
          tx.toEntity.includes('Raza') ? 'entity-intermediary-linchpin' : 'entity-suspect-a'
        ],
        severity: tx.flaggedSuspicious ? 'critical' : 'info',
        phase: 'after',
        rawRecordRef: tx.txId,
        metadata: {
          amountINR: tx.amountINR,
          mode: tx.mode
        }
      });
    });

    // 4. Locations & ANPR
    locationsData.forEach(loc => {
      const d = new Date(loc.timestamp);
      let phase: 'before' | 'during' | 'after' = 'during';
      if (d < new Date('2024-10-12T00:00:00Z')) phase = 'before';
      else if (d > new Date('2024-10-12T23:59:59Z')) phase = 'after';

      list.push({
        id: loc.eventId,
        timestamp: loc.timestamp,
        formattedTime: new Date(loc.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: 'LOCATION',
        title: `Geo/ANPR Hit: ${loc.entityName}`,
        subtitle: `${loc.locationName} (${loc.source})`,
        description: `Coordinates [${loc.coordinates[0]}, ${loc.coordinates[1]}], Confidence ${(loc.confidence * 100).toFixed(0)}%`,
        involvedEntities: [loc.entityName],
        involvedNodeIds: [loc.entityId],
        severity: loc.locationName.includes('Bhiwandi') || loc.locationName.includes('Bandra') ? 'high' : 'info',
        phase,
        rawRecordRef: loc.eventId
      });
    });

    // 5. FIR Reports
    firReportsData.forEach(fir => {
      const isHeist = fir.firNumber.includes('412');
      list.push({
        id: fir.firNumber,
        timestamp: fir.incidentDate,
        formattedTime: new Date(fir.incidentDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: 'FIR',
        title: `INCIDENT REGISTRATION: ${fir.firNumber}`,
        subtitle: `${fir.policeStation} // ${fir.incidentLocation}`,
        description: fir.briefFacts.slice(0, 150) + '...',
        involvedEntities: fir.primaryAccused,
        involvedNodeIds: [
          isHeist ? 'entity-suspect-a' : fir.firNumber.includes('89') ? 'entity-suspect-b' : 'entity-suspect-c'
        ],
        severity: 'critical',
        phase: isHeist ? 'during' : 'after',
        rawRecordRef: fir.firNumber
      });
    });

    // Sort chronologically ascending
    this.events = list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  public getAllEvents(): TimelineEvent[] {
    return this.events;
  }

  public getEventsByPhase(phase: 'all' | 'before' | 'during' | 'after'): TimelineEvent[] {
    if (phase === 'all') return this.events;
    return this.events.filter(e => e.phase === phase);
  }

  public getEventsByCategory(category: string): TimelineEvent[] {
    if (!category || category === 'ALL') return this.events;
    return this.events.filter(e => e.category === category);
  }
}

export const temporalEngine = new TemporalEngine();
