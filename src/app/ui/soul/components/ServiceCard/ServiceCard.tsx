"use client";

import { Service } from "@/app/modules/soul/domain/Service";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  service: Service;
}

const cardVariants = {
  hidden: {
    y: 100, // Empieza 100px abajo de su posición final
    opacity: 0, // Invisible al inicio
  },
  visible: {
    y: 0, // Se mueve a su posición final
    opacity: 1, // Completamente visible
    transition: {
      duration: 0.8, // Duración de la animación
      ease: "easeOut", // Suavizado natural
    },
  },
};

const ServiceCard: React.FC<Props> = ({ service }) => {
  const t = useTranslations("Services");
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  return (
    <motion.article
      ref={cardRef}
      className="flex flex-col gap-5 items-end bg-gradient-to-b from-transparent to-white/20 w-[90%] px-10 pb-10 rounded-lg font-light text-sm"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <section className="flex flex-col items-end gap-2">
        <h3 className="font-ppValve text-5xl font-semibold">{service.title}</h3>
        <h5>{t(service.susbtitle)}</h5>
      </section>
      <ul className="flex flex-col gap-8 items-start w-full">
        {service.content.map((content) => (
          <li key={content.id} className="flex items-center gap-4">
            <span>0{content.id}</span>
            <span>{"//"}</span>
            <span>{t(content.text)}</span>
          </li>
        ))}
      </ul>
      <button className="bg-gradient-to-r from-tertiary/80 to-transparent px-4 py-2 w-56 rounded-3xl text-sm text-left">
        contactar
      </button>
      <span className="text-right w-4/5">{t(service.lower_text)}</span>
    </motion.article>
  );
};

export default ServiceCard;
