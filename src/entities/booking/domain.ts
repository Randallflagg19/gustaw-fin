export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'MOCK_PAID' | 'FAILED';

export interface Booking {
    id: string;
    userId: string;
    dateTime: Date;
    status: BookingStatus;
    createdAt: Date;
    payment?: Payment;
}

export interface Payment {
    id: string;
    bookingId: string;
    amount: number;
    status: PaymentStatus;
    createdAt: Date;
}

export interface CreateBookingData {
    userId: string;
    dateTime: Date;
}

export interface BookingSlot {
    datetime: Date;
    available: boolean;
}

// Рабочие часы: 10:00 - 18:00
export const WORKING_HOURS = {
    start: 10,
    end: 18,
} as const;

// Цена за сеанс
export const BOOKING_PRICE = 1000; 