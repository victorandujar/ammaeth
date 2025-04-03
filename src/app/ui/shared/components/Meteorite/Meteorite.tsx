"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Meteorite = () => {
  const meteoriteRef = useRef<THREE.Mesh>(null!);

  // Custom geometry with rocky deformation
  const createRockyGeometry = () => {
    const baseGeometry = new THREE.IcosahedronGeometry(0.8, 4);
    const positions = baseGeometry.attributes.position.array;

    const noise = (x: number, y: number, z: number) => {
      return (
        Math.sin(x * 5) * Math.cos(y * 5) * Math.sin(z * 5) * 0.2 +
        Math.sin(x * 2 + y * 3) * 0.15
      );
    };

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const length = Math.sqrt(x * x + y * y + z * z);
      const deformity = noise(x, y, z);
      positions[i] += (x / length) * deformity;
      positions[i + 1] += (y / length) * deformity;
      positions[i + 2] += (z / length) * deformity;
    }

    baseGeometry.attributes.position.needsUpdate = true;
    baseGeometry.computeVertexNormals();
    return baseGeometry;
  };

  // Vertex shader
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float time;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;

      vec3 pos = position;
      pos += normal * sin(time * 0.5 + position.x * 2.0) * 0.005;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader with gold, brown, and green tones
  const fragmentShader = `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(noise(i + vec2(0.0, 0.0)), noise(i + vec2(1.0, 0.0)), u.x),
        mix(noise(i + vec2(0.0, 1.0)), noise(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      for (int i = 0; i < 6; ++i) {
        v += a * smoothNoise(p);
        p = p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      // Color palette: gold, brown, green
      vec3 gold = vec3(0.8, 0.65, 0.2);    // Golden hue
      vec3 brown = vec3(0.45, 0.3, 0.15);  // Earthy brown
      vec3 green = vec3(0.2, 0.5, 0.3);    // Mossy green
      vec3 glowColor = vec3(0.9, 0.7, 0.3); // Warm golden glow

      // Noise for texture and color variation
      float n = fbm(vUv * 6.0 + time * 0.02);
      float roughness = mix(0.5, 1.0, n);
      float craters = smoothstep(0.6, 0.8, n) * 0.3;

      // Blend colors based on noise
      vec3 baseColor = mix(brown, gold, smoothstep(0.2, 0.7, n)); // Brown to gold
      baseColor = mix(baseColor, green, smoothstep(0.5, 0.9, n) * 0.4); // Add green patches

      // Lighting with shadows
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, lightDir), 0.0);
      float ambient = 0.1;
      float shadowFactor = smoothstep(-0.2, 0.4, dot(vNormal, lightDir));

      // Subtle glow
      float edgeGlow = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1))), 3.0) * 0.25;
      float pulse = sin(time * 0.8) * 0.05 + 0.95;
      vec3 glow = glowColor * edgeGlow * pulse;

      vec3 color = baseColor * (diffuse * shadowFactor + ambient) * roughness - craters + glow;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meteoriteRef.current) {
      meteoriteRef.current.rotation.x += 0.004;
      meteoriteRef.current.rotation.y += 0.006;
      meteoriteRef.current.rotation.z += 0.002;

      (
        meteoriteRef.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
  });

  return (
    <mesh ref={meteoriteRef}>
      <bufferGeometry attach="geometry" {...createRockyGeometry()} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
};

// Scene Wrapper
const MeteoriteScene = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 3], fov: 50 }}
    >
      <ambientLight intensity={0.08} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, -3, -3]} intensity={0.4} color={0xffcc66} />{" "}
      <Meteorite />
    </Canvas>
  );
};

export default MeteoriteScene;
