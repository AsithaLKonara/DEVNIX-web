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
    apiClient.get('/crm/leads') as unknown as Promise<CrmLead[]>,

  createLead: (dto: Partial<CrmLead>): Promise<CrmLead> =>
    apiClient.post('/crm/leads', dto) as unknown as Promise<CrmLead>,

  updateLeadStage: (id: string, stage: string): Promise<CrmLead> =>
    apiClient.patch(`/crm/leads/${id}/stage?stage=${stage}`) as unknown as Promise<CrmLead>,
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
  listEmployees: async (): Promise<Employee[]> => {
    const data = await apiClient.get('/hr/employees') as any;
    return (data || []).map((emp: any) => ({
      id: emp.id,
      name: emp.user ? `${emp.user.firstName} ${emp.user.lastName}` : 'Unknown',
      email: emp.user?.email || '',
      role: emp.jobTitle || 'Staff',
      department: emp.department || 'N/A',
      status: emp.user?.isActive ? 'Active' : 'Inactive',
      avatar: emp.avatar || '',
    }));
  },

  listLeaveRequests: async (): Promise<LeaveRequest[]> => {
    const data = await apiClient.get('/hr/leaves') as any;
    return (data || []).map((req: any) => ({
      id: req.id,
      employee: {
        name: req.employee?.user ? `${req.employee.user.firstName} ${req.employee.user.lastName}` : 'Unknown',
        role: req.employee?.jobTitle || 'Staff',
      },
      type: req.type ? req.type.charAt(0) + req.type.slice(1).toLowerCase() + ' Leave' : 'Annual Leave',
      startDate: req.startDate ? req.startDate.split('T')[0] : '',
      endDate: req.endDate ? req.endDate.split('T')[0] : '',
      status: req.status ? req.status.charAt(0) + req.status.slice(1).toLowerCase() : 'Pending',
      reason: req.reason || '',
    }));
  },

  updateLeaveStatus: async (id: string, status: string): Promise<LeaveRequest> => {
    // Map status 'Approved' -> 'APPROVED', 'Rejected' -> 'REJECTED' to match backend enums
    const backendStatus = status.toUpperCase();
    const data = await apiClient.patch(`/hr/leaves/${id}/approve?status=${backendStatus}`) as any;
    return {
      id: data.id,
      employee: {
        name: data.employee?.user ? `${data.employee.user.firstName} ${data.employee.user.lastName}` : 'Unknown',
        role: data.employee?.jobTitle || 'Staff',
      },
      type: data.type ? data.type.charAt(0) + data.type.slice(1).toLowerCase() + ' Leave' : 'Annual Leave',
      startDate: data.startDate ? data.startDate.split('T')[0] : '',
      endDate: data.endDate ? data.endDate.split('T')[0] : '',
      status: data.status ? data.status.charAt(0) + data.status.slice(1).toLowerCase() : 'Pending',
      reason: data.reason || '',
    };
  },
};
