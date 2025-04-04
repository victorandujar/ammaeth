"use client";

import { Product } from "@/app/ui/shared/interfaces/sharedInterfaces";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface Props {
  product: Product;
}

const componentMap: Record<string, any> = {
  HoloSphere: dynamic(
    () => import("@/app/ui/shared/components/HoloSphere/HoloSphere"),
    {
      ssr: false,
      loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
    },
  ),
  MeteoriteScene: dynamic(
    () => import("@/app/ui/shared/components/Meteorite/Meteorite"),
    {
      ssr: false,
      loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
    },
  ),
  Nebula: dynamic(() => import("@/app/ui/shared/components/Nebula/Nebula"), {
    ssr: false,
    loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
  }),
  HoloAthom: dynamic(
    () => import("@/app/ui/shared/components/HoloAthom/HoloAthom"),
    {
      ssr: false,
      loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
    },
  ),
  HoloCart: dynamic(
    () => import("@/app/ui/shared/components/HoloCart/HoloCart"),
    {
      ssr: false,
      loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
    },
  ),
  GalaxyScene: dynamic(
    () => import("@/app/ui/landing/components/GalaxyScene/GalaxyScene"),
    {
      ssr: false,
      loading: () => <div className="h-10 w-10 bg-background rounded-full" />,
    },
  ),
};

const RenderVisual: React.FC<Props> = ({ product }) => {
  const hasImage = !!product.image;
  const hasComponent = !!product.component;

  const ComponentToRender = useMemo(() => {
    return hasComponent ? componentMap[product.component] : null;
  }, [hasComponent, product.component]);

  if (hasImage) {
    return (
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={200}
        className="w-full h-80 object-fill rounded-tr-lg rounded-tl-lg"
      />
    );
  }

  if (ComponentToRender) {
    return (
      <div className="relative w-full h-80  rounded-tr-lg rounded-tl-lg overflow-hidden">
        <ComponentToRender />
      </div>
    );
  }

  return null;
};

export default RenderVisual;
