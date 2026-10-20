"use client";

import { useEffect, useRef } from "react";
import { lockScroll } from "@/lib/lenis";

export type SiteImage = { src: string; title: string; alt: string; blendWithPage?: boolean };

export function CommonGroundImageDialog({ image, onClose }: { image: SiteImage | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!image) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    lockScroll(true);
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      openerRef.current?.focus();
    };
  }, [image]);

  if (!image) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={image.title}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="m-auto max-h-[96svh] max-w-[96vw] overflow-visible border-0 bg-transparent p-0 backdrop:bg-ink/85"
    >
      <div className={`relative p-3 pt-12 shadow-2xl sm:p-5 sm:pt-14 ${image.blendWithPage ? "bg-cream" : "bg-white"}`}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image"
          className="absolute right-3 top-2 grid h-9 w-9 place-items-center text-2xl font-light leading-none text-ink transition-colors hover:text-sage-700 focus-visible:outline-offset-2 sm:right-5 sm:top-3"
        >
          <span aria-hidden="true">×</span>
        </button>
        {/* The submitted WebP is already sized for this full-resolution view. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className={`block max-h-[calc(96svh-5rem)] max-w-[calc(96vw-2.5rem)] object-contain ${image.blendWithPage ? "mix-blend-multiply" : ""}`} />
        <p className="t-label mt-3 text-ink-soft">{image.title}</p>
      </div>
    </dialog>
  );
}
