'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KeystaticError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const isNotFound =
    error.message === 'Not found' || error.name === 'NotFoundError';

  useEffect(() => {
    if (isNotFound) {
      router.replace('/keystatic/dashboard');
    }
  }, [isNotFound, router]);

  if (isNotFound) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <p className="text-foreground/70">Перенаправление...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-lg font-semibold">Что-то пошло не так</h2>
      <p className="text-center text-sm text-foreground/70">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90"
      >
        Попробовать снова
      </button>
    </div>
  );
}
