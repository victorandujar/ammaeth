"use client";

import React from "react";
import KeywordCarousel from "@/app/ui/shared/components/KeywordsCarousel/KeywordCarousel";
import keywords from "@/app/ui/shared/components/KeywordsCarousel/utils/keywords";
import LineText from "@/app/ui/shared/components/LineText/LineText";
import colors from "@/app/ui/shared/utils/colors";
import Image from "next/image";
import Planet from "../../../shared/components/PlanetScene/PlanetScene";
import { useTranslations } from "next-intl";

const SoulAboutSection: React.FC = () => {
  const t = useTranslations("Soul");

  return (
    <section className="flex flex-col gap-8 sm:flex-row sm:justify-between w-full h-full">
      <article className="w-full flex flex-col items-center gap-5 font-thin sm:w-[31%] sm:items-end">
        <section className="bg-gradient-to-b from-transparent to-white/20 backdrop-blur-md rounded-br-lg rounded-bl-lg shadow-2xl shadow-zinc-950 h-[200px] w-full sm:h-[340px] 2xl:h-[650px]">
          <Planet />
        </section>
        <span className="text-s text-center px-4 sm:text-right sm:w-[90%] 2xl:w-3/4">
          {t("about-first")}
        </span>
      </article>

      <div className="hidden sm:block overflow-hidden">
        <KeywordCarousel keywords={keywords} />
      </div>

      <section className="w-full flex flex-col-reverse gap-6 font-thin px-4 sm:w-1/3 sm:px-0 sm:gap-10 relative md:flex-col">
        <span className="hidden font-ppModelPlastic text-center sm:text-left md:block">
          front end developer & ux/ui
        </span>
        <div className="w-full">
          <span className="text-s text-center sm:text-left 2xl:text-ml">
            {t("about-second")}
          </span>
        </div>
        <div className="flex flex-col items-center gap-5 w-full sm:absolute sm:-bottom-16 2xl:bottom-5 sm:-z-10 sm:items-end">
          <Image
            src={"/images/profile/viclindo.jpg"}
            alt="Profile picture"
            width={300}
            height={200}
            className="object-contain rounded-lg w-[250px] sm:w-[300px] 2xl:w-[450px]"
          />
          <div className="flex flex-col items-center gap-2 text-xs sm:flex-row sm:gap-14 sm:text-xs 2xl:text-ms">
            <span className="inline-block text-white/50">
              {"murcia andújar víctor".split("").reverse().join("")}
            </span>
            <span>murcia andújar víctor</span>
          </div>
          <div className="self-center sm:self-end">
            <LineText text="self" color={colors.tertiary} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default SoulAboutSection;
