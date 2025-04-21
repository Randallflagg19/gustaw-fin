import React from "react";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Either, matchEither } from "@/shared/lib/either";

export function ErrorMessage({ error }: { error: Either<string, unknown> }) {
  return matchEither(error, {
    left: (error) => (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ),
    right: () => null,
  });
}
