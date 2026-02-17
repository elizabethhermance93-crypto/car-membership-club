"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cardHover, hoverTransition, slideTransition } from "@/lib/motion";

type VehicleCarouselProps = {
  showHeading?: boolean;
};

const SWIPER_SPEED_MS = slideTransition.duration * 1000;

export function VehicleCarousel({ showHeading = true }: VehicleCarouselProps) {
  return (
    <section className="py-16 sm:py-20" id="vehicles">
      <Container>
        {showHeading ? (
          <SectionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                Vehicles
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Browse available categories
              </h2>
            </div>
          </SectionReveal>
        ) : null}

        <SectionReveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              speed={SWIPER_SPEED_MS}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="vehicle-swiper"
            >
              {siteContent.vehicles.map((vehicle) => (
                <SwiperSlide key={vehicle.id}>
                  <motion.article
                    className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-[box-shadow,border-color] duration-[180ms] ease-out hover:border-slate-300 hover:shadow-lg"
                    whileHover={cardHover}
                    transition={hoverTransition}
                  >
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.name} placeholder`}
                      width={1200}
                      height={700}
                      className="h-44 w-full rounded-xl object-cover"
                    />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
                      {vehicle.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {vehicle.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{vehicle.blurb}</p>
                  </motion.article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
