import { userRepository } from "../repositories/user";
import { left, right } from "@/shared/lib/either";
import { passwordService } from "@/entities/user/services/password";

export const verifyUserPassword = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const user = await userRepository.getUser({ login });

  if (!user) {
    return left("Неверный логин или пароль" as const);
  }

  const isCompared = await passwordService.comparePassword({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isCompared) {
    return left("Неверный логин или пароль" as const);
  }

  return right(user);
};
