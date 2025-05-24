import { UserId } from "@/kernel/ids";

export type UserEntity = {
  id: UserId;
  login: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  salt: string;
};

export type SessionEntity = {
  id: UserId;
  login: string;
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
