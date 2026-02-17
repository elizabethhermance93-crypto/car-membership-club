"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";
import { cardHover, hoverTransition, slideTransition } from "@/lib/motion";

const SWIPER_SPEED_MS = slideTransition.duration * 1000;

export function ProblemsSection() {
  const { problemsSection } = siteContent;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900">
      <PrismBackground />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-600 md:text-base dark:text-yellow-500">
            {problemsSection.preheadline}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
            {problemsSection.headline}
          </h2>
        </div>

        <div className="mt-12 overflow-hidden lg:mt-16">
          <Swiper
            modules={[Navigation]}
            navigation
            speed={SWIPER_SPEED_MS}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="problems-swiper"
          >
            {problemsSection.cards.map((card) => (
              <SwiperSlide key={card.id}>
                <motion.article
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-300 bg-white shadow-lg transition-[border-color,box-shadow] duration-200 hover:border-stone-400 hover:shadow-2xl dark:border-stone-600/60 dark:bg-stone-800 dark:hover:border-stone-500 dark:hover:shadow-black/25"
                  whileHover={cardHover}
                  transition={hoverTransition}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-700">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover transition-[transform,filter] duration-300 group-hover:scale-105 group-hover:brightness-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-800/50">
                    <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 md:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base">
                      {card.description}
                    </p>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
