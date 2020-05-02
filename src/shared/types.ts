import { Location } from "history";

export enum Role {
  Admin = "admin",
  User = "user"
}

export const Roles = [
  Role.Admin,
  Role.User
];

export type AppLocation = Location<{
  readonly nextPathname: string
}>;
