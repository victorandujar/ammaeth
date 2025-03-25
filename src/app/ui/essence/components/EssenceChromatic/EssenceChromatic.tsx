"use client";

import Image from "next/image";
import Table from "../EssencTable/EssenceTable";
import { useTranslations } from "next-intl";

const EssenceChromatic: React.FC = () => {
  const t = useTranslations("Essence");
  return (
    <section className="flex flex-col lg:gap-0 2xl:gap-10 items-center w-full justify-between">
      <section className="flex items-start justify-between w-full relative">
        <div className="w-1/3  flex items-center gap-10 ">
          <span className="lg:text-3xl 2xl:text-6xl text-right">
            {t("title")}
          </span>
        </div>
        <h4 className="underline lg:text-s 2xl:text-m -rotate-90 top-[32%] left-[40%] absolute">
          {t("chromatic-title")}
        </h4>
        <section className="lowercase text-m w-1/2 items-end relative flex flex-col-reverse gap-5">
          <span className="text-xs font-thin lg:w-1/2 2xl:w-1/4 text-right self-start tracking-wider leading-5">
            {t("chromatic-text")}
          </span>
          <div className="relative w-2/3 lg:h-[120px] 2xl:h-[300px]">
            <Image
              src="/images/essence/essence-diagram.png"
              alt="Diagrama de esencia"
              layout="fill"
              className="
            object-contain"
            />
          </div>
        </section>
      </section>
      <section className="w-full flex items-end">
        <Table />
        <div className="flex flex-col gap-2 w-1/5 items-end pb-20">
          <span className="text-xs font-thin tracking-wider text-right leading-5">
            {t("symbology-text")}
          </span>
          <span className="text-sm font-ppModelLine">
            {t("symbology-title")}
          </span>
        </div>
      </section>
    </section>
  );
};

export default EssenceChromatic;
