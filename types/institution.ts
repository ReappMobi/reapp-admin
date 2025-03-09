import type { Account } from './account';
import type { Category } from './category';

export type GetPendingApprovalInstitution = {
  id: number;
  name: string;
  createdAt: string;
  status: string;
  cnpj: string;
};

export type GetInstitution = {
  id: number;
  cnpj: string;
  phone: string;
  category: Partial<Category>;
  fields: string[];
  account: Account;
};
