"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

const AVATAR_COLORS = ["bg-violet-500", "bg-teal-500", "bg-emerald-500", "bg-amber-600"] as const;
/** Min height for quote block so review text is at least 3 lines. */
const QUOTE_BLOCK_MIN_HEIGHT = "3.75rem";
/** Smooth slide duration (ms) and ease-out for premium feel. */
const TESTIMONIAL_SWIPER_SPEED_MS = 500;

type TestimonialCardItem = {
  id: string;
  name: string;
  date: string;
  avatar: string;
  quote: string;
  photo?: string;
};

function TestimonialCard({
  item,
  index,
  placeUrl,
}: {
  item: TestimonialCardItem;
  index: number;
  placeUrl: string;
}) {
  const [avatarError, setAvatarError] = useState(false);
  const showAvatarImage = item.avatar && !avatarError;

  const content = (
    <>
      <div
        className="flex flex-1 flex-col p-6 md:p-7"
        style={{ minHeight: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-stone-700 ring-2 ring-stone-600/50">
            {showAvatarImage ? (
              <Image
                src={item.avatar}
                alt={item.name}
                fill
                className="object-cover object-top"
                sizes="56px"
                onError={() => setAvatarError(true)}
                unoptimized
              />
            ) : (
              <span
                className={`flex h-full w-full items-center justify-center text-xl font-bold text-white ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                aria-hidden
              >
                {item.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold text-white">{item.name}</p>
            <p className="text-xs text-stone-400">{item.date}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2 text-yellow-400" aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className="h-8 w-8 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="mt-4 flex-1" style={{ minHeight: QUOTE_BLOCK_MIN_HEIGHT }}>
          <p className="text-xs leading-relaxed text-white/95 line-clamp-3 md:text-sm">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8">
        <div className="relative h-44 w-full overflow-hidden rounded-xl">
          <Image
            src={item.photo || "/hero/vehicle-bmw.jpg"}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
    </>
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-600/40 bg-stone-800/90 shadow-xl shadow-black/25 transition-[box-shadow,transform] duration-200 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5 dark:border-stone-600/40 dark:bg-stone-800/90">
      <a
        href={placeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
        aria-label={`Read ${item.name}'s review on Google`}
      >
        {content}
      </a>
    </article>
  );
}

function getHeadingParts(highlighted: string) {
  const parts = highlighted.trim().split(/\s+/);
  if (parts.length === 0) return { gold: "", rest: "" };
  return { gold: parts[0], rest: parts.length > 1 ? " " + parts.slice(1).join(" ") : "" };
}

/** Real Refreshthelook business map link (Austin, TX). */
const REFRESHTHELOOK_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Refreshthelook/@30.3517658,-97.6730815,17z/data=!3m1!4b1!4m6!3m5!1s0x8644c90bb28fffff:0xf4acd7f5fc4b9bb!8m2!3d30.3517658!4d-97.6730815!16s%2Fg%2F11s8gj08vr?entry=ttu";

export function Testimonials() {
  const { testimonialsSection, testimonials: fallbackTestimonials } = siteContent;
  const [reviews, setReviews] = useState<TestimonialCardItem[]>([]);
  const [placeUrl, setPlaceUrl] = useState(REFRESHTHELOOK_GOOGLE_MAPS_URL);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const list =
    reviews.length > 0 ? reviews : (fallbackTestimonials as TestimonialCardItem[]);

  const { gold: goldWord, rest: restWords } = getHeadingParts(testimonialsSection.highlighted);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data: { reviews?: TestimonialCardItem[]; placeUrl?: string }) => {
        if (Array.isArray(data.reviews)) setReviews(data.reviews);
        if (typeof data.placeUrl === "string") setPlaceUrl(data.placeUrl);
        setReviewsLoaded(true);
      })
      .catch(() => setReviewsLoaded(true));
  }, []);

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      className="relative overflow-hidden bg-stone-950 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-950"
      id="testimonials"
    >
      <div className="pointer-events-none absolute inset-0 dark" aria-hidden>
        <PrismBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-500 md:text-base">
            {testimonialsSection.preheadline}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            {testimonialsSection.headline}
            <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              {goldWord}
            </span>
            {restWords}
          </h2>
        </div>

        <div className="mt-10 lg:mt-16">
          {list.length === 0 ? (
            <p className="py-12 text-center text-stone-400">
              {reviewsLoaded
                ? "Configure GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to show Google reviews."
                : "Loading reviews…"}
            </p>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="testimonial-nav-btn flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-500/50 bg-stone-800/80 text-white shadow-md transition-[opacity,transform] duration-200 hover:bg-stone-700/90 hover:opacity-100 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:h-12 sm:w-12"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="min-w-0 flex-1">
                <Swiper
                  onSwiper={(s) => {
                    swiperRef.current = s;
                  }}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  speed={TESTIMONIAL_SWIPER_SPEED_MS}
                  spaceBetween={24}
                  loop={true}
                  breakpoints={{
                    0: { slidesPerView: 1, slidesPerGroup: 1 },
                    768: { slidesPerView: 2, slidesPerGroup: 2 },
                    1200: { slidesPerView: 3, slidesPerGroup: 3 },
                  }}
                  className="testimonials-swiper"
                  grabCursor={true}
                  touchReleaseOnEdges={true}
                >
                  {list.map((item, index) => (
                    <SwiperSlide key={item.id} className="h-auto">
                      <TestimonialCard item={item} index={index} placeUrl={placeUrl} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="testimonial-nav-btn flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-500/50 bg-stone-800/80 text-white shadow-md transition-[opacity,transform] duration-200 hover:bg-stone-700/90 hover:opacity-100 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:h-12 sm:w-12"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
