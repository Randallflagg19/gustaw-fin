"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { BOOKING_PRICE } from "@/entities/booking/domain";
import { cn } from "@/shared/lib/css";

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

  const choiceButtonClass = (isActive: boolean) =>
    cn(
      "h-12 rounded-full border text-xs tracking-[0.08em] transition-all duration-200",
      "shadow-none",
      isActive
        ? "border-[#e1bb72] bg-[#e1bb72] text-[#1a140f] hover:bg-[#ebc983]"
        : "border-[#8b6a3e]/55 bg-[#120d0a]/85 text-[#f3dfb6] hover:border-[#c89d5c] hover:bg-[#1a130f]",
    );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.38em] text-[#d7b26d]">
          Private Audience
        </p>

        <h1
          className="text-4xl leading-[1.08] text-white sm:text-5xl"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            textShadow: "0 2px 18px rgba(0,0,0,0.38)",
          }}
        >
          Записаться на аудиенцию к коту
        </h1>

        <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
          Выберите день и свободный час, чтобы официально попасть на приём к
          Густаву.
        </p>

        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#d7b26d]">
          Цена: {BOOKING_PRICE}₽ · Длительность: 1 час
        </p>

        <p className="mt-4 text-sm text-zinc-300">
          <a
            href="tel:+79960375088"
            className="text-[#e1bb72] underline decoration-[#e1bb72]/40 underline-offset-4 hover:text-[#f0cc8c]"
          >
            +7 996 037-50-88
          </a>
        </p>
      </div>

      <div className="rounded-[2rem] border border-[#b88d4f]/40 bg-black/35 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#f3d89b]">
              Выберите дату
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {generateCalendar().map((date, index) => {
                const isActive =
                  selectedDate?.toDateString() === date.toDateString();

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDateSelect(date)}
                    className={choiceButtonClass(isActive)}
                  >
                    {date.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      weekday: "short",
                    })}
                  </Button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#f3d89b]">
                Доступное время на {selectedDate.toLocaleDateString("ru-RU")}
              </h3>

              {loading ? (
                <div className="py-4 text-center text-zinc-300">
                  Загрузка...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="rounded-2xl border border-[#8b6a3e]/35 bg-[#120d0a]/65 py-4 text-center text-zinc-400">
                  Нет доступных слотов на эту дату
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availableSlots.map((slot, index) => {
                    const isActive =
                      selectedSlot?.getTime() === slot.datetime.getTime();

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.datetime)}
                        className={cn(
                          choiceButtonClass(isActive),
                          !slot.available &&
                            "cursor-not-allowed border-[#5a4830]/30 bg-[#0f0b09]/45 text-[#7e6d56] opacity-60 hover:bg-[#0f0b09]/45",
                        )}
                      >
                        {formatTime(slot.datetime)}
                        {!slot.available && " (занято)"}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {selectedSlot && (
            <div className="space-y-4">
              <div className="text-center text-sm text-zinc-300">
                Выбрано: {selectedSlot.toLocaleDateString("ru-RU")} в{" "}
                {formatTime(selectedSlot)}
              </div>

              <Button
                onClick={handleBooking}
                disabled={loading}
                variant="ghost"
                className="h-14 w-full rounded-full border border-[#e1bb72] bg-[#e1bb72] text-base text-[#1a140f] hover:bg-[#ebc983]"
              >
                {loading ? "Записываем..." : `Записаться за ${BOOKING_PRICE}₽`}
              </Button>
            </div>
          )}

          {message && (
            <div
              className={cn(
                "rounded-2xl border p-4 text-center text-sm",
                message.type === "success"
                  ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-200"
                  : "border-rose-500/30 bg-rose-950/30 text-rose-200",
              )}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
