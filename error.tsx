"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send this to your error reporting service.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <h1 className="font-display text-2xl text-ink">Something went wrong</h1>
      <p className="mt-3 text-sm text-ink-muted">
        This page hit an unexpected error. You can try again, or head back to the front page.
      </p>
      <button
        onClick={reset}
        className="mt-6 flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90"
      >
        <RefreshCcw size={15} />
        Try again
      </button>
    </div>
  );
}
