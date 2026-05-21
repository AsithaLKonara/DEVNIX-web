import { apiClient } from '@/lib/apiClient';

export interface CrmLead {
  id: string;
  clientName: string;
  email?: string;
  phone?: string;
  company?: string;
  stage: string;
  value?: number;
  notes?: string;
  assignedTo?: { id: string; name: string };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: string;
  date?: string;
  dueDate?: string;
  issuedDate?: string;
  project?: { name: string };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  avatar?: string;
  status?: string;
}

export interface LeaveRequest {
  id: string;
  employee: { name: string; avatar?: string; role: string };
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  reason?: string;
}

export const crmApi = {
  listLeads: (): Promise<CrmLead[]> =>
    apiClient.get('/crm') as unknown as Promise<CrmLead[]>,

  createLead: (dto: Partial<CrmLead>): Promise<CrmLead> =>
    apiClient.post('/crm', dto) as unknown as Promise<CrmLead>,

  updateLeadStage: (id: string, stage: string): Promise<CrmLead> =>
    apiClient.patch(`/crm/${id}/stage?stage=${stage}`) as unknown as Promise<CrmLead>,
};

export const financeApi = {
  listInvoices: (): Promise<Invoice[]> =>
    apiClient.get('/finance/invoices') as unknown as Promise<Invoice[]>,

  createInvoice: (dto: Partial<Invoice>): Promise<Invoice> =>
    apiClient.post('/finance/invoices', dto) as unknown as Promise<Invoice>,

  updateInvoiceStatus: (id: string, status: string): Promise<Invoice> =>
    apiClient.patch(`/finance/invoices/${id}/status`, { status }) as unknown as Promise<Invoice>,

  getFinancialSummary: (): Promise<{ totalRevenue: number; totalExpenses: number; pendingInvoices: number }> =>
    apiClient.get('/finance/summary') as unknown as Promise<{ totalRevenue: number; totalExpenses: number; pendingInvoices: number }>,
};

export const hrApi = {
  listEmployees: (): Promise<Employee[]> =>
    apiClient.get('/hr/employees') as unknown as Promise<Employee[]>,

  listLeaveRequests: (): Promise<LeaveRequest[]> =>
    apiClient.get('/hr/leaves') as unknown as Promise<LeaveRequest[]>,

  updateLeaveStatus: (id: string, status: string): Promise<LeaveRequest> =>
    apiClient.patch(`/hr/leaves/${id}/status`, { status }) as unknown as Promise<LeaveRequest>,
};
