import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import React, {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useId,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <div className="space-y-2 sm:space-y-2.5">
        <Label
          htmlFor={loginId}
          className="text-xs uppercase tracking-[0.16em] text-[#f3d89b] sm:text-sm sm:tracking-[0.18em]"
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
          minLength={3}
          required
          variant="cosmic"
          className="h-11 sm:h-12"
        />
      </div>

      <div className="space-y-2 sm:space-y-2.5">
        <Label
          htmlFor={passwordId}
          className="text-xs uppercase tracking-[0.16em] text-[#f3d89b] sm:text-sm sm:tracking-[0.18em]"
        >
          Пароль
        </Label>
        <div className="relative">
          <Input
            id={passwordId}
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            onKeyDown={onFieldKeyDown}
            autoComplete={passwordAutoComplete}
            placeholder="••••••••"
            minLength={3}
            required
            variant="cosmic"
            className="h-11 pr-12 text-lg tracking-[0.18em] sm:h-12"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={
              isPasswordVisible ? "Скрыть пароль" : "Показать пароль"
            }
            aria-pressed={isPasswordVisible}
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#bca47a] transition-colors hover:bg-[#d7b26d]/10 hover:text-[#f3d89b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b26d]/50"
          >
            {isPasswordVisible ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
