"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ServiceCard from "@/app/ui/soul/components/ServiceCard/ServiceCard";
import LineText from "@/app/ui/shared/components/LineText/LineText";
import SoulAboutSection from "@/app/ui/soul/components/SoulAboutSection/SoulAboutSection";
import useServices from "@/app/ui/soul/hooks/useServices";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setHeaderColorActionCreator,
  setHeaderTextActionCreator,
} from "@/app/store/features/ui/uiSlice";
import colors from "@/app/ui/shared/utils/colors";
import EssenceChromatic from "@/app/ui/essence/components/EssenceChromatic/EssenceChromatic";
import { useTranslations } from "next-intl";

const SoulPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const essenceTriggerRef = useRef<HTMLDivElement>(null);

  const [isEssenceFull, setIsEssenceFull] = useState(false);
  const { loadServices } = useServices();
  const { services } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();

  const t = useTranslations("Soul");

  const { scrollYProgress: essenceScrollProgress } = useScroll({
    target: essenceTriggerRef,
    offset: ["start end", "end end"],
  });
  const essenceX = useTransform(
    essenceScrollProgress,
    [0, 1],
    ["100vw", "0vw"],
  );
  const contentX = useTransform(
    essenceScrollProgress,
    [0, 1],
    ["0vw", "-100vw"],
  );
  const essenceOpacity = useTransform(essenceScrollProgress, [0, 1], [0, 1]);

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end center"],
  });
  const y = useTransform(textScrollProgress, [0, 1], [150, 0]); // Reduced for mobile
  const scale = useTransform(textScrollProgress, [0, 1], [0.5, 1]); // Adjusted for mobile
  const rotateX = useTransform(textScrollProgress, [0, 1], [45, 0]); // Reduced for mobile
  const textOpacity = useTransform(textScrollProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribeEssence = essenceScrollProgress.on("change", (latest) => {
      if (window.innerWidth >= 1024) {
        setIsEssenceFull(latest >= 0.7);
      }
    });
    return () => {
      unsubscribeEssence();
    };
  }, [essenceScrollProgress]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  useEffect(() => {
    const headerConfig = {
      essenceFull: {
        color: colors.primary,
        text: "essence",
      },
      default: {
        color: colors.secondary,
        text: "soul",
      },
    };

    const key = isEssenceFull ? "essenceFull" : "default";
    const { color, text } = headerConfig[key];
    dispatch(setHeaderColorActionCreator(color));
    dispatch(setHeaderTextActionCreator(text));
  }, [dispatch, isEssenceFull]);

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen overflow-x-hidden p-4 sm:p-5 lg:p-5 2xl:p-10"
    >
      <motion.div
        ref={containerRef}
        className="relative w-full min-h-screen z-10"
        style={{ x: window.innerWidth >= 1024 ? contentX : 0 }}
      >
        <main className="flex flex-col items-center gap-12 sm:gap-24 lg:gap-48 relative pt-10 sm:pt-12 2xl:pt-14">
          <SoulAboutSection />

          <motion.span
            ref={textRef}
            className="text-2xl w-full text-center sm:text-4xl sm:w-4/5 lg:text-5xl lg:w-4/5 2xl:text-7xl 2xl:w-2/3"
            style={{ y, scale, rotateX, opacity: textOpacity }}
          >
            {t("services-title")}
          </motion.span>

          <ul className="flex flex-col items-center gap-12 sm:gap-16 lg:gap-24">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </ul>

          <footer className="flex flex-col items-center gap-4 w-full font-thin text-xs sm:flex-row sm:justify-end sm:gap-8 sm:text-base md:text-s">
            <span className="text-center sm:text-left">{t("footer-text")}</span>
            <LineText text="ammaëth" />
          </footer>

          <div
            ref={essenceTriggerRef}
            className="relative w-full h-[100vh] mt-0 hidden lg:block"
          />
        </main>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-screen hidden lg:flex justify-center z-20 bg-background px-10"
        style={{
          x: essenceX,
          opacity: essenceOpacity,
        }}
      >
        <div className="text-8xl font-bold text-white relative flex w-full justify-between lg:pt-24 2xl:pt-32">
          <EssenceChromatic />
        </div>
      </motion.div>
    </div>
  );
};

export default SoulPage;
