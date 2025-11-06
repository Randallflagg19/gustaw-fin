import { UserId } from "@/kernel/ids";

export type UserEntity = {
  id: UserId;
  login: string | null; // опционально для OAuth
  passwordHash: string | null; // опционально для OAuth
  role: "USER" | "ADMIN";
  salt: string;
  email?: string | null; // для OAuth
  name?: string | null; // для OAuth
  image?: string | null; // для OAuth
};

export type SessionEntity = {
  id: UserId;
  login: string | null;
  role: "USER" | "ADMIN";
  expiredAt: string;
};

export const userToSession = (
  user: UserEntity,
  expiredAt: string,
): SessionEntity => {
  return {
    id: user.id,
    login: user.login,
    role: user.role,
    expiredAt,
  };
};
