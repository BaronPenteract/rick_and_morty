import { Variants } from "framer-motion";

const cardAnim: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.4,
      type: "tween",
      delay: 0.1,
    },
  },
};

const upDownAnimation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
    },
  }),
};
export { cardAnim, upDownAnimation };
