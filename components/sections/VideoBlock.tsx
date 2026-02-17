"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

export function VideoBlock() {
  const { videoBlock } = siteContent;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  return (
    <>
      <section className="relative overflow-hidden bg-stone-100 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900">
        <PrismBackground />
        <Container className="relative flex flex-col items-center gap-10 lg:gap-12">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-yellow-600 md:text-base dark:text-yellow-500">
              {videoBlock.preheadline}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
              {videoBlock.headline}
              <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {videoBlock.highlighted}
              </span>
            </h2>
          </div>

          <motion.button
            type="button"
            onClick={openModal}
            className="group relative mx-auto flex w-full max-w-4xl cursor-pointer items-center justify-center overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            whileHover="hover"
            whileTap={{ scale: 0.99 }}
            aria-label="Play video"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={videoBlock.thumbnail}
                alt={videoBlock.thumbnailAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              {/* Dark overlay - stronger on hover */}
              <motion.div
                className="absolute inset-0 bg-black/40 transition-colors duration-200 group-hover:bg-black/55"
                variants={{
                  hover: { opacity: 1 },
                }}
              />
              {/* Play icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                variants={{
                  hover: { scale: 1.05 },
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-lg transition-all duration-200 group-hover:bg-white group-hover:scale-110 md:h-20 md:w-20">
                  <svg
                    className="ml-1 h-6 w-6 md:h-8 md:w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </span>
              </motion.div>
            </div>
          </motion.button>
        </Container>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Video modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-12 right-0 rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close video"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-stone-900">
                {videoBlock.videoEmbedUrl ? (
                  <iframe
                    src={videoBlock.videoEmbedUrl}
                    title="Video player"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-white">
                    <span className="text-6xl opacity-50">▶</span>
                    <p className="text-center text-lg">
                      Add a video URL in site content to play here.
                    </p>
                    <p className="text-sm text-stone-400">
                      Set <code className="rounded bg-stone-700 px-1.5 py-0.5">videoBlock.videoEmbedUrl</code> to your embed URL.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
