"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { BOOKING_PRICE } from "@/entities/booking/domain";

interface BookingSlot {
  datetime: Date;
  available: boolean;
}

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/bookings?date=${date.toISOString()}`);
      if (!response.ok) throw new Error("Ошибка загрузки слотов");

      const slots = await response.json();
      setAvailableSlots(
        slots.map((slot: { datetime: string; available: boolean }) => ({
          ...slot,
          datetime: new Date(slot.datetime),
        })),
      );
    } catch {
      setMessage({ type: "error", text: "Ошибка загрузки доступных времен" });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateTime: selectedSlot.toISOString() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка записи");
      }

      setMessage({
        type: "success",
        text: `Успешно записаны на ${selectedSlot.toLocaleDateString("ru-RU")} в ${selectedSlot.toLocaleTimeString(
          "ru-RU",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )}!`,
      });

      if (selectedDate) {
        await handleDateSelect(selectedDate);
      }

      setSelectedSlot(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ошибка записи";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const generateCalendar = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Записаться на аудиенцию к коту
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Цена: {BOOKING_PRICE}₽ | Длительность: 1 час
        </p>
      </div>

      <div className="rounded-3xl border border-[#b88d4f]/40 bg-black/35 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-6">
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#f3d89b]">
              Выберите дату
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {generateCalendar().map((date, index) => (
                <Button
                  key={index}
                  variant={
                    selectedDate?.toDateString() === date.toDateString()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleDateSelect(date)}
                  className="text-xs"
                >
                  {date.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    weekday: "short",
                  })}
                </Button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#f3d89b]">
                Доступное время на {selectedDate.toLocaleDateString("ru-RU")}
              </h3>

              {loading ? (
                <div className="py-4 text-center text-zinc-300">
                  Загрузка...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="py-4 text-center text-zinc-400">
                  Нет доступных слотов на эту дату
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedSlot?.getTime() === slot.datetime.getTime()
                          ? "default"
                          : "outline"
                      }
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

          {selectedSlot && (
            <div className="space-y-3">
              <div className="text-center text-sm text-zinc-300">
                Выбрано: {selectedSlot.toLocaleDateString("ru-RU")} в{" "}
                {formatTime(selectedSlot)}
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

          {message && (
            <div
              className={`rounded-xl p-3 text-center text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
