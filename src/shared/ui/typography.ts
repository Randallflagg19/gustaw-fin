import { Fraunces, Lora, Manrope } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const editorialHeadingFont = {
  fontFamily: `${fraunces.style.fontFamily}, ${lora.style.fontFamily}, Georgia, serif`,
};

export const likeCountFont = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: "600",
  display: "swap",
});
