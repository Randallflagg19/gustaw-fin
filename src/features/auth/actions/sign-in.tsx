"use server";

import { left, mapLeft } from "@/shared/lib/either";
import { z } from "zod";
import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { redirect } from "next/navigation";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return left(`Ошибка валидации: ${result.error.message}`);
  }

  const verifiedUserResult = await verifyUserPassword(result.data);

  if (verifiedUserResult.type === "right") {
    await sessionService.addSession(verifiedUserResult.value);

    redirect("/");
  }

  return mapLeft(verifiedUserResult, (error) => {
    return {
      "Неверный логин или пароль": "Неверный логин или пароль",
    }[error];
  });
};
