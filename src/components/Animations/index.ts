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
export { cardAnim };
