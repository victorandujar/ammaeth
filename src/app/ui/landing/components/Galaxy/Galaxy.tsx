"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

interface NebulaData {
  positions: Float32Array;
  sizes: Float32Array;
  colors: Float32Array;
}

function generateGalaxy(
  count = 80000,
  arms = 10,
  radius = 70,
  spinFactor = 20,
  randomness = 1,
  depth = 10,
): GalaxyData {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const colorCore = new THREE.Color("#fff1e0");
  const colorEdge = new THREE.Color("#4973a8");

  Array.from({ length: count }, (_, i) => {
    const armAngle = ((i % arms) / arms) * Math.PI * 2;
    const distance = Math.pow(Math.random(), 0.5) * radius;
    const spinAngle = distance * spinFactor;
    const randomOffset = randomness * (Math.random() - 0.5) * 3;

    const x = Math.cos(armAngle + spinAngle) * distance + randomOffset;
    const y = (Math.random() - 0.5) * 30 * (1 - distance / radius);
    const z =
      Math.sin(armAngle + spinAngle) * distance +
      randomOffset * 0.2 +
      (Math.random() - 0.5) * depth;

    positions.set([x, y, z], i * 3);

    const mixedColor = colorCore.clone().lerp(colorEdge, distance / radius);
    colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);

    sizes[i] = Math.random() * 0.25 + 0.1;
  });

  return { positions, colors, sizes };
}

function generateNebula(count = 6000, radius = 60): NebulaData {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const colorCenter = new THREE.Color("#1c1c1c");
  const colorMid = new THREE.Color("#00d9ff");
  const colorEdge = new THREE.Color("#ffde59");

  Array.from({ length: count }, (_, i) => {
    const distance = Math.pow(Math.random(), 1.5) * radius;
    const angle = Math.random() * Math.PI * 2;
    const elevation = (Math.random() - 0.5) * 10;

    const x = Math.cos(angle) * distance * (Math.random() * 0.4 + 0.8);
    const y = elevation * (1 - distance / radius);
    const z = Math.sin(angle) * distance * (Math.random() * 0.4 + 0.8);

    positions.set([x, y, z], i * 3);

    const t = distance / radius;
    const color = colorCenter
      .clone()
      .lerp(colorMid, Math.pow(t, 0.5))
      .lerp(colorEdge, Math.pow(t, 1.2));
    colors.set([color.r, color.g, color.b], i * 3);

    sizes[i] = Math.random() * 4 + 1.5;
  });

  return { positions, sizes, colors };
}

const Galaxy: React.FC = () => {
  const galaxyRef = useRef<THREE.Points>(null!);
  const nebulaRef = useRef<THREE.Points>(null!);

  const starTexture = useLoader(THREE.TextureLoader, "/star_sprite.png");
  const nebulosaTexture = useLoader(
    THREE.TextureLoader,
    "/nebulosa_texture_improved.png",
  );

  const { positions, colors, sizes } = useMemo(() => generateGalaxy(), []);
  const {
    positions: nebulaPositions,
    sizes: nebulaSizes,
    colors: nebulaColors,
  } = useMemo(() => generateNebula(), []);

  const galaxyGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  const nebulaGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(nebulaSizes, 1));
    return geo;
  }, [nebulaPositions, nebulaColors, nebulaSizes]);

  useFrame((_, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.03;
      galaxyRef.current.rotation.x = THREE.MathUtils.degToRad(15);
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.001;
      nebulaRef.current.rotation.x = THREE.MathUtils.degToRad(15);
      nebulaRef.current.position.y = 2;
    }
  });

  return (
    <>
      <points ref={nebulaRef} geometry={nebulaGeometry}>
        <pointsMaterial
          map={nebulosaTexture}
          size={5}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={galaxyRef} geometry={galaxyGeometry}>
        <pointsMaterial
          map={starTexture}
          size={0.35}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default Galaxy;
