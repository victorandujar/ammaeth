"use client";

import SoulAboutSection from "@/app/ui/soul/components/SoulAboutSection/SoulAboutSection";

const SoulPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center gap-48 h-screen relative z-10 p-10 pt-20">
      <SoulAboutSection />
      <span className="text-7xl w-2/3 text-center">
        flujo digital: donde diseño, código y optimización convergen
      </span>
    </main>
  );
};

export default SoulPage;
