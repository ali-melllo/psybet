"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { noticeDismissed } from "@/lib/features/marketplace/marketplace-slice";

export function DemoNotice() {
  const notice = useAppSelector((s) => s.marketplace.notice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => dispatch(noticeDismissed()), 5000);
    return () => window.clearTimeout(id);
  }, [notice, dispatch]);

  if (!notice) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-start gap-3 rounded-lg border border-border bg-surface p-4 text-sm shadow-lg"
    >
      <p className="flex-1">{notice}</p>
      <button
        type="button"
        aria-label="Dismiss notice"
        onClick={() => dispatch(noticeDismissed())}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
