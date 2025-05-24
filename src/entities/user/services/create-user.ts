import { userRepository } from "../repositories/user";
import { left, right } from "@/shared/lib/either";
import { passwordService } from "@/entities/user/services/password";
import cuid from "cuid";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left("Такой логин уже занят" as const);
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.saveUser({
    id: cuid(),
    login,
    passwordHash: hash,
    salt,
    role: "USER",
  });

  return right(user);
};
