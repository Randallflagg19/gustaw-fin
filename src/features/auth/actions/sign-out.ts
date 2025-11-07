"use server";

import { sessionService } from "@/entities/user/server";

export async function signOutAction() {
  await sessionService.deleteSession();
}

