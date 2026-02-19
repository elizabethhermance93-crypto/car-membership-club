"use client";

import Image from "next/image";
import { useRef, Fragment, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

export type FeaturedVehicleGroup = {
  id: string;
  name: string;
  /** Left panel: interior or detail of this vehicle */
  leftImage: string;
  /** Center panel: main car exterior */
  centerImage: string;
  /** Right panel: interior or detail of this vehicle */
  rightImage: string;
};

type FeaturedVehicleCarouselProps = {
  groups: FeaturedVehicleGroup[];
};

const SWIPER_SPEED_MS = 500;

function SlideCard({
  image,
  alt,
  label,
  isCenter,
}: {
  image: string;
  alt: string;
  label?: string;
  isCenter?: boolean;
}) {
  return (
    <article className="group relative h-52 w-full cursor-pointer overflow-hidden rounded-xl border border-stone-300/70 bg-white transition-all duration-300 hover:border-stone-400 hover:shadow-lg hover:shadow-stone-400/30 sm:h-56">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 33vw, (max-width: 1280px) 33vw, 20vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      {isCenter && label ? (
        <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-bold text-white drop-shadow-md sm:text-base">
          {label}
        </p>
      ) : null}
    </article>
  );
}

export function FeaturedVehicleCarousel({ groups }: FeaturedVehicleCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const updateGroupIndex = useCallback((swiper: SwiperType) => {
    const realIndex = swiper.realIndex ?? swiper.activeIndex;
    setActiveGroupIndex(Math.floor(realIndex / 3) % groups.length);
  }, [groups.length]);

  if (groups.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="featured-vehicle-nav flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-md transition-all duration-200 hover:bg-stone-100 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 sm:h-12 sm:w-12"
          aria-label="Previous vehicle"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <div className="min-w-0 flex-1">
          <Swiper
            onSwiper={(s) => {
              swiperRef.current = s;
              updateGroupIndex(s);
            }}
            onSlideChange={(s) => updateGroupIndex(s)}
            speed={SWIPER_SPEED_MS}
            spaceBetween={12}
            loop={groups.length > 1}
            slidesPerView={3}
            slidesPerGroup={3}
            breakpoints={{
              0: { spaceBetween: 8 },
              768: { spaceBetween: 12 },
              1024: { spaceBetween: 14 },
            }}
            className="featured-vehicle-swiper"
            grabCursor
            touchReleaseOnEdges
          >
          {groups.map((group) => (
            <Fragment key={group.id}>
              <SwiperSlide key={`${group.id}-left`}>
                <SlideCard
                  image={group.leftImage}
                  alt={`${group.name} interior`}
                  isCenter={false}
                />
              </SwiperSlide>
              <SwiperSlide key={`${group.id}-center`}>
                <SlideCard
                  image={group.centerImage}
                  alt={group.name}
                  label={group.name}
                  isCenter
                />
              </SwiperSlide>
              <SwiperSlide key={`${group.id}-right`}>
                <SlideCard
                  image={group.rightImage}
                  alt={`${group.name} detail`}
                  isCenter={false}
                />
              </SwiperSlide>
            </Fragment>
          ))}
        </Swiper>
        </div>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="featured-vehicle-nav flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-md transition-all duration-200 hover:bg-stone-100 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 sm:h-12 sm:w-12"
          aria-label="Next vehicle"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
      {groups.length > 1 ? (
        <div className="flex justify-center gap-2" role="tablist" aria-label="Featured vehicles">
          {groups.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeGroupIndex ? "true" : "false"}
              aria-label={`Vehicle ${i + 1}`}
              onClick={() => {
                const s = swiperRef.current;
                if (!s) return;
                if (typeof s.slideToLoop === "function") s.slideToLoop(i * 3);
                else s.slideTo(i * 3);
              }}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === activeGroupIndex ? "w-6 bg-yellow-500" : "w-2 bg-stone-400 hover:bg-stone-500"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
