import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sessionService } from "@/entities/user/server";
import { BookingForm } from "@/features/booking/components/booking-form";

export default async function BookingPage() {
  const nextAuthSession = await getServerSession(authOptions);

  if (!nextAuthSession?.user?.id) {
    const sessionCookie = (await cookies()).get("session")?.value;
    const legacySession = await sessionService.decrypt(sessionCookie);

    if (legacySession.type === "left") {
      redirect("/sign-in");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl px-4 py-10">
      <div className="w-full">
        <BookingForm />
      </div>
    </main>
  );
}
