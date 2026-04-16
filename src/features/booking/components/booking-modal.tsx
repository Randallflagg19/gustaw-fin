"use client";

import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { BookingForm } from "./booking-form";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-[#b88d4f]/40 bg-[#120f0d]/95">
        <BookingForm />
      </DialogContent>
    </Dialog>
  );
}
