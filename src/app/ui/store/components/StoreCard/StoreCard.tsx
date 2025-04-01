"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Placeholder mejorado para HoloCart
const HoloCartPlaceholder = () => (
  <div className="h-10 w-10 relative flex items-center justify-center">
    <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse" />
    <div className="relative z-10 h-6 w-6 bg-cyan-500/20 rounded-full" />
  </div>
);

// Carga diferida con manejo de estado persistente
const DynamicHoloCart = dynamic(
  () => import("@/app/ui/shared/components/HoloCart/HoloCart"),
  {
    ssr: false,
    loading: () => <HoloCartPlaceholder />,
  },
);

const StoreCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Configuración optimizada del IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setShouldRender3D(isVisible);
        if (isVisible) setHasBeenVisible(true);
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 100px 0px",
      },
    );

    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Motion values para efectos 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);

  // Configuración de spring
  const springConfig = { stiffness: 100, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const zSpring = useSpring(z, springConfig);

  // Manejo de hover
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (mouseY - centerY) / centerY;
    const tiltY = (centerX - mouseX) / centerX;

    x.set((mouseX - centerX) * 0.05);
    y.set((mouseY - centerY) * 0.05);
    rotateX.set(tiltX * 15);
    rotateY.set(tiltY * 15);
    z.set(Math.abs(tiltX) * 20 + Math.abs(tiltY) * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  };

  // Efectos 3D al hacer hover
  const getSideAndShadow = () => {
    const rx = rotateXSpring.get();
    const ry = rotateYSpring.get();

    const isHovered = Math.abs(rx) > 0.1 || Math.abs(ry) > 0.1;

    const thickness = 48;
    const sideStyle = {
      position: "absolute",
      transformOrigin: "top",
      boxShadow: "0 4px 6px rgba(165, 165, 165, 0.3)",
      pointerEvents: "none",
      zIndex: -1,
      ...(Math.abs(rx) > Math.abs(ry)
        ? rx > 0
          ? {
              top: 0,
              left: 0,
              width: "100%",
              height: `${thickness}px`,
              transform: `translateZ(-${thickness / 2}px) rotateX(-90deg)`,
              background:
                "linear-gradient(to bottom, rgba(75, 85, 99, 0.8), rgba(55, 65, 79, 0.6))",
            }
          : {
              bottom: 0,
              left: 0,
              width: "100%",
              height: `${thickness}px`,
              transform: `translateZ(-${thickness / 2}px) rotateX(90deg)`,
              background:
                "linear-gradient(to top, rgba(75, 85, 99, 0.8), rgba(55, 65, 79, 0.6))",
            }
        : ry > 0
          ? {
              top: 0,
              left: 0,
              width: `${thickness}px`,
              height: "100%",
              transform: `translateZ(-${thickness / 2}px) rotateY(90deg)`,
              background:
                "linear-gradient(to right, rgba(75, 85, 99, 0.8), rgba(55, 65, 79, 0.6))",
            }
          : {
              top: 0,
              right: 0,
              width: `${thickness}px`,
              height: "100%",
              transform: `translateZ(-${thickness / 2}px) rotateY(-90deg)`,
              background:
                "linear-gradient(to left, rgba(75, 85, 99, 0.8), rgba(55, 65, 79, 0.6))",
            }),
    };

    return { sideStyle, isHovered };
  };

  const { sideStyle, isHovered } = getSideAndShadow();

  return (
    <motion.article
      ref={cardRef}
      className="flex flex-col w-[500px] bg-gradient-to-b from-transparent to-storeCard/40 backdrop-blur-sm rounded-lg text-s relative overflow-visible shadow-inner"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        z: zSpring,
        perspective: 1000,
        transformStyle: "preserve-3d",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-24 h-40 border-t border-l border-gray-500 rounded-tl-lg pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute bottom-0 right-0 w-40 h-24 border-b border-r border-gray-500 rounded-br-lg pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {isHovered && (
        <motion.div
          style={sideStyle as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}

      <div className="relative w-full">
        <Image
          src="/images/store-example.jpg"
          alt="store"
          width={400}
          height={200}
          className="w-full h-80 object-fill rounded-tr-lg rounded-tl-lg"
          priority={shouldRender3D}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/50 rounded-tl-lg rounded-tr-lg"></div>
      </div>

      <section className="flex flex-col gap-2 items-start justify-between w-full p-4 font-thin border-b border-black text-black tracking-widest text-s">
        <div className="flex w-full justify-between text-white">
          <section className="w-2/3 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            tempora tenetur, porro incidunt nihil alias quia, pariatur deserunt,
            aperiam laborum veniam voluptas minima voluptates sapiente
            temporibus atque ipsum praesentium consectetur.
          </section>
          <ul className="flex flex-col gap-2 text-xs">
            <li>3 pages</li>
            <li>20 components</li>
            <li>1 font installed</li>
            <li>search funtionality</li>
            <li>router functional</li>
            <li>dynamic tables</li>
            <li>pagination</li>
            <li>modularized</li>
          </ul>
        </div>
        <ul className="flex gap-2 text-white text-xs font-thin w-full">
          <li className="bg-gray-800/80 p-0.5 px-2 rounded-full">react</li>
          <li className="bg-gray-800/80 p-0.5 px-2 rounded-full">next.js</li>
          <li className="bg-gray-800/80 p-0.5 px-2 rounded-full">
            tailwind.css
          </li>
          <li className="bg-gray-800/80 p-0.5 px-2 rounded-full">typescript</li>
        </ul>
      </section>

      <section className="flex justify-between w-full text-black">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-xs">01</span>
            <span className="text-ml tracking-widest">dashboard template</span>
          </div>
        </div>

        <button className="self-end text-m font-bold w-32 bg-background flex h-16 items-start justify-center rounded-br-lg relative overflow-hidden">
          <div className="opacity-80 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent w-full h-full pt-4 flex">
            <span
              className="ml-2 font-medium text-cyan-400 tracking-widest 
              [text-shadow:_0_0_8px_rgba(34,211,238,0.8)] 
              px-2 rounded h-full mt-1"
            >
              20€
            </span>

            {hasBeenVisible ? (
              shouldRender3D ? (
                <DynamicHoloCart key={`holo-${Date.now()}`} />
              ) : (
                <HoloCartPlaceholder />
              )
            ) : (
              <HoloCartPlaceholder />
            )}
          </div>
        </button>
      </section>
    </motion.article>
  );
};

export default StoreCard;
