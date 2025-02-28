"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  updateScrollProgressActionCreator,
  setTransitionStateActionCreator,
  setGalaxyStateActionCreator,
} from "@/app/store/features/ui/uiSlice";
import routes from "../../utils/routes";
import Header from "../Header/Header";
import OptionsMenu from "@/app/ui/navigation/components/OptionsMenu/OptionsMenu";
import { useAppSelector } from "@/app/store/hooks";
import useUi from "../../hooks/useUi";

const SCROLL_STEP = 0.1;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  const dispatch = useDispatch();
  const { openNavigationMenu, closeNavigationMenu, isNavigationMenuOpen } =
    useUi();

  const { scrollProgress, isInGalaxy } = useAppSelector(
    (state: RootState) => state.ui,
  );

  const handleScroll = useCallback(
    (deltaY: number) => {
      dispatch(setTransitionStateActionCreator(true));

      const newProgress =
        scrollProgress + (deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP);
      dispatch(updateScrollProgressActionCreator(newProgress));

      // Lógica de navegación entre páginas
      if (newProgress >= 1) {
        if (pathname === `/${locale}`) {
          dispatch(setGalaxyStateActionCreator(true));
          router.push(routes.soul);
        }
        // Aquí puedes añadir más condiciones para otras páginas
      } else if (newProgress <= 0) {
        if (pathname === routes.soul) {
          dispatch(setGalaxyStateActionCreator(false));
          router.push(`/${locale}`);
        }
      }
    },
    [scrollProgress, dispatch, router, pathname, locale],
  );

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (
      isNavigationMenuOpen &&
      !(event.target as HTMLElement).closest(".menu-container")
    ) {
      closeNavigationMenu();
    }
  };

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (pathname === `/${locale}`) {
        event.preventDefault();
        handleScroll(event.deltaY);
      } else if (
        (atTop && event.deltaY < 0) ||
        (atBottom && event.deltaY > 0)
      ) {
        event.preventDefault();
        handleScroll(event.deltaY);
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    return () => window.removeEventListener("wheel", wheelHandler);
  }, [handleScroll, locale, pathname]);

  return (
    <div className="relative w-full" onClick={handleOutsideClick}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full"
          onAnimationComplete={() =>
            dispatch(setTransitionStateActionCreator(false))
          }
        >
          {pathname !== `/${locale}` && (
            <>
              <Header />
              <div
                className="absolute top-10 right-0 md:right-4 z-20 menu-container"
                onMouseEnter={openNavigationMenu}
                onMouseLeave={closeNavigationMenu}
              >
                <AnimatePresence>
                  {isNavigationMenuOpen && (
                    <OptionsMenu isOpen={isNavigationMenuOpen} />
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
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
