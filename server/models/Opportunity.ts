export enum OpportunityStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed'
}

export enum OpportunityType {
  HELP = 'Help',
  HANDOVER = 'Handover',
  COVER = 'Cover'
}

export type Opportunity = {
  id: number,
  title: string,
  description: string,
  status: OpportunityStatus,
  customerName: string,
  opportunityType: OpportunityType,
  createdAt: Date,
  updatedAt: Date,
  startDate?: Date,
  endDate?: Date,
}
