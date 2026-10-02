import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import React, {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useId,
} from "react";

type AuthFieldsProps = {
  loginValue?: string;
  onLoginChange?: ChangeEventHandler<HTMLInputElement>;
  onFieldKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  passwordAutoComplete?: "current-password" | "new-password";
};

export function AuthFields({
  loginValue,
  onLoginChange,
  onFieldKeyDown,
  passwordAutoComplete = "current-password",
}: AuthFieldsProps = {}) {
  const loginId = useId();
  const passwordId = useId();

  return (
    <>
      <div className="space-y-2.5">
        <Label
          htmlFor={loginId}
          className="text-sm uppercase tracking-[0.18em] text-[#f3d89b]"
        >
          Логин
        </Label>
        <Input
          id={loginId}
          name="login"
          type="text"
          value={loginValue}
          onChange={onLoginChange}
          onKeyDown={onFieldKeyDown}
          autoComplete="username"
          placeholder="Введите логин"
          required
          className="h-12 rounded-2xl border-[#8b6a3e]/55 bg-[#120d0a]/85 px-4 text-[#f5ead5] placeholder:text-[#9f8a68] focus-visible:border-[#d7b26d] focus-visible:ring-[#d7b26d]/20"
        />
      </div>

      <div className="space-y-2.5">
        <Label
          htmlFor={passwordId}
          className="text-sm uppercase tracking-[0.18em] text-[#f3d89b]"
        >
          Пароль
        </Label>
        <Input
          id={passwordId}
          name="password"
          type="password"
          onKeyDown={onFieldKeyDown}
          autoComplete={passwordAutoComplete}
          required
          className="h-12 rounded-2xl border-[#8b6a3e]/55 bg-[#120d0a]/85 px-4 text-[#f5ead5] placeholder:text-[#9f8a68] focus-visible:border-[#d7b26d] focus-visible:ring-[#d7b26d]/20"
        />
      </div>
    </>
  );
}
