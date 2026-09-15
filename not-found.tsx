import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <div className="glass mb-6 flex h-14 w-14 items-center justify-center rounded-full">
        <Compass size={22} className="text-accent" />
      </div>
      <h1 className="font-display text-3xl text-ink">This page wandered off</h1>
      <p className="mt-3 text-sm text-ink-muted">
        The story you&apos;re looking for doesn&apos;t exist, or it moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90"
      >
        Back to the front page
      </Link>
    </div>
  );
}
