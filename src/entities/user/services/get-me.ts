import { sessionService } from "./session";
import { cookies } from "next/headers";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";

export const getMe = async () => {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session");

  const decodedPayload = await sessionService.decrypt(sessionToken?.value);
  if (decodedPayload.type === "right") {
    const user = await prisma.user.findFirst({
      where: {
        id: decodedPayload.value.id,
      },
      select: {
        id: true,
        login: true,
        role: true,
      },
    });

    if (!user) {
      redirect("/sign-in");
    }
    console.log(user);
    return user;
  }
};
