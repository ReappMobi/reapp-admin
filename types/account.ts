export enum AccountType {
  DONOR = 'DONOR',
  INSTITUTION = 'INSTITUTION',
  ADMIN = 'ADMIN',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
  PENDING = 'PENDING',
}

export type Account = {
  id: number;
  name: string;
  email: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  avatarId: string | null;
  accountType: AccountType;
  followingCount: number;
  followersCount: number;
  status: AccountStatus;
  institution: null;
  donor: null;
  media: string | null;
};

export type DonorAccount = Account & {
  accountType: AccountType.DONOR;
  donor: {
    id: number;
    accountId: number;
  };
};

export type InstitutionAccount = Account & {
  accountType: AccountType.INSTITUTION;
  institution: {
    id: number;
    cnpj: string;
    phone: string;
    accountId: number;
    categoryId: number;
    category: {
      id: number;
      name: string;
    };
  };
};
