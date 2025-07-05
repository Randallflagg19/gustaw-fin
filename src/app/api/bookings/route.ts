import { NextRequest, NextResponse } from "next/server";
import { bookingService } from "@/entities/booking/services/booking-service";
import { sessionService } from "@/entities/user/server";

export async function POST(request: NextRequest) {
    try {
        // Проверяем аутентификацию
        const sessionResult = await sessionService.verifySession();
        if (!sessionResult?.session) {
            return NextResponse.json({ error: "Необходимо войти в систему" }, { status: 401 });
        }

        const body = await request.json();
        const { dateTime } = body;

        if (!dateTime) {
            return NextResponse.json({ error: "Необходимо указать дату и время" }, { status: 400 });
        }

        const booking = await bookingService.createBooking({
            userId: sessionResult.session.id,
            dateTime: new Date(dateTime),
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        const message = error instanceof Error ? error.message : "Ошибка создания записи";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Необходимо указать дату" }, { status: 400 });
        }

        const slots = await bookingService.getAvailableSlots(new Date(date));
        return NextResponse.json(slots);
    } catch (error) {
        console.error("Error getting available slots:", error);
        return NextResponse.json({ error: "Ошибка получения доступных слотов" }, { status: 500 });
    }
} 