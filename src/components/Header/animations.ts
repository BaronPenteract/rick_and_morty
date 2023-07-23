import { Variants } from "framer-motion";

const headerBGFrontAnimation: Variants = {
  hidden: {
    top: "100%",
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
      delay: 1.5,
    },
  },
  visible: {
    top: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      type: "tween",
      delay: 0.5,
    },
  },
};
const headerBGObjectContainerAnimation: Variants = {
  hidden: {
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
      delay: 1.75,
    },
  },
  visible: {
    rotateZ: "34deg",
    transition: {
      ease: "easeOut",
      duration: 6.5,
      type: "tween",
      delay: 1.25,
    },
  },
};
const headerBGObjectAnimation: Variants = {
  hidden: {
    bottom: "-50vh",
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
      delay: 1.75,
    },
  },
  visible: {
    bottom: 0,
    left: "10vw",
    rotateZ: "-34deg",
    transition: {
      ease: "easeOut",
      duration: 6.5,
      type: "tween",
      delay: 1.25,
    },
  },
};
const headerBGBackAnimation: Variants = {
  hidden: {
    top: "100vh",
    transition: {
      ease: "easeOut",
      duration: 0.5,
      type: "tween",
      delay: 1.25,
    },
  },
  visible: {
    top: 0,
    transition: {
      ease: "easeOut",
      duration: 1.5,
      type: "tween",
      delay: 0.75,
    },
  },
};

export {
  headerBGBackAnimation,
  headerBGFrontAnimation,
  headerBGObjectAnimation,
  headerBGObjectContainerAnimation,
};
