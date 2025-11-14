import { UserRoles } from "@/types/UserRoles";

export interface IUser {
  _id: string;
  email: string;
  role: UserRoles;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
