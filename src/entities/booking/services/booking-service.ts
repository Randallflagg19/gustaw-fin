import { bookingRepository } from "../repositories/booking";
import type { CreateBookingData, BookingSlot } from "../domain";
import { WORKING_HOURS } from "../domain";

export const bookingService = {
    async createBooking(data: CreateBookingData) {
        // Проверяем доступность слота
        const isAvailable = await bookingRepository.isSlotAvailable(data.dateTime);
        if (!isAvailable) {
            throw new Error("Это время уже занято");
        }

        // Проверяем рабочие часы
        const hour = data.dateTime.getHours();
        if (hour < WORKING_HOURS.start || hour >= WORKING_HOURS.end) {
            throw new Error(`Записи доступны только с ${WORKING_HOURS.start}:00 до ${WORKING_HOURS.end}:00`);
        }

        // Проверяем что дата не в прошлом
        if (data.dateTime < new Date()) {
            throw new Error("Нельзя записаться на прошедшее время");
        }

        return await bookingRepository.createBooking(data);
    },

    async getAvailableSlots(date: Date): Promise<BookingSlot[]> {
        const existingBookings = await bookingRepository.getBookingsByDate(date);
        const bookedTimes = new Set(
            existingBookings.map(booking => booking.dateTime.getTime())
        );

        const slots: BookingSlot[] = [];

        // Генерируем слоты с 10:00 до 18:00 (каждый час)
        for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
            const slotTime = new Date(date);
            slotTime.setHours(hour, 0, 0, 0);

            // Пропускаем прошедшие слоты
            if (slotTime < new Date()) {
                continue;
            }

            slots.push({
                datetime: slotTime,
                available: !bookedTimes.has(slotTime.getTime()),
            });
        }

        return slots;
    },

    async getUserBookings(userId: string) {
        return await bookingRepository.getUserBookings(userId);
    },
}; 