import { FaRegCopyright } from "react-icons/fa";
import GalaxyScene from "../modules/landing/application/components/GalaxyScene/GalaxyScene";
import LineText from "../modules/shared/components/LineText/LineText";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <section className="border-white/30 border-[0.5px] h-[90%] w-[90%] sm:h-[85%] sm:w-[85%] md:h-[80%] md:w-[80%] rounded-3xl bg-gradient-to-b from-background to-white/20 relative shadow-inner-lg overflow-hidden">
        <div className="pt-4 px-4 sm:pt-6 sm:px-6 md:pt-10 md:px-10 w-full flex justify-between absolute font-thin z-10">
          <span className="text-2xl sm:text-3xl md:text-4xl font-light">
            ammaëth
          </span>
          <button className="uppercase text-sm sm:text-base md:text-base">
            options
          </button>
        </div>
        <div className="absolute bottom-[22%] -left-[37%] sm:bottom-[20%] sm:-left-[10%] md:bottom-[25%] md:-left-[10%] lg:-left-[7%] -rotate-90">
          <LineText text="resonancia" />
        </div>
        <div className="absolute top-[30%] -right-32 sm:top-[25%] sm:-right-[10%] md:top-[30%] md:-right-[10%] lg:-right-[7%] rotate-90">
          <LineText text="presencia" />
        </div>
        <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 md:bottom-5 md:right-10 flex items-center gap-2 text-sm sm:text-base md:text-base">
          <FaRegCopyright />
          2025
        </span>
        <GalaxyScene />
      </section>
    </main>
  );
}
