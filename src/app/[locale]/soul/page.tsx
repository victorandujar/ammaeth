"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import ServiceCard from "@/app/ui/soul/components/ServiceCard/ServiceCard";
import LineText from "@/app/ui/shared/components/LineText/LineText";
import SoulAboutSection from "@/app/ui/soul/components/SoulAboutSection/SoulAboutSection";
import useServices from "@/app/ui/soul/hooks/useServices";
import { useAppSelector } from "@/app/store/hooks";

const SoulPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const { loadServices } = useServices();
  const { services } = useAppSelector((state) => state.services);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["0.8 end", "end center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.2]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      <main className="flex flex-col items-center gap-48 relative z-10 p-10 pt-20">
        <SoulAboutSection />
        <motion.span
          ref={textRef}
          className="text-7xl w-2/3 text-center"
          style={{ y, scale, rotateX, opacity }}
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
      </main>
    </div>
  );
};

export default SoulPage;
