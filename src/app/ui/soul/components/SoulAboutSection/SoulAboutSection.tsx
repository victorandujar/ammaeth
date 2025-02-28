import KeywordCarousel from "@/app/ui/shared/components/KeywordsCarousel/KeywordCarousel";
import keywords from "@/app/ui/shared/components/KeywordsCarousel/utils/keywords";
import LineText from "@/app/ui/shared/components/LineText/LineText";
import colors from "@/app/ui/shared/utils/colors";
import Image from "next/image";
import Planet from "../PlanetScene/PlanetScene";

const SoulAboutSection: React.FC = () => {
  return (
    <section className="flex justify-between w-full h-full">
      <article className="w-[31%] flex flex-col items-end gap-5 font-thin">
        <section className="bg-gradient-to-b from-transparent to-white/20 backdrop-blur-md rounded-br-lg rounded-bl-lg shadow-2xl shadow-zinc-950 h-[700px] w-full">
          <Planet />
        </section>
        <span className="text-s text-right w-3/4">
          Apasionado del crecimiento personal y de crear desde el alma, veo el
          diseño,y la tecnología como caminos para conectar lo tangible con lo
          invisible. Más allá del código, mi trabajo es dar forma a ideas con
          significado, traduciendo lo abstracto en experiencias que resuenen.
          Exploro el branding y la conceptualización como un tejido vivo, donde
          cada proyecto es un reflejo de propósito y visión.
        </span>
      </article>
      <div className="overflow-hidden">
        <KeywordCarousel keywords={keywords} />
      </div>
      <section className="w-1/3 relative flex flex-col gap-10 font-thin">
        <span>front end developer & ux/ui</span>
        <div className="w-4/5">
          <span className="text-l">
            Apasionado del crecimiento personal y de crear desde el alma, veo el
            diseño,y la tecnología como caminos para conectar lo tangible con lo
            invisible. Más allá del código, mi trabajo es dar forma a ideas con
            significado, traduciendo lo abstracto en experiencias que resuenen.
            Exploro el branding y la conceptualización como un tejido vivo,
            donde cada proyecto es un reflejo de propósito y visión.
          </span>
        </div>
        <div className="absolute -bottom-10 -z-10 flex flex-col items-end gap-10 w-full">
          <Image
            src={"/images/profile/viclindo.jpg"}
            alt="Profile picture"
            width={450}
            height={300}
            className="object-contain rounded-lg"
          />
          <div className="flex justify-between gap-14 text-ms">
            <span className="inline-block text-white/50">
              {"murcia andújar víctor".split("").reverse().join("")}
            </span>
            <span>murcia andújar víctor</span>
          </div>
          <div className="self-start">
            <LineText text="self" color={colors.tertiary} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default SoulAboutSection;
