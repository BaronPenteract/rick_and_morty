import { useScroll, useTransform } from "framer-motion";

export const useScrollAnim = () => {
  const { scrollY, scrollYProgress } = useScroll();

  const offsetYBackgroundTopPosition = [0, 1000];
  const offsetYBackgroundOpacity = [100, 1000];
  const offsetMainTitleTopPosition = [0, 1];

  const backgroundTopPositions = [0, -200];
  const backgroundOpacities = [1, 0];
  const mainTitleTopPositions = ["0em", "2em"];

  const backgroundTopPosition = useTransform(
    scrollY,
    offsetYBackgroundTopPosition,
    backgroundTopPositions
  );

  const backgroundOpacity = useTransform(
    scrollY,
    offsetYBackgroundOpacity,
    backgroundOpacities
  );

  const mainTitleTopPosition = useTransform(
    scrollYProgress,
    offsetMainTitleTopPosition,
    mainTitleTopPositions
  );

  return {
    backgroundTopPosition,
    backgroundOpacity,
    mainTitleTopPosition,
  };
};
