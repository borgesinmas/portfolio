"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  caption,
  priority,
  sizes,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const modal =
    mounted && isOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_34%)]" />
            <div
              className="relative z-10 w-full max-w-[min(94vw,1500px)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-2xl transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                aria-label="Cerrar imagen ampliada"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#090C10] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="max-h-[84vh] w-full object-contain"
                  priority
                />
              </div>

              {caption && (
                <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-white/72">
                  {caption}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative block w-full cursor-zoom-in overflow-hidden text-left ${className ?? ""}`}
        aria-label={`Ampliar imagen: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
        <span className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 shadow-xl backdrop-blur-sm transition group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M9 21H3v-6" />
            <path d="M14 10 3 21" />
          </svg>
        </span>
      </button>
      {modal}
    </>
  );
}
