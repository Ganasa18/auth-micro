export interface AuthAttribute {
  id: number;
  email: string;
  password?: string;
  nik: number;
  fullname?: string;
  token?: string;
  employments?: string;
  userActive?: string;
  firsttime?: boolean;
  area?: string;
  departement?: string;
  subdepartement?: string;
  updateBy?: string;
  tokenExpired?: string;
}

export enum Area {
  Jakarta = "jakarta",
  Bandung = "bandung",
  Cikarang = "cikarang",
}

export enum Departement {
  It = "it",
  Teknik = "teknik",
  Sales = "sales",
}

export enum SubDepartement {
  Videojet = "videojet",
  Packaging = "packaging",
}
export enum EmploymentStatus {
  Permanent = "permanenet",
  Temporary = "temporary",
}
export enum userActive {
  Active = "active",
  Suspended = "suspended",
  Inactive = "inactive",
}
