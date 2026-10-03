"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { BOOKING_PRICE } from "@/entities/booking/domain";
import { cn } from "@/shared/lib/css";
import { editorialHeadingFont } from "@/shared/ui/typography";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";

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

  const handleReturnToDates = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setAvailableSlots([]);
    setMessage(null);
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
      "h-11 rounded-full border px-3 text-xs font-semibold tracking-[0.08em] transition-[color,background-color,border-color,box-shadow] duration-200 sm:h-14",
      "shadow-none",
      isActive
        ? "border-[var(--cosmos-gold-bright)] bg-[var(--cosmos-gold-bright)] text-[var(--cosmos-ink)] shadow-[var(--shadow-gold)] hover:bg-[var(--cosmos-gold-bright)]"
        : "border-[#9b7540]/75 bg-black/20 text-[var(--cosmos-ivory)] hover:border-[var(--cosmos-gold)] hover:bg-[#24170d]/65",
    );

  return (
    <section className="relative grid w-full overflow-hidden rounded-[2rem] border border-[#c79a50]/70 bg-[#100b08]/90 text-white shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-md lg:grid-cols-[0.92fr_1.08fr]">
      <div className="relative flex min-h-[26rem] flex-col overflow-hidden border-b border-[#8b6a3e]/40 px-5 pb-7 pt-20 sm:min-h-[38rem] sm:px-10 sm:pb-12 sm:pt-28 lg:min-h-[44rem] lg:border-b-0 lg:border-r lg:px-14 lg:pb-14 lg:pt-[19rem] xl:pt-[20rem]">
        <div
          aria-hidden="true"
          className="cosmos-background absolute inset-0 scale-105 bg-cover bg-no-repeat opacity-90"
          style={{ backgroundPosition: "18% 68%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,4,0.22),rgba(8,6,4,0.68)),linear-gradient(180deg,rgba(8,6,4,0.08),rgba(8,6,4,0.58))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_82%,rgba(225,187,114,0.26),transparent_38%)]"
        />

        <Link
          href="/"
          className="group absolute left-5 top-4 z-20 inline-flex h-11 items-center gap-2.5 rounded-full border border-[#c79a50]/55 bg-black/25 py-1 pl-1 pr-4 text-[#f4e9d2] shadow-[0_8px_28px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#e1bb72] hover:bg-[#2a1b0d]/55 hover:shadow-[0_0_24px_rgba(225,187,114,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1bb72]/50 sm:left-10 sm:top-8 sm:h-12 sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-5 lg:left-14 lg:top-10"
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-[#c79a50]/45 bg-[#160f0a]/80 text-[#e1bb72] transition-transform duration-200 group-hover:-translate-x-0.5 sm:size-9">
            <ArrowLeft aria-hidden="true" className="size-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.26em] text-[#bca57d]">
              Вернуться
            </span>
            <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:text-xs">
              На главную
            </span>
          </span>
        </Link>

        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[var(--cosmos-gold)] sm:mb-4 sm:text-xs sm:tracking-[0.38em]">
            Private Audience
          </p>
          <h1
            className="text-4xl leading-[1.04] text-[var(--cosmos-ivory)] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
            style={{
              ...editorialHeadingFont,
              textShadow: "0 3px 24px rgba(0,0,0,0.55)",
            }}
          >
            <span className="block">Аудиенция</span>
            <span className="mt-[0.08em] block">с Густавом</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--cosmos-text-muted)] sm:mt-6 sm:text-lg sm:leading-7">
            Выберите день и свободный час, чтобы официально погладить Густава.
          </p>
          <div className="mt-4 h-px max-w-md bg-gradient-to-r from-[#c79a50]/80 to-transparent sm:mt-6" />
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--cosmos-gold)] sm:mt-5 sm:block sm:text-sm sm:tracking-[0.2em]">
            <span className="whitespace-nowrap">Цена: {BOOKING_PRICE}₽</span>
            <span className="hidden px-2 text-[#896b42] sm:inline">·</span>
            <span className="whitespace-nowrap">Длительность: 1 час</span>
          </p>
          <a
            href="tel:+79960375088"
            className="mt-4 inline-block text-sm text-[#e1bb72] underline decoration-[#e1bb72]/40 underline-offset-4 transition-colors hover:text-[#f0cc8c] sm:mt-5 sm:text-base"
          >
            +7 996 037-50-88
          </a>
        </div>
      </div>

      <div className="relative min-h-[38rem] px-5 py-7 sm:min-h-[44rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14">
        <div className="min-h-[33rem] sm:min-h-[37rem]">
          {!selectedDate ? (
            <div>
              <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <span
                  className="text-3xl leading-none text-[#b18b52] sm:text-4xl"
                  style={editorialHeadingFont}
                >
                  01
                </span>
                <h2 className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--cosmos-ivory)] sm:text-sm sm:tracking-[0.28em]">
                  Выберите дату
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-[#c79a50]/75 to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {generateCalendar().map((date, index) => {
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDateSelect(date)}
                      className={choiceButtonClass(false)}
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
              <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--cosmos-text-muted)] sm:mt-8">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[var(--cosmos-gold)]"
                />
                <p>После выбора даты появится свободное время.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
                  <span
                    className="text-3xl leading-none text-[#b18b52] sm:text-4xl"
                    style={editorialHeadingFont}
                  >
                    02
                  </span>
                  <h2 className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--cosmos-ivory)] sm:text-sm sm:tracking-[0.22em]">
                    Выберите время
                  </h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#c79a50]/75 to-transparent" />
                </div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--cosmos-text-muted)]">
                    {selectedDate.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      weekday: "long",
                    })}
                  </p>
                  <Button
                    type="button"
                    variant="cosmicNavigation"
                    size="sm"
                    onClick={handleReturnToDates}
                    className="rounded-full px-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  >
                    <ArrowLeft aria-hidden="true" className="size-3.5" />К датам
                  </Button>
                </div>

                {loading ? (
                  <div className="flex min-h-[13rem] items-center justify-center text-zinc-300">
                    Загрузка...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="flex min-h-[13rem] items-center justify-center rounded-2xl border border-[#8b6a3e]/35 bg-[#120d0a]/65 px-4 text-center text-zinc-400">
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

              {selectedSlot && (
                <div className="space-y-4">
                  <div className="text-center text-sm text-zinc-300">
                    Выбрано: {selectedSlot.toLocaleDateString("ru-RU")} в{" "}
                    {formatTime(selectedSlot)}
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={loading}
                    variant="cosmicPrimary"
                    size="hero"
                    className="w-full text-base font-semibold"
                  >
                    {loading
                      ? "Записываем..."
                      : `Записаться за ${BOOKING_PRICE}₽`}
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
          )}
        </div>
      </div>
    </section>
  );
}
