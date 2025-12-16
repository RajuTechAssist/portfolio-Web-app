import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Stars, 
  Sparkles, 
  MeshDistortMaterial, 
  Sphere, 
  Torus, 
  Environment, 
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * The Neural Core: A morphing sphere representing active intelligence/code
 */
function NeuralCore() {
  const coreRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      // Rotate the core slowly
      coreRef.current.rotation.y = t * 0.1;
      coreRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <Sphere args={[1, 64, 64]} ref={coreRef}>
        <MeshDistortMaterial 
          color="#06b6d4" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.1} 
          distort={0.4} 
          speed={2} 
        />
      </Sphere>
      
      {/* Outer Wireframe Shield */}
      <Sphere args={[1.2, 32, 32]} rotation={[0.5, 0.5, 0]}>
        <meshBasicMaterial 
          color="#a855f7" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </Sphere>
    </group>
  );
}

/**
 * Data Rings: Representing orbits of knowledge or tech stack layers
 */
function DataRings() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotate entire ring system
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 - Cyan */}
      <group rotation={[1, 0.5, 0]}>
        <Torus args={[2.2, 0.02, 16, 100]}>
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </Torus>
      </group>

      {/* Ring 2 - Purple */}
      <group rotation={[2, 2, 0]}>
        <Torus args={[2.8, 0.02, 16, 100]}>
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7" 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </Torus>
      </group>

      {/* Ring 3 - White/Subtle */}
      <group rotation={[0.5, 2.5, 0]}>
        <Torus args={[3.5, 0.01, 16, 100]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={1} 
            transparent 
            opacity={0.5}
          />
        </Torus>
      </group>
    </group>
  );
}

/**
 * Floating Particles: Background ambiance
 */
function BackgroundAmbience() {
  return (
    <>
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Sparkles 
        count={200} 
        scale={8} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#06b6d4" 
      />
      <Sparkles 
        count={100} 
        scale={10} 
        size={6} 
        speed={0.2} 
        opacity={0.5} 
        color="#a855f7" 
      />
    </>
  );
}

/**
 * Main Abstract Scene Component
 */
export default function AbstractHeroScene() {
  return (
    <Canvas
      className="abstract-scene-canvas"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent', // Let the CSS gradient show through
      }}
      gl={{ 
        antialias: false, 
        powerPreference: "high-performance",
        alpha: true 
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
      
      {/* Interactive Controls (Optional - allows user to rotate the orb) */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      {/* Main Elements */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <NeuralCore />
      </Float>
      
      <DataRings />
      <BackgroundAmbience />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Post Processing for the "Glow" effect */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.6}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}