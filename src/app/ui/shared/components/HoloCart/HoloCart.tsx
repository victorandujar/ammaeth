"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const HoloCart = () => {
  const cartGroupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const wheel1Ref = useRef<THREE.Mesh>(null!);
  const wheel2Ref = useRef<THREE.Mesh>(null!);
  const wheel3Ref = useRef<THREE.Mesh>(null!);
  const wheel4Ref = useRef<THREE.Mesh>(null!);
  const handleGroupRef = useRef<THREE.Group>(null!);
  const handleBar1Ref = useRef<THREE.Mesh>(null!);
  const handleBar2Ref = useRef<THREE.Mesh>(null!);
  const handleBar3Ref = useRef<THREE.Mesh>(null!);
  const supportBar1Ref = useRef<THREE.Mesh>(null!);
  const supportBar2Ref = useRef<THREE.Mesh>(null!);

  const bodyVertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;

    void main() {
      vNormal = normal;
      vPosition = position;

      // Pulso holográfico sutil
      vec3 pos = position;
      float pulse = sin(time * 2.0) * 0.01;
      pos += normal * pulse;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const bodyFragmentShader = `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 baseColor = vec3(0.1, 0.7, 1.0); // Cian futurista
      float glow = sin(time * 2.0) * 0.3 + 0.7; // Pulso de brillo
      float edgeGlow = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0); // Bordes brillantes

      vec3 color = baseColor * (glow + edgeGlow * 0.5);
      float alpha = clamp(glow * 0.3 + edgeGlow * 0.2, 0.0, 0.5); // Opacidad ajustada para más solidez

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const wheelVertexShader = `
    varying vec3 vNormal;
    uniform float time;

    void main() {
      vNormal = normal;
      vec3 pos = position;
      float pulse = sin(time * 3.0) * 0.02; // Pulso más rápido para ruedas
      pos += normal * pulse;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const wheelFragmentShader = `
    uniform float time;
    varying vec3 vNormal;

    void main() {
      vec3 wheelColor = vec3(0.2, 0.8, 1.0); // Cian brillante
      float glow = sin(time * 4.0) * 0.4 + 0.6; // Efecto pulsante
      float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);

      vec3 color = wheelColor * (glow + intensity * 0.5);
      float alpha = glow * 0.7; // Ruedas un poco más sólidas

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const handleVertexShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.y += sin(time + uv.x * 5.0) * 0.02; // Ondulación holográfica
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const handleFragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec3 handleColor = vec3(0.2, 0.8, 1.0); // Cian
      float glow = sin(time * 2.0 + vUv.x * 8.0) * 0.3 + 0.7; // Efecto de escaneo
      vec3 color = handleColor * glow;
      float alpha = glow * 0.9;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const shape = new THREE.Shape();
  shape.moveTo(-0.25, -0.15);
  shape.quadraticCurveTo(-0.3, 0.05, -0.35, 0.35);
  shape.quadraticCurveTo(0, 0.45, 0.35, 0.35);
  shape.quadraticCurveTo(0.3, 0.05, 0.25, -0.15);
  shape.quadraticCurveTo(0, -0.2, -0.25, -0.15);

  const extrudeSettings = {
    depth: 0.9,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 8,
  };

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (cartGroupRef.current) {
      cartGroupRef.current.rotation.y += 0.01;
    }

    if (bodyRef.current) {
      (bodyRef.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (wheel1Ref.current) {
      wheel1Ref.current.rotation.x += 0.05;
      (wheel1Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (wheel2Ref.current) {
      wheel2Ref.current.rotation.x += 0.05;
      (wheel2Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (wheel3Ref.current) {
      wheel3Ref.current.rotation.x += 0.05;
      (wheel3Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (wheel4Ref.current) {
      wheel4Ref.current.rotation.x += 0.05;
      (wheel4Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (handleBar1Ref.current) {
      (
        handleBar1Ref.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
    if (handleBar2Ref.current) {
      (
        handleBar2Ref.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
    if (handleBar3Ref.current) {
      (
        handleBar3Ref.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
    if (supportBar1Ref.current) {
      (
        supportBar1Ref.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
    if (supportBar2Ref.current) {
      (
        supportBar2Ref.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }
  });

  return (
    <>
      <group ref={cartGroupRef}>
        <mesh ref={bodyRef} position={[0, 0.25, -0.15]} rotation={[0, 0, 0]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <shaderMaterial
            vertexShader={bodyVertexShader}
            fragmentShader={bodyFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={wheel1Ref} position={[-0.25, -0.2, 0.3]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <shaderMaterial
            vertexShader={wheelVertexShader}
            fragmentShader={wheelFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>

        <mesh ref={wheel2Ref} position={[0.25, -0.2, 0.3]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <shaderMaterial
            vertexShader={wheelVertexShader}
            fragmentShader={wheelFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>

        <mesh ref={wheel3Ref} position={[-0.25, -0.2, -0.6]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <shaderMaterial
            vertexShader={wheelVertexShader}
            fragmentShader={wheelFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>

        <mesh ref={wheel4Ref} position={[0.25, -0.2, -0.6]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <shaderMaterial
            vertexShader={wheelVertexShader}
            fragmentShader={wheelFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>

        <group ref={handleGroupRef} position={[0, 0, -0.15]}>
          <mesh ref={handleBar1Ref} position={[-0.25, 0.45, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />
            <shaderMaterial
              vertexShader={handleVertexShader}
              fragmentShader={handleFragmentShader}
              uniforms={{ time: { value: 0 } }}
              transparent
            />
          </mesh>
          <mesh ref={handleBar2Ref} position={[0.25, 0.45, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />
            <shaderMaterial
              vertexShader={handleVertexShader}
              fragmentShader={handleFragmentShader}
              uniforms={{ time: { value: 0 } }}
              transparent
            />
          </mesh>
          <mesh
            ref={handleBar3Ref}
            position={[0, 0.7, -0.3]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />{" "}
            <shaderMaterial
              vertexShader={handleVertexShader}
              fragmentShader={handleFragmentShader}
              uniforms={{ time: { value: 0 } }}
              transparent
            />
          </mesh>

          <mesh
            ref={supportBar1Ref}
            position={[-0.3, 0.35, -0.15]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />{" "}
            <shaderMaterial
              vertexShader={handleVertexShader}
              fragmentShader={handleFragmentShader}
              uniforms={{ time: { value: 0 } }}
              transparent
            />
          </mesh>

          <mesh
            ref={supportBar2Ref}
            position={[0.3, 0.35, -0.15]}
            rotation={[0, -Math.PI / 4, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />{" "}
            <shaderMaterial
              vertexShader={handleVertexShader}
              fragmentShader={handleFragmentShader}
              uniforms={{ time: { value: 0 } }}
              transparent
            />
          </mesh>
        </group>

        <mesh position={[0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 16]} />{" "}
          <shaderMaterial
            vertexShader={handleVertexShader}
            fragmentShader={handleFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>
        <mesh position={[0, 0.3, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 16]} />{" "}
          <shaderMaterial
            vertexShader={handleVertexShader}
            fragmentShader={handleFragmentShader}
            uniforms={{ time: { value: 0 } }}
            transparent
          />
        </mesh>
      </group>
    </>
  );
};

const HoloCartScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 30 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <HoloCart />
    </Canvas>
  );
};

export default HoloCartScene;
