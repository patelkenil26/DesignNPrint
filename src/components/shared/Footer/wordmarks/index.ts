import type { ComponentType } from "react";
import FoilWordmark from "@/components/shared/Footer/wordmarks/FoilWordmark";
import HalftoneWordmark from "@/components/shared/Footer/wordmarks/HalftoneWordmark";
import InkBloomWordmark from "@/components/shared/Footer/wordmarks/InkBloomWordmark";
import LetterPopWordmark from "@/components/shared/Footer/wordmarks/LetterPopWordmark";
import RegistrationWordmark from "@/components/shared/Footer/wordmarks/RegistrationWordmark";
import ScrollPrintWordmark from "@/components/shared/Footer/wordmarks/ScrollPrintWordmark";

export interface WordmarkVariant {
  id: string;
  letter: string;
  name: string;
  description: string;
  Component: ComponentType;
}

/** Every footer wordmark option. The chosen one is set in DEFAULT_WORDMARK_ID; the rest can be deleted. */
export const wordmarkVariants: WordmarkVariant[] = [
  {
    id: "ink-bloom",
    letter: "A",
    name: "Ink bloom",
    description: "Outline letters; CMYK ink blooms wherever the cursor is, and drifts on its own when nobody is there. Plates fringe the edges.",
    Component: InkBloomWordmark,
  },
  {
    id: "registration",
    letter: "B",
    name: "Registration snap",
    description: "Cyan, magenta and yellow plates slide in misregistered and lock into white. Move the cursor and they drift apart again.",
    Component: RegistrationWordmark,
  },
  {
    id: "foil",
    letter: "C",
    name: "Foil gradient",
    description: "The name is filled with a flowing CMYK gradient that fades toward the bottom, with a foil-shine band sweeping across. Always on, no interaction.",
    Component: FoilWordmark,
  },
  {
    id: "halftone",
    letter: "D",
    name: "Halftone",
    description: "Made of real printing halftone dots in the process colours, coarser toward the bottom, slowly drifting — a magnified print.",
    Component: HalftoneWordmark,
  },
  {
    id: "scroll-print",
    letter: "E",
    name: "Scroll print pass",
    description: "Scroll through the footer and the name is printed in front of you: cyan, magenta, yellow, then the full CMYK finish, tied to your scroll.",
    Component: ScrollPrintWordmark,
  },
  {
    id: "letter-pop",
    letter: "F",
    name: "Letter pop",
    description: "Hover any letter: it jumps up and prints itself in its own ink with an offset shadow. A colour wave runs along the word every few seconds.",
    Component: LetterPopWordmark,
  },
];

export const DEFAULT_WORDMARK_ID = "ink-bloom";
