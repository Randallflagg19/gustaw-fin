"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { BOOKING_PRICE } from "@/entities/booking/domain";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BookingSlot {
    datetime: Date;
    available: boolean;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleDateSelect = async (date: Date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`/api/bookings?date=${date.toISOString()}`);
            if (!response.ok) throw new Error('Ошибка загрузки слотов');

            const slots = await response.json();
            setAvailableSlots(slots.map((slot: { datetime: string; available: boolean }) => ({
                ...slot,
                datetime: new Date(slot.datetime)
            })));
        } catch {
            setMessage({ type: 'error', text: 'Ошибка загрузки доступных времен' });
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedSlot) return;

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateTime: selectedSlot.toISOString() }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка записи');
            }

            setMessage({
                type: 'success',
                text: `Успешно записаны на ${selectedSlot.toLocaleDateString('ru-RU')} в ${selectedSlot.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}!`
            });

            // Обновляем доступные слоты
            if (selectedDate) {
                await handleDateSelect(selectedDate);
            }
            setSelectedSlot(null);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка записи';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const generateCalendar = () => {
        const today = new Date();
        const dates = [];

        // Генерируем следующие 14 дней
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Записаться погладить кота
                    </DialogTitle>
                    <p className="text-center text-muted-foreground">
                        Цена: {BOOKING_PRICE}₽ | Длительность: 1 час
                    </p>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Календарь */}
                    <div>
                        <h3 className="font-medium mb-2">Выберите дату:</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {generateCalendar().map((date, index) => (
                                <Button
                                    key={index}
                                    variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleDateSelect(date)}
                                    className="text-xs"
                                >
                                    {date.toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'short',
                                        weekday: 'short'
                                    })}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Слоты времени */}
                    {selectedDate && (
                        <div>
                            <h3 className="font-medium mb-2">
                                Доступное время на {selectedDate.toLocaleDateString('ru-RU')}:
                            </h3>

                            {loading ? (
                                <div className="text-center py-4">Загрузка...</div>
                            ) : availableSlots.length === 0 ? (
                                <div className="text-center py-4 text-muted-foreground">
                                    Нет доступных слотов на эту дату
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    {availableSlots.map((slot, index) => (
                                        <Button
                                            key={index}
                                            variant={selectedSlot?.getTime() === slot.datetime.getTime() ? "default" : "outline"}
                                            size="sm"
                                            disabled={!slot.available}
                                            onClick={() => setSelectedSlot(slot.datetime)}
                                            className="text-xs"
                                        >
                                            {formatTime(slot.datetime)}
                                            {!slot.available && " (занято)"}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Кнопка записи */}
                    {selectedSlot && (
                        <div className="space-y-2">
                            <div className="text-center text-sm text-muted-foreground">
                                Выбрано: {selectedSlot.toLocaleDateString('ru-RU')} в {formatTime(selectedSlot)}
                            </div>
                            <Button
                                onClick={handleBooking}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Записываем..." : `Записаться за ${BOOKING_PRICE}₽`}
                            </Button>
                        </div>
                    )}

                    {/* Сообщения */}
                    {message && (
                        <div className={`text-center text-sm p-2 rounded ${message.type === 'success'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 