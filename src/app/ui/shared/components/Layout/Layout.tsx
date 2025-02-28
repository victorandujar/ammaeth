"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  updateScrollProgressActionCreator,
  setTransitionStateActionCreator,
  setGalaxyStateActionCreator,
} from "@/app/store/features/ui/uiSlice";
import routes from "../../utils/routes";

const SCROLL_STEP = 0.1;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { scrollProgress, isInGalaxy } = useSelector(
    (state: RootState) => state.ui,
  );

  const handleScroll = useCallback(
    (deltaY: number) => {
      dispatch(setTransitionStateActionCreator(true));

      const newProgress =
        scrollProgress + (deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP);
      dispatch(updateScrollProgressActionCreator(newProgress));

      if (newProgress >= 1 && !isInGalaxy) {
        dispatch(setGalaxyStateActionCreator(true));
        router.push(routes.soul);
      } else if (newProgress <= 0 && isInGalaxy) {
        dispatch(setGalaxyStateActionCreator(false));
        router.push("/");
      }
    },
    [scrollProgress, isInGalaxy, dispatch, router],
  );

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    return () => window.removeEventListener("wheel", wheelHandler);
  }, [handleScroll]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 h-full w-full"
          onAnimationComplete={() =>
            dispatch(setTransitionStateActionCreator(false))
          }
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isInGalaxy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
