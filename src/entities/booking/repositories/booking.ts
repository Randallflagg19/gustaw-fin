import { prisma } from "@/shared/lib/db";
import type { CreateBookingData, Booking } from "../domain";

export const bookingRepository = {
    async createBooking(data: CreateBookingData): Promise<Booking> {
        const booking = await prisma.booking.create({
            data: {
                userId: data.userId,
                dateTime: data.dateTime,
                status: 'PENDING',
            },
            include: {
                payment: true,
            },
        });

        // Создаем платеж
        await prisma.payment.create({
            data: {
                bookingId: booking.id,
                amount: 1000,
                status: 'MOCK_PAID', // Мокаем оплату
            },
        });

        const bookingWithPayment = await prisma.booking.findUnique({
            where: { id: booking.id },
            include: { payment: true },
        });

        return bookingWithPayment as Booking;
    },

    async getBookingsByDate(date: Date): Promise<Booking[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await prisma.booking.findMany({
            where: {
                dateTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: {
                    in: ['PENDING', 'CONFIRMED'],
                },
            },
            include: {
                payment: true,
            },
        });

        return bookings as Booking[];
    },

    async getUserBookings(userId: string): Promise<Booking[]> {
        const bookings = await prisma.booking.findMany({
            where: {
                userId,
            },
            include: {
                payment: true,
            },
            orderBy: {
                dateTime: 'desc',
            },
        });

        return bookings as Booking[];
    },

    async isSlotAvailable(dateTime: Date): Promise<boolean> {
        const existing = await prisma.booking.findFirst({
            where: {
                dateTime,
                status: {
                    in: ['PENDING', 'CONFIRMED'],
                },
            },
        });

        return !existing;
    },
}; 