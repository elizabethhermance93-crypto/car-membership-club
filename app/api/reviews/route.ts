import { NextResponse } from "next/server";

/**
 * Google Place Details (Legacy) returns at most 5 reviews per request.
 * Set in .env.local:
 *   GOOGLE_PLACES_API_KEY - from Google Cloud (Places API enabled)
 *   GOOGLE_PLACE_ID       - business Place ID (from Place ID finder)
 *   GOOGLE_PLACE_URL      - optional; link to your Google Maps listing (used when user clicks a review card)
 */
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

/** Default Google Maps URL for Refreshthelook (used when GOOGLE_PLACE_URL is not set). */
const DEFAULT_PLACE_URL =
  "https://www.google.com/maps/place/Refreshthelook/@30.3517658,-97.6730815,17z/data=!3m1!4b1!4m6!3m5!1s0x8644c90bb28fffff:0xf4acd7f5fc4b9bb!8m2!3d30.3517658!4d-97.6730815!16s%2Fg%2F11s8gj08vr?entry=ttu";

type GoogleReview = {
  author_name: string;
  profile_photo_url?: string;
  relative_time_description: string;
  text: string;
  time: number;
  rating: number;
};

type PlaceDetailsResponse = {
  result?: { reviews?: GoogleReview[] };
  status: string;
  error_message?: string;
};

export type ReviewItem = {
  id: string;
  name: string;
  date: string;
  avatar: string;
  quote: string;
  photo?: string;
};

function formatReviewDate(relativeTime: string, timestamp: number): string {
  if (relativeTime) return relativeTime;
  try {
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const placeUrl = process.env.GOOGLE_PLACE_URL || DEFAULT_PLACE_URL;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Google Places not configured", reviews: [], placeUrl },
      { status: 200 }
    );
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "reviews",
    key: apiKey,
    reviews_sort: "newest",
  });

  try {
    const res = await fetch(`${PLACE_DETAILS_URL}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });
    const data = (await res.json()) as PlaceDetailsResponse;

    if (data.status !== "OK") {
      return NextResponse.json(
        {
          error: data.error_message || data.status,
          reviews: [],
          placeUrl,
        },
        { status: 200 }
      );
    }

    const rawReviews = data.result?.reviews ?? [];
    const reviews: ReviewItem[] = rawReviews.map((r, i) => ({
      id: `google-review-${i}-${r.time}`,
      name: r.author_name,
      date: formatReviewDate(r.relative_time_description, r.time),
      avatar: r.profile_photo_url ?? "",
      quote: r.text,
    }));

    return NextResponse.json({ reviews, placeUrl });
  } catch (err) {
    console.error("Google Place Details error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews", reviews: [], placeUrl },
      { status: 200 }
    );
  }
}
