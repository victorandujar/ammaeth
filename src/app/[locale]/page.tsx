"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useCallback, useEffect } from "react";
import { FaRegCopyright } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  updateScrollProgressActionCreator,
  setGalaxyStateActionCreator,
} from "@/app/store/features/ui/uiSlice";
import { useAppSelector } from "@/app/store/hooks";
import GalaxyScene from "../ui/landing/components/GalaxyScene/GalaxyScene";
import OptionsMenu from "../ui/shared/components/OptionsMenu/OptionsMenu";
import LineText from "../ui/shared/components/LineText/LineText";
import useUi from "../ui/shared/hooks/useUi";
import routes from "../ui/shared/utils/routes";
import Image from "next/image";

const SCROLL_STEP = 0.05;
const ANIMATION_DURATION = 1200;

const HomePage: React.FC = () => {
  const { openNavigationMenu, closeNavigationMenu, isNavigationMenuOpen } =
    useUi();
  const t = useTranslations("Landing");
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { scrollProgress } = useAppSelector((state: RootState) => state.ui);

  const triggerNavigation = useCallback(() => {
    dispatch(setGalaxyStateActionCreator(true));
    setTimeout(() => {
      router.push(routes.soul);
    }, ANIMATION_DURATION);
  }, [dispatch, router]);

  const handleScroll = useCallback(
    (deltaY: number) => {
      const newProgress = Math.min(
        Math.max(scrollProgress + (deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP), 0),
        1,
      );
      dispatch(updateScrollProgressActionCreator(newProgress));

      if (newProgress >= 1 && deltaY > 0) {
        triggerNavigation();
      }
    },
    [scrollProgress, dispatch, triggerNavigation],
  );

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (atTop && event.deltaY < 0) {
        event.preventDefault();
        handleScroll(event.deltaY);
      } else if (atBottom && event.deltaY > 0) {
        event.preventDefault();
        handleScroll(event.deltaY);
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    return () => window.removeEventListener("wheel", wheelHandler);
  }, [handleScroll]);

  const toggleNavigationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isNavigationMenuOpen) {
      closeNavigationMenu();
    } else {
      openNavigationMenu();
    }
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (
      isNavigationMenuOpen &&
      !(event.target as HTMLElement).closest(".menu-container") &&
      !(event.target as HTMLElement).closest("button")
    ) {
      closeNavigationMenu();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-y-auto snap-y snap-mandatory"
      onClick={handleOutsideClick}
    >
      <main className="flex flex-col justify-center items-center h-screen snap-start">
        <section className="border-white/30 border-[0.5px] h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] md:h-[80%] md:w-[80%] rounded-3xl bg-gradient-to-b from-background to-white/20 relative shadow-inner-lg overflow-hidden">
          <div className="pt-4 px-4 sm:pt-6 sm:px-6 md:pt-7 md:px-8 w-full flex justify-between absolute font-thin z-10">
            <Image
              src={"/icons/ae-logo.svg"}
              alt="ammaeth logo"
              width={60}
              height={60}
            />
            <div className="relative">
              <button
                className="uppercase text-sm sm:text-base md:text-base font-thin"
                onMouseEnter={openNavigationMenu}
                onMouseLeave={closeNavigationMenu}
                onClick={toggleNavigationMenu}
              >
                {t("options")}
              </button>

              <AnimatePresence>
                {isNavigationMenuOpen && (
                  <div
                    className="absolute top-full right-0 md:-right-1.5 z-10 menu-container"
                    onMouseEnter={openNavigationMenu}
                    onMouseLeave={closeNavigationMenu}
                  >
                    <OptionsMenu
                      isOpen={isNavigationMenuOpen}
                      closeNavigationMenu={closeNavigationMenu}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute bottom-[22%] -left-[40%] sm:bottom-[20%] sm:-left-[10%] md:bottom-[21.5%] md:-left-[10%] lg:-left-[7.5%] -rotate-90">
            <LineText text={t("resonance")} />
          </div>
          <div className="absolute top-[30%] -right-[40%] sm:top-[25%] sm:-right-[10%] md:top-[30%] md:-right-[10%] lg:-right-[7.5%] rotate-90">
            <LineText text={t("presence")} />
          </div>
          <span className="absolute bottom-2 right-4 sm:bottom-3 sm:right-4 md:bottom-5 md:right-7 flex items-center gap-2 text-sm sm:text-base md:text-sm">
            <FaRegCopyright />
            2025
          </span>
          <GalaxyScene />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
