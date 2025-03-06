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

const SoulPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const essenceTriggerRef = useRef<HTMLDivElement>(null);
  const beyondTriggerRef = useRef<HTMLDivElement>(null);

  const [isEssenceFull, setIsEssenceFull] = useState(false);
  const [isBeyondFull, setIsBeyondFull] = useState(false);
  const { loadServices } = useServices();
  const { services } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();

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

  const { scrollYProgress: beyondScrollProgress } = useScroll({
    target: beyondTriggerRef,
    offset: ["start end", "end end"],
  });
  const beyondY = useTransform(beyondScrollProgress, [0, 1], ["-100vh", "0vh"]);
  const essenceY = useTransform(beyondScrollProgress, [0, 1], ["0vh", "100vh"]);
  const beyondOpacity = useTransform(beyondScrollProgress, [0, 1], [0, 1]);

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end center"],
  });
  const y = useTransform(textScrollProgress, [0, 1], [300, 0]);
  const scale = useTransform(textScrollProgress, [0, 1], [0.2, 1.2]);
  const rotateX = useTransform(textScrollProgress, [0, 1], [90, 0]);
  const textOpacity = useTransform(textScrollProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribeEssence = essenceScrollProgress.on("change", (latest) => {
      setIsEssenceFull(latest >= 0.7 && !isBeyondFull);
    });
    const unsubscribeBeyond = beyondScrollProgress.on("change", (latest) => {
      setIsBeyondFull(latest >= 0.7);
    });
    return () => {
      unsubscribeEssence();
      unsubscribeBeyond();
    };
  }, [essenceScrollProgress, beyondScrollProgress, isBeyondFull]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  useEffect(() => {
    const headerConfig = {
      beyondFull: {
        color: "white",
        text: "manifestation",
      },
      essenceFull: {
        color: colors.primary,
        text: "essence",
      },
      default: {
        color: colors.secondary,
        text: "soul",
      },
    };

    const key = isBeyondFull
      ? "beyondFull"
      : isEssenceFull
        ? "essenceFull"
        : "default";

    const { color, text } = headerConfig[key];
    dispatch(setHeaderColorActionCreator(color));
    dispatch(setHeaderTextActionCreator(text));
  }, [dispatch, isEssenceFull, isBeyondFull]);

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-[300vh] overflow-x-hidden"
    >
      <motion.div
        ref={containerRef}
        className="relative w-full min-h-screen z-10"
        style={{ x: contentX }}
      >
        <main className="flex flex-col items-center gap-48 relative p-10 pt-20">
          <SoulAboutSection />

          <motion.span
            ref={textRef}
            className="text-7xl w-2/3 text-center"
            style={{ y, scale, rotateX, opacity: textOpacity }}
          >
            flujo digital: donde diseño, código y optimización convergen
          </motion.span>

          <ul className="flex flex-col items-center gap-24">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </ul>

          <footer className="flex items-center w-full justify-end gap-80 font-thin text-s sm:text-base md:text-s">
            <span>
              [ Iniciar el Viaje ] / [ Explorar Posibilidades ] / [ Construir
              Juntos ]
            </span>
            <LineText text="ammaëth" />
          </footer>

          <div
            ref={essenceTriggerRef}
            className="relative w-full h-[100vh] mt-0"
          />

          <div
            ref={beyondTriggerRef}
            className="relative w-full h-[100vh] mt-0"
          />
        </main>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20 bg-background"
        style={{
          x: essenceX,
          y: essenceY,
          opacity: essenceOpacity,
        }}
      >
        <div className="text-8xl font-bold text-white">ESSENCE</div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-30 bg-background"
        style={{
          y: beyondY,
          opacity: beyondOpacity,
        }}
      >
        <div className="text-8xl font-bold text-white">BEYOND</div>
      </motion.div>
    </div>
  );
};

export default SoulPage;
