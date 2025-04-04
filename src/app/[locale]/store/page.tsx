"use client";

import products from "../../ui/store/utils/products.json";
import { useAppDispatch } from "@/app/store/hooks";
import { setHeaderTextActionCreator } from "@/app/store/features/ui/uiSlice";
import { useEffect, useRef, useState, useCallback } from "react";
import StoreCard from "../../ui/store/components/StoreCard/StoreCard";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const MeteoriteScene = dynamic(
  () => import("@/app/ui/shared/components/Meteorite/Meteorite"),
  {
    ssr: false,
    loading: () => <div className="h-10 w-10 bg-gray-800 rounded-full" />,
  },
);

const NebulaScene = dynamic(
  () => import("@/app/ui/shared/components/Nebula/Nebula"),
  {
    ssr: false,
    loading: () => <div className="h-10 w-10 bg-gray-800 rounded-full" />,
  },
);

const Store: React.FC = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicHeight, setDynamicHeight] = useState("100vh");
  const [maxScrollX, setMaxScrollX] = useState(0);

  const calculateDimensions = useCallback(() => {
    if (contentRef.current && containerRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      const heightRatio = contentWidth / containerWidth;

      setDynamicHeight(`${Math.max(100, heightRatio * 100)}vh`);
      setMaxScrollX(contentWidth - containerWidth);
    }
  }, []);

  useEffect(() => {
    calculateDimensions();
    const resizeObserver = new ResizeObserver(calculateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [calculateDimensions]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    dispatch(setHeaderTextActionCreator("store"));
  }, [dispatch]);

  return (
    <main
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-background"
      style={{ height: dynamicHeight }}
    >
      <section className="fixed top-20 z-[50] flex w-4/5 items-end justify-between bg-background/80 px-5 py-10 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <h2 className="text-7xl">STORAGE</h2>
          <span className="text-l">(0{products.length})</span>
        </div>
        <div className="flex items-center isolate">
          <span className="text-s font-thin">may the code be with you...</span>
          <div className="h-10 w-10 relative z-[1001]">
            <MeteoriteScene />
          </div>
        </div>
      </section>

      <div className="fixed top-64 z-[999] h-1 bg-gray-800 mx-auto w-4/5 left-1/2 -translate-x-1/2">
        <motion.div
          className="h-full bg-gradient-to-r from-tertiary via-secondary to-primary"
          style={{ width: progress }}
        />
      </div>

      <motion.div
        ref={contentRef}
        className="fixed left-0 top-1/3 flex -translate-y-1/2 gap-6 px-5 z-[100]"
        style={{ x }}
      >
        {products.map((product, index) => (
          <StoreCard product={product} key={index} />
        ))}
      </motion.div>

      <div
        className="fixed left-0 w-full z-[0]"
        style={{
          top: "calc(33.33% + 50px)",
          height: "100vh",
        }}
      >
        <NebulaScene />
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
};

export default Store;
