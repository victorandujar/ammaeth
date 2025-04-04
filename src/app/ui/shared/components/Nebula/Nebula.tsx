"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const Nebula: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 600,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, 600);

    const createParticleTexture = () => {
      const size = 32;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d")!;
      const gradient = context.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };

    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    Array.from({ length: particleCount }, (_, i) => {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 500;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const distance = Math.sqrt(x * x + y * y + z * z);
      const intensity = Math.min(4, 300 / (distance + 1));
      colors[i * 3] = 0.0588 * intensity;
      colors[i * 3 + 1] = 0.973 * intensity;
      colors[i * 3 + 2] = 0.722 * intensity;
      sizes[i] = Math.random() * 8 + 4;
    });

    const particles = new THREE.BufferGeometry();
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    const smokeCount = 15000;
    const smokePositions = new Float32Array(smokeCount * 3);
    const smokeColors = new Float32Array(smokeCount * 3);
    const smokeSizes = new Float32Array(smokeCount);

    Array.from({ length: smokeCount }, (_, i) => {
      const x = (Math.random() - 0.5) * 800;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 600;
      smokePositions[i * 3] = x;
      smokePositions[i * 3 + 1] = y;
      smokePositions[i * 3 + 2] = z;

      const distance = Math.sqrt(x * x + y * y + z * z);
      const intensity = Math.min(1.5, 250 / (distance + 1));
      smokeColors[i * 3] = 0.0588 * intensity;
      smokeColors[i * 3 + 1] = 0.973 * intensity;
      smokeColors[i * 3 + 2] = 0.722 * intensity;
      smokeSizes[i] = Math.random() * 12 + 6;
    });

    const smokeParticles = new THREE.BufferGeometry();
    smokeParticles.setAttribute(
      "position",
      new THREE.BufferAttribute(smokePositions, 3),
    );
    smokeParticles.setAttribute(
      "color",
      new THREE.BufferAttribute(smokeColors, 3),
    );
    smokeParticles.setAttribute(
      "size",
      new THREE.BufferAttribute(smokeSizes, 1),
    );

    const smokeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
    });

    const smokeSystem = new THREE.Points(smokeParticles, smokeMaterial);
    scene.add(smokeSystem);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.0003;
      smokeSystem.rotation.y += 0.0002;

      Array.from({ length: particleCount }, (_, i) => {
        positions[i * 3 + 1] += Math.sin(Date.now() * 0.0005 + i) * 0.02;
        positions[i * 3] += Math.cos(Date.now() * 0.0003 + i) * 0.01;
      });
      particles.attributes.position.needsUpdate = true;

      Array.from({ length: smokeCount }, (_, i) => {
        smokePositions[i * 3 + 1] +=
          Math.sin(Date.now() * 0.0002 + i * 0.1) * 0.03;
        smokePositions[i * 3] +=
          Math.cos(Date.now() * 0.0001 + i * 0.2) * 0.015;
        smokePositions[i * 3 + 2] +=
          Math.sin(Date.now() * 0.00015 + i * 0.15) * 0.02;
      });
      smokeParticles.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 600);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};

export default Nebula;
