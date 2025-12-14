import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D Sphere with distortion effect
 */
function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#22D3EE"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

/**
 * Floating geometric shapes in the background
 */
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ],
      scale: Math.random() * 0.5 + 0.2,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      color: ['#22D3EE', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 3)],
    }));
  }, []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}

function FloatingShape({ position, scale, rotation, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(time + position[0]) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}

/**
 * Particles system for ambient effect
 */
function Particles({ count = 1000 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.x = time * 0.05;
      points.current.rotation.y = time * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22D3EE"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Main 3D Scene Component
 * Features: Animated sphere, floating shapes, particles, interactive camera
 */
export default function Scene3D({ enableInteraction = false }) {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 0,
      pointerEvents: enableInteraction ? 'auto' : 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        
        <AnimatedSphere />
        <FloatingShapes />
        <Particles count={500} />
        
        {enableInteraction && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}
