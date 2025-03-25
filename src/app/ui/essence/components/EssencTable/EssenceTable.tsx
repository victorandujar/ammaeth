import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Table = () => {
  const lineVariants = (direction: string) => ({
    hidden: {
      x: direction === "left" ? "-10%" : direction === "right" ? "10%" : 0,
      y: direction === "up" ? "-10%" : direction === "down" ? "10%" : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  });

  return (
    <div className="relative w-full h-[400px] overflow-visible flex justify-center">
      <div className="relative w-[80%] max-w-[1200px] h-[200px] text-white font-sans z-10 lg:text-xs 2xl:text-s tracking-wide">
        <div className="absolute w-1/2 lg:h-10 2xl:h-1/3 top-[28%] -left-[25%]">
          <div className="flex flex-col gap-1 items-end pt-5 pr-4">
            <div className="flex items-start gap-4 font-light">
              <div className=" flex flex-col items-end gap-2">
                <span className="text-right lg:w-4/5">
                  la convergencia entre el pensamiento lógico, la intuición, y
                  lo simbólico
                </span>
                <span className="italic">soul</span>
              </div>
              <Image
                src="/images/essence/hexagram.png"
                alt="Soul"
                className="object-contain "
                width={50}
                height={25}
              />
            </div>
            <span className=" font-ppValve">el hexagrama luminar</span>
          </div>
        </div>

        <div className="absolute w-[40%] h-1/3 top-[73%] left-[23.5%]">
          <div className="flex flex-col gap-2 items-end pt-5 pr-4">
            <div className="flex items-start gap-4 font-light">
              <div className=" flex flex-col items-end gap-2">
                <span>
                  es la danza del éter, el flujo entre lo intangible y lo
                  tangible
                </span>
                <span className="italic">essence</span>
              </div>
              <Image
                src="/images/essence/ether.png"
                alt="Essence"
                className="object-contain"
                width={25}
                height={25}
              />
            </div>
            <span className=" font-ppValve">la espiral del éter</span>
          </div>
        </div>

        <div className="absolute w-1/3 h-1/3 top-[117%] left-[69%]">
          <div className="flex flex-col gap-2 items-end pt-5 pr-4">
            <div className="flex items-start gap-4 font-light">
              <div className=" flex flex-col items-end gap-2">
                <span>expansión, visión, creación desde la conciencia</span>
                <span className="italic">self</span>
              </div>
              <Image
                src="/images/essence/luminar.png"
                alt="Self"
                className="object-contain"
                width={50}
                height={25}
              />
            </div>
            <span className=" font-ppValve">el círculo luminal</span>
          </div>
        </div>
      </div>

      {/* SVG de líneas */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 -25 110 150"
        preserveAspectRatio="none"
      >
        {/* Línea izquierda extendida */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="110"
          stroke="white"
          strokeWidth="0.07"
          variants={lineVariants("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />

        {/* Línea derecha con flecha */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="-10"
          stroke="white"
          strokeWidth="0.05"
          variants={lineVariants("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          markerEnd="url(#arrowhead)"
        />

        <defs>
          <marker
            id="arrowhead"
            markerWidth="5"
            markerHeight="5"
            refX="2.5"
            refY="5"
            orient="auto"
          >
            <path
              d="M 0 5 L 2.5 0 L 5 5"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </marker>
        </defs>

        {/* Líneas horizontales */}
        {[0, 33.33, 66.66, 100].map((y, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="white"
            strokeWidth="0.3"
            variants={lineVariants(i % 2 === 0 ? "left" : "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        ))}

        {/* Líneas verticales intermedias */}
        <motion.line
          x1="33.33"
          y1="0"
          x2="33.33"
          y2="33.33"
          stroke="white"
          strokeWidth="0.05"
          variants={lineVariants("down")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />
        <motion.line
          x1="33.33"
          y1="33.33"
          x2="33.33"
          y2="66.66"
          stroke="white"
          strokeWidth="0.05"
          variants={lineVariants("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />
        <motion.line
          x1="66.66"
          y1="33.33"
          x2="66.66"
          y2="66.66"
          stroke="white"
          strokeWidth="0.05"
          variants={lineVariants("down")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />
        <motion.line
          x1="66.66"
          y1="66.66"
          x2="66.66"
          y2="100"
          stroke="white"
          strokeWidth="0.05"
          variants={lineVariants("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />
      </svg>
    </div>
  );
};

export default Table;
