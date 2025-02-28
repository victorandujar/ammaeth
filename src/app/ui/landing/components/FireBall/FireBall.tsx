import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

// Vertex Shader: Pass UVs and position to fragment shader
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader: Add texture and gaseous effect
const fragmentShader = `
precision highp float;
uniform float time;
uniform sampler2D gasTexture; // Texture for gaseous effect
varying vec2 vUv;
varying vec3 vPosition;

float noise(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
}

void main() {
  vec3 pos = vPosition * 2.0;
  float n = noise(pos + vec3(time * 0.5)); // Slow swirling noise
  
  // Sample the texture with animated UVs for a swirling effect
  vec2 animatedUv = vUv + vec2(sin(time * 0.2), cos(time * 0.2)) * 0.1;
  vec4 texColor = texture2D(gasTexture, animatedUv);
  
  // Define gaseous colors
  vec3 coreColor = vec3(0.8, 0.6, 1.0); // Soft purple-blue for gas core
  vec3 outerColor = vec3(0.4, 0.2, 0.8); // Darker purple for outer gas
  
  // Mix colors with texture and noise for a turbulent gas look
  float gradient = smoothstep(0.0, 1.0, length(vUv - 0.5));
  vec3 baseColor = mix(coreColor, outerColor, gradient);
  vec3 finalColor = mix(baseColor, texColor.rgb, n * 0.5 + texColor.r * 0.5);
  
  // Add a soft glow and transparency for gaseous feel
  float alpha = clamp(1.0 - gradient * 1.5 + n * 0.3, 0.0, 1.0);
  gl_FragColor = vec4(finalColor * (1.2 + sin(time * 1.5) * 0.2), alpha);
}
`;

const Fireball = ({
  position,
  scale,
}: {
  position: number[];
  scale: number[];
}) => {
  const fireballRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    uniforms.time.value = clock.getElapsedTime();
    if (fireballRef.current) {
      fireballRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={fireballRef}
      position={position as [number, number, number]}
      scale={scale as [number, number, number]}
    >
      <sphereGeometry args={[0.2, 64, 64]} /> {/* Keeping your small size */}
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default Fireball;
