// src/components/widgets/Team.tsx
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ReviewsCarousel from "~/components/widgets/ReviewsCarousel";
import { SITE } from "~/config.mjs";


export default component$(() => {
  return (
   <>
  <ReviewsCarousel/>
    
        </>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - This Is Us`,
  meta: [
    {
      name: "description",
      content: "Meet our expert team of locksmiths and security professionals dedicated to your safety and security.",
    },
  ],
};