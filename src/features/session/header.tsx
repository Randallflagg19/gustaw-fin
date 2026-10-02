import { getServerSession } from "next-auth";
import { sessionService } from "@/entities/user/server";
import { authOptions } from "@/shared/config/auth";
import { prisma } from "@/shared/lib/db";
import { HeaderClient } from "./header-client";

export default async function Header() {
  const nextAuthSession = await getServerSession(authOptions);

  if (nextAuthSession?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: nextAuthSession.user.id },
      select: {
        id: true,
        login: true,
        role: true,
      },
    });

    if (user) {
      return <HeaderClient userFromServer={user} />;
    }
  }

  const legacySession = await sessionService.verifySession().catch(() => null);

  return <HeaderClient userFromServer={legacySession?.session ?? null} />;
}
