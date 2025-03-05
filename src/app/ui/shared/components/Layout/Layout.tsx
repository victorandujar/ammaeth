"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useParams } from "next/navigation";
import Header from "../Header/Header";
import OptionsMenu from "@/app/ui/shared/components/OptionsMenu/OptionsMenu";
import { useAppSelector } from "@/app/store/hooks";
import useUi from "../../hooks/useUi";
import { RootState } from "@/app/store/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { locale } = useParams();
  const { openNavigationMenu, closeNavigationMenu, isNavigationMenuOpen } =
    useUi();
  const { isInGalaxy } = useAppSelector((state: RootState) => state.ui);

  return (
    <div
      className="relative w-full"
      onClick={(element) => {
        const target = element.target as HTMLElement;
        if (isNavigationMenuOpen && !target.closest(".menu-container")) {
          closeNavigationMenu();
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="z-10 w-full"
        >
          {pathname !== `/${locale}` && (
            <>
              <Header />
              <div
                className="fixed top-18 right-0 md:right-4 z-50 menu-container"
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

      {isInGalaxy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black"
        />
      )}
    </div>
  );
};

export default Layout;
