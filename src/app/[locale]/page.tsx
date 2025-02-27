"use client";

import { FaRegCopyright } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import GalaxyScene from "../ui/landing/components/GalaxyScene/GalaxyScene";
import LineText from "../ui/shared/components/LineText/LineText";
import useUi from "../ui/shared/hooks/useUi";
import OptionsMenu from "../ui/navigation/components/OptionsMenu/OptionsMenu";
import { useTranslations } from "next-intl";

const HomePage: React.FC = () => {
  const { openNavigationMenu, closeNavigationMenu, isNavigationMenuOpen } =
    useUi();
  const t = useTranslations("Landing");

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
    <main
      className="flex flex-col justify-center items-center h-screen"
      onClick={handleOutsideClick}
    >
      <section className="border-white/30 border-[0.5px] h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] md:h-[80%] md:w-[80%] rounded-3xl bg-gradient-to-b from-background to-white/20 relative shadow-inner-lg overflow-hidden">
        <div className="pt-4 px-4 sm:pt-6 sm:px-6 md:pt-7 md:px-8 w-full flex justify-between absolute font-thin z-10">
          <span className="text-2xl sm:text-3xl md:text-4xl font-light">
            ammaëth
          </span>
          <div className="relative">
            <button
              className="uppercase text-sm sm:text-base md:text-base"
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
                  <OptionsMenu isOpen={isNavigationMenuOpen} />
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
  );
};

export default HomePage;
