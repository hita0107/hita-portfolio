"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { images, type ImageId } from "@/content/images";
import { figures } from "@/content/figures";
import { largestWidth, srcFor } from "./Picture";
import { lockScroll } from "@/lib/lenis";

type Open = (group: ImageId[], index: number) => void;

const LightboxContext = createContext<Open | null>(null);

export function useLightbox() {
  const open = useContext(LightboxContext);
  if (!open) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return open;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ group: ImageId[]; index: number } | null>(null);
  const opener = useRef<Element | null>(null);

  const open = useCallback<Open>((group, index) => {
    opener.current = document.activeElement;
    setState({ group, index });
  }, []);

  const close = useCallback(() => {
    setState(null);
    if (opener.current instanceof HTMLElement) opener.current.focus();
  }, []);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state && (
        <Viewer
          key={state.group[state.index]}
          group={state.group}
          index={state.index}
          onIndex={(index) => setState({ group: state.group, index })}
          onClose={close}
        />
      )}
    </LightboxContext.Provider>
  );
}

type View = { scale: number; x: number; y: number };

function Viewer({
  group,
  index,
  onIndex,
  onClose,
}: {
  group: ImageId[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const id = group[index];
  const im = images[id];
  const fig = figures[id];
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [fit, setFit] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; scale: number } | null>(null);

  const highRes = largestWidth(id) >= 1600;
  const maxZoom = Math.max(1.6, fit.w ? (largestWidth(id) / fit.w) * 1.5 : 1.6);

  useEffect(() => {
    const compute = () => {
      const s = Math.min((window.innerWidth * 0.92) / im.w, (window.innerHeight * 0.76) / im.h, highRes ? 1 : 2.4);
      setFit({ w: im.w * s, h: im.h * s });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [im.w, im.h, highRes]);

  useEffect(() => {
    lockScroll(true);
    closeRef.current!.focus();
    return () => lockScroll(false);
  }, []);

  const clamp = useCallback(
    (v: View): View => {
      const scale = Math.min(Math.max(v.scale, 1), maxZoom);
      const mx = (fit.w * scale - fit.w) / 2;
      const my = (fit.h * scale - fit.h) / 2;
      return { scale, x: Math.min(Math.max(v.x, -mx), mx), y: Math.min(Math.max(v.y, -my), my) };
    },
    [fit.w, fit.h, maxZoom],
  );

  const zoomAt = useCallback(
    (factor: number, clientX: number, clientY: number) => {
      const rect = stageRef.current!.getBoundingClientRect();
      const cx = clientX - (rect.left + rect.width / 2);
      const cy = clientY - (rect.top + rect.height / 2);
      setView((v) => {
        const scale = Math.min(Math.max(v.scale * factor, 1), maxZoom);
        const k = scale / v.scale;
        return clamp({ scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      });
    },
    [clamp, maxZoom],
  );

  useEffect(() => {
    const stage = stageRef.current!;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(Math.exp(-e.deltaY * 0.0016), e.clientX, e.clientY);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const step = useCallback(
    (dir: 1 | -1) => onIndex((index + dir + group.length) % group.length),
    [group.length, index, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && group.length > 1) step(1);
      else if (e.key === "ArrowLeft" && group.length > 1) step(-1);
      else if (e.key === "+" || e.key === "=") setView((v) => clamp({ ...v, scale: v.scale * 1.4 }));
      else if (e.key === "-") setView((v) => clamp({ ...v, scale: v.scale / 1.4 }));
      else if (e.key === "0") setView({ scale: 1, x: 0, y: 0 });
      else if (e.key === "Tab") {
        const focusables = dialogRef.current!.querySelectorAll<HTMLElement>("button:not(:disabled)");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clamp, group.length, onClose, step]);

  const onPointerDown = (e: React.PointerEvent) => {
    stageRef.current!.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.scale };
    }
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const target = gesture.current.scale * (dist / gesture.current.dist);
      zoomAt(target / view.scale, (a.x + b.x) / 2, (a.y + b.y) / 2);
    } else if (pointers.current.size === 1 && view.scale > 1) {
      setView((v) => clamp({ ...v, x: v.x + e.clientX - prev.x, y: v.y + e.clientY - prev.y }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if (view.scale > 1) setView({ scale: 1, x: 0, y: 0 });
    else zoomAt(Math.min(2.5, maxZoom), e.clientX, e.clientY);
  };

  const label = fig.caption ?? fig.alt;
  const w = largestWidth(id);
  const btn =
    "grid h-10 min-w-10 place-items-center rounded-full border border-sage-100/20 px-3 text-sage-50 transition-colors hover:bg-sage-100/10 disabled:opacity-30";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/96 text-sage-50"
    >
      <div
        ref={stageRef}
        className={`relative flex flex-1 touch-none select-none items-center justify-center overflow-hidden ${view.scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        <picture>
          <source type="image/avif" srcSet={srcFor(id, w, "avif")} />
          <img
            src={srcFor(id, w, "webp")}
            alt={fig.alt}
            draggable={false}
            width={im.w}
            height={im.h}
            style={{
              width: fit.w,
              height: fit.h,
              maxWidth: "none",
              transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
              transition: dragging ? "none" : "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              backgroundImage: `url(${im.lqip})`,
              backgroundSize: "cover",
            }}
          />
        </picture>
      </div>
      <div className="shell flex flex-wrap items-center gap-x-6 gap-y-3 pb-5 pt-3">
        <p className="t-label min-w-0 flex-1 text-sage-100">
          {group.length > 1 && (
            <span className="mr-4 text-sage-300">
              {String(index + 1).padStart(2, "0")} / {String(group.length).padStart(2, "0")}
            </span>
          )}
          {label}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={() => setView((v) => clamp({ ...v, scale: v.scale / 1.4 }))} disabled={view.scale <= 1} aria-label="Zoom out">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2 7h10" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <button type="button" className={btn} onClick={() => setView((v) => clamp({ ...v, scale: v.scale * 1.4 }))} disabled={view.scale >= maxZoom} aria-label="Zoom in">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2 7h10M7 2v10" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          {group.length > 1 && (
            <>
              <button type="button" className={btn} onClick={() => step(-1)} aria-label="Previous image">
                <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden><path d="M7 1 1 7l6 6M1 7h14" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
              <button type="button" className={btn} onClick={() => step(1)} aria-label="Next image">
                <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden><path d="m9 1 6 6-6 6M15 7H1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
            </>
          )}
          <button ref={closeRef} type="button" className={btn} onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="m2 2 10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
