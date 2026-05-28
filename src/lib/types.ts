export type Role = "admin_master" | "manager" | "reception" | "professional" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  clinicId?: string;
  avatar?: string;
}

export interface AuthPayload {
  sub: string;
  email: string;
  role: Role;
  name: string;
  clinicId?: string;
}
