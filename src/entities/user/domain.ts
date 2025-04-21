import { UserId } from "@/kernel/ids";

export type UserEntity = {
  id: UserId;
  login: string;
  passwordHash: string;
  salt: string;
};

export type SessionEntity = {
  id: UserId;
  login: string;
  expiredAt: string;
};

export const userToSession = (
  user: UserEntity,
  expiredAt: string,
): SessionEntity => {
  return {
    id: user.id,
    login: user.login,
    expiredAt,
  };
};
