import { Variants } from "framer-motion";

export const navButtonAnimation: Variants = {
  hidden: (custom: number) => ({
    y: -100,
    opacity: 0.001,
    transition: {
      delay: custom * 0.2,
      ease: "easeOut",
      type: "tween",
    },
  }),
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
    },
  }),
};
