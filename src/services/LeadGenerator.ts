import leadsData from '../data/investigation_leads.json';
import type { InvestigationLead } from '../types';

export class LeadGenerator {
  private leads: InvestigationLead[];

  constructor() {
    this.leads = leadsData as InvestigationLead[];
  }

  public getAllLeads(): InvestigationLead[] {
    return this.leads;
  }

  public getLeadById(id: string): InvestigationLead | undefined {
    return this.leads.find(l => l.id === id);
  }

  public getHighPriorityLeads(): InvestigationLead[] {
    return this.leads.filter(l => l.priority === 'HIGH PRIORITY');
  }
}

export const leadGenerator = new LeadGenerator();
