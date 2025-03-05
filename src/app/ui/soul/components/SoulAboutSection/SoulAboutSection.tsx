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
          Me mueven la innovación y la armonía, el equilibrio entre
          funcionalidad y emoción. Trabajo desde la conexión con mi esencia
          creadora, buscando no solo construir, sino transformar, aportar valor
          y dar significado a cada detalle.
        </span>
      </article>
      <div className="overflow-hidden">
        <KeywordCarousel keywords={keywords} />
      </div>
      <section className="w-1/3 relative flex flex-col gap-10 font-thin">
        <span className="font-ppModelPlastic">front end developer & ux/ui</span>
        <div className="w-4/5">
          <span className="text-l">
            Apasionado del crecimiento personal y de la creación desde el alma,
            encuentro en la tecnología y el diseño un espacio para traducir lo
            invisible en experiencias significativas. Mi enfoque va más allá de
            lo técnico. Me impulsa la curiosidad por comprender, por ir más
            profundo, por explorar nuevas formas de expresión que trasciendan lo
            convencional. Cada proyecto es un reflejo de exploración y
            propósito, un desafío donde fusiono creatividad, lógica e intuición
            para dar vida a soluciones que resuenen.
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
