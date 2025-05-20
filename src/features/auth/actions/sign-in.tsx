"use server";

import { Either, left, mapLeft, right } from "@/shared/lib/either";
import { z } from "zod";
import { sessionService, verifyUserPassword } from "@/entities/user/server";
const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

type SignInSuccess = {
  user: {
    id: string;
    login: string;
    role: "USER" | "ADMIN";
  };
};

export const signInAction = async (
  state: unknown,
  formData: FormData,
): Promise<Either<string, SignInSuccess>> => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return left(`Ошибка валидации: ${result.error.message}`);
  }

  const verifiedUserResult = await verifyUserPassword(result.data);

  if (verifiedUserResult.type === "right") {
    await sessionService.addSession(verifiedUserResult.value);
    return right({
      user: {
        id: verifiedUserResult.value.id,
        login: verifiedUserResult.value.login,
        role: verifiedUserResult.value.role,
      },
    });
  }

  return mapLeft(verifiedUserResult, (error) => {
    return {
      "Неверный логин или пароль": "Неверный логин или пароль",
    }[error];
  });
};
