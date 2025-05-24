import { sessionService } from "@/entities/user/server";
import { HeaderClient } from "./header-client";

export default async function Header() {
  const result = await sessionService.verifySession().catch(() => null);

  return <HeaderClient userFromServer={result?.session ?? null} />;
}
