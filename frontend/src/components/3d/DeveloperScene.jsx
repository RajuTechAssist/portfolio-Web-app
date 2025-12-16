import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment,
  Text,
  Sparkles,
  Float,
  MeshReflectorMaterial,
  RoundedBox,
  Stars
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Stylized 3D Developer Character - Person sitting at desk
 */
function Developer() {
  const groupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Subtle breathing animation
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(t * 2) * 0.02;
    }

    // Head movement - looking at monitors
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 - 0.1;
    }

    // Typing animation for arms
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -0.4 + Math.sin(t * 8) * 0.08;
      rightArmRef.current.rotation.x = -0.4 + Math.cos(t * 8 + 0.5) * 0.08;
      leftArmRef.current.rotation.z = -0.2 + Math.sin(t * 4) * 0.03;
      rightArmRef.current.rotation.z = 0.2 + Math.cos(t * 4) * 0.03;
    }
  });

  const skinColor = "#e8c4a0";
  const clothesColor = "#1a1a2e";
  const accentColor = "#06b6d4";

  return (
    <group ref={groupRef} position={[0, -0.8, 0.3]} scale={0.85}>
      {/* Gaming Chair */}
      <group position={[0, -0.5, 0.2]}>
        {/* Chair Base */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Chair Pole */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Chair Seat */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.15, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Chair Back */}
        <mesh position={[0, 0.5, -0.2]}>
          <boxGeometry args={[0.55, 0.9, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Chair RGB Strip */}
        <mesh position={[0, 0.5, -0.16]}>
          <boxGeometry args={[0.5, 0.8, 0.02]} />
          <meshStandardMaterial 
            color={accentColor} 
            emissive={accentColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Body - Hoodie */}
      <group ref={bodyRef}>
        {/* Torso */}
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
          <meshStandardMaterial color={clothesColor} />
        </mesh>
        {/* Hood */}
        <mesh position={[0, 0.7, -0.1]}>
          <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={clothesColor} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 0.9, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.1, -0.02]}>
          <sphereGeometry args={[0.23, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Glasses Frame */}
        <group position={[0, 0.02, 0.2]}>
          {/* Left Lens */}
          <mesh position={[-0.08, 0, 0]}>
            <torusGeometry args={[0.06, 0.008, 8, 32]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Right Lens */}
          <mesh position={[0.08, 0, 0]}>
            <torusGeometry args={[0.06, 0.008, 8, 32]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[0.04, 0.008, 0.02]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Lens Glass - Left */}
          <mesh position={[-0.08, 0, 0]}>
            <circleGeometry args={[0.055, 32]} />
            <meshStandardMaterial 
              color="#88ccff" 
              transparent 
              opacity={0.3}
              emissive="#88ccff"
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Lens Glass - Right */}
          <mesh position={[0.08, 0, 0]}>
            <circleGeometry args={[0.055, 32]} />
            <meshStandardMaterial 
              color="#88ccff" 
              transparent 
              opacity={0.3}
              emissive="#88ccff"
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.35, 0.2, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color={clothesColor} />
        </mesh>
        {/* Left Hand */}
        <mesh position={[-0.15, -0.35, 0.2]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 0.2, 0]}>
        <mesh rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color={clothesColor} />
        </mesh>
        {/* Right Hand */}
        <mesh position={[0.15, -0.35, 0.2]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.15, -0.5, 0.2]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.15, -0.5, 0.2]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

/**
 * Modern Developer Desk Setup with Dual Monitors
 */
function DeskSetup() {
  const screenRef1 = useRef();
  const screenRef2 = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Screen glow animation
    if (screenRef1.current) {
      screenRef1.current.material.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.1;
    }
    if (screenRef2.current) {
      screenRef2.current.material.emissiveIntensity = 0.25 + Math.cos(t * 2 + 1) * 0.1;
    }
  });

  return (
    <group>
      {/* Desk Surface */}
      <mesh position={[0, -1.2, -0.3]} receiveShadow>
        <boxGeometry args={[3.5, 0.08, 1.2]} />
        <meshStandardMaterial 
          color="#2d1f1a" 
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Desk Legs */}
      {[[-1.6, -1.8, -0.7], [1.6, -1.8, -0.7], [-1.6, -1.8, 0.1], [1.6, -1.8, 0.1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 1.2, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Main Monitor (Left) */}
      <group position={[-0.55, -0.3, -0.7]}>
        {/* Monitor Body */}
        <RoundedBox args={[1.3, 0.85, 0.05]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        {/* Screen */}
        <mesh ref={screenRef1} position={[0, 0, 0.03]}>
          <planeGeometry args={[1.2, 0.75]} />
          <meshStandardMaterial 
            color="#0d1117"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Code Lines on Screen */}
        <group position={[0, 0, 0.04]}>
          {[0.25, 0.15, 0.05, -0.05, -0.15, -0.25].map((y, i) => (
            <mesh key={i} position={[-0.3 + (i % 3) * 0.1, y, 0]}>
              <planeGeometry args={[0.4 + Math.random() * 0.3, 0.04]} />
              <meshBasicMaterial 
                color={i % 3 === 0 ? "#f472b6" : i % 3 === 1 ? "#06b6d4" : "#22c55e"} 
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
        {/* Monitor Stand */}
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.72, 0.05]}>
          <boxGeometry args={[0.4, 0.02, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Second Monitor (Right) */}
      <group position={[0.55, -0.3, -0.7]}>
        <RoundedBox args={[1.3, 0.85, 0.05]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        <mesh ref={screenRef2} position={[0, 0, 0.03]}>
          <planeGeometry args={[1.2, 0.75]} />
          <meshStandardMaterial 
            color="#0d1117"
            emissive="#a855f7"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Terminal/Browser content */}
        <group position={[0, 0, 0.04]}>
          <mesh position={[0, 0.28, 0]}>
            <planeGeometry args={[1.1, 0.08]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          {[0.15, 0.05, -0.05, -0.15, -0.25].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <planeGeometry args={[0.8 + Math.random() * 0.2, 0.035]} />
              <meshBasicMaterial 
                color={i === 0 ? "#facc15" : "#94a3b8"} 
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
        {/* Monitor Stand */}
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.72, 0.05]}>
          <boxGeometry args={[0.4, 0.02, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* RGB LED Strip under desk */}
      <mesh position={[0, -1.15, 0.28]}>
        <boxGeometry args={[3.4, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Mechanical Keyboard */}
      <group position={[0, -1.1, 0.15]}>
        <RoundedBox args={[0.9, 0.04, 0.3]} radius={0.01} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
        </RoundedBox>
        {/* RGB underglow */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[0.85, 0.01, 0.28]} />
          <meshStandardMaterial 
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Keys indication */}
        {Array.from({ length: 4 }).map((_, row) => (
          Array.from({ length: 12 }).map((_, col) => (
            <mesh 
              key={`${row}-${col}`} 
              position={[-0.38 + col * 0.065, 0.03, -0.1 + row * 0.065]}
            >
              <boxGeometry args={[0.05, 0.015, 0.05]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))
        ))}
      </group>

      {/* Gaming Mouse */}
      <group position={[0.65, -1.12, 0.2]}>
        <mesh>
          <capsuleGeometry args={[0.04, 0.08, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* RGB strip on mouse */}
        <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.035, 0.005, 8, 32]} />
          <meshStandardMaterial 
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* Mouse Pad */}
      <mesh position={[0.65, -1.155, 0.15]}>
        <boxGeometry args={[0.4, 0.005, 0.35]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.9} />
      </mesh>

      {/* Coffee Mug */}
      <group position={[-1.3, -1.05, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.03, 16]} />
          <meshStandardMaterial color="#3d2314" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.03, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Steam */}
        <Float speed={3} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        </Float>
      </group>

      {/* Headphones Stand */}
      <group position={[1.4, -0.85, 0]}>
        {/* Stand Base */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Stand Pole */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Headphones */}
        <group position={[0, 0.15, 0]}>
          {/* Headband */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.12, 0.015, 8, 32, Math.PI]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* Left Ear Cup */}
          <mesh position={[-0.12, -0.02, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* Right Ear Cup */}
          <mesh position={[0.12, -0.02, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* RGB Accent */}
          <mesh position={[-0.12, -0.02, 0.025]}>
            <ringGeometry args={[0.03, 0.05, 16]} />
            <meshStandardMaterial 
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * Cozy Room Environment
 */
function Room() {
  return (
    <group>
      {/* Floor with reflection */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0f"
          metalness={0.5}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -2]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#0f0f14" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>

      {/* LED Strip on Wall */}
      <mesh position={[0, 1.5, -1.95]}>
        <boxGeometry args={[5, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Shelf */}
      <group position={[-2.5, 0.5, -1.8]}>
        <mesh>
          <boxGeometry args={[1.2, 0.05, 0.25]} />
          <meshStandardMaterial color="#2d1f1a" />
        </mesh>
        {/* Books */}
        {[
          { pos: [-0.35, 0.12, 0], color: "#ef4444", height: 0.22 },
          { pos: [-0.2, 0.1, 0], color: "#3b82f6", height: 0.18 },
          { pos: [-0.05, 0.13, 0], color: "#22c55e", height: 0.24 },
          { pos: [0.1, 0.11, 0], color: "#f59e0b", height: 0.2 },
          { pos: [0.25, 0.09, 0], color: "#a855f7", height: 0.16 },
        ].map((book, i) => (
          <mesh key={i} position={book.pos}>
            <boxGeometry args={[0.12, book.height, 0.18]} />
            <meshStandardMaterial color={book.color} />
          </mesh>
        ))}
        {/* Small Plant */}
        <group position={[0.45, 0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#4a3728" />
          </mesh>
          {[0, 0.4, 0.8, 1.2, 1.6].map((rot, i) => (
            <mesh key={i} position={[0, 0.08, 0]} rotation={[0.3, rot * Math.PI, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#22c55e" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Poster/Art on Wall */}
      <group position={[1.5, 0.8, -1.95]}>
        <mesh>
          <boxGeometry args={[0.8, 1.1, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.7, 1]} />
          <meshStandardMaterial 
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Code Symbol */}
        <Text
          position={[0, 0.2, 0.02]}
          fontSize={0.15}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2"
        >
          {'</>'}
        </Text>
        <Text
          position={[0, -0.1, 0.02]}
          fontSize={0.08}
          color="#94a3b8"
        >
          CODE
        </Text>
        <Text
          position={[0, -0.25, 0.02]}
          fontSize={0.08}
          color="#94a3b8"
        >
          CREATE
        </Text>
        <Text
          position={[0, -0.4, 0.02]}
          fontSize={0.08}
          color="#94a3b8"
        >
          INNOVATE
        </Text>
      </group>

      {/* Window with night sky view */}
      <group position={[-3.95, 0.5, -0.5]}>
        <mesh>
          <boxGeometry args={[0.05, 1.5, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Window Glass - Night Sky */}
        <mesh position={[0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 1.4]} />
          <meshStandardMaterial 
            color="#0a1628"
            emissive="#1e3a5f"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Stars through window */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[0.02, Math.random() * 1 - 0.5, Math.random() * 0.6 - 0.3]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <circleGeometry args={[0.02, 8]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
        {/* Moon */}
        <mesh position={[0.02, 0.4, 0.2]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial 
            color="#fef3c7"
            emissive="#fef3c7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Floating Tech Icons
 */
function FloatingTechIcons() {
  const techSymbols = useMemo(() => [
    { text: '<>', pos: [-2.5, 1.5, 1], color: '#61dafb' },
    { text: '{}', pos: [2.5, 1.8, 0.5], color: '#f7df1e' },
    { text: '/>', pos: [-1.5, 2.2, -0.5], color: '#06b6d4' },
    { text: '()', pos: [1.8, 0.5, 1.5], color: '#a855f7' },
    { text: '[]', pos: [-2, 0.8, 0.8], color: '#22c55e' },
    { text: ';', pos: [2.2, 1.2, 1], color: '#f472b6' },
  ], []);

  return (
    <group>
      {techSymbols.map((tech, i) => (
        <Float 
          key={i} 
          speed={1.5 + i * 0.3} 
          rotationIntensity={0.5} 
          floatIntensity={0.8}
        >
          <Text
            position={tech.pos}
            fontSize={0.2}
            color={tech.color}
            font="https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2"
            anchorX="center"
            anchorY="middle"
          >
            {tech.text}
          </Text>
        </Float>
      ))}
    </group>
  );
}

/**
 * Animated Code Rain Effect
 */
function CodeRain() {
  const groupRef = useRef();
  
  const codeChars = useMemo(() => {
    const chars = [];
    for (let i = 0; i < 30; i++) {
      chars.push({
        char: ['0', '1', '<', '>', '/', '{', '}', '(', ')', ';'][Math.floor(Math.random() * 10)],
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 6,
        z: -3 + Math.random() * 2,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    return chars;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= codeChars[i].speed * 0.02;
        if (child.position.y < -3) {
          child.position.y = 3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {codeChars.map((code, i) => (
        <Text
          key={i}
          position={[code.x, code.y, code.z]}
          fontSize={0.15}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={code.opacity}
        >
          {code.char}
        </Text>
      ))}
    </group>
  );
}

/**
 * Scene Lighting
 */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      
      {/* Main Key Light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Monitor Glow - Cyan */}
      <pointLight position={[-0.5, -0.3, 0.5]} intensity={0.8} color="#06b6d4" distance={3} />
      
      {/* Monitor Glow - Purple */}
      <pointLight position={[0.5, -0.3, 0.5]} intensity={0.6} color="#a855f7" distance={3} />
      
      {/* RGB Under Desk */}
      <pointLight position={[0, -1.5, 0.5]} intensity={0.4} color="#06b6d4" distance={2} />
      
      {/* Window Light */}
      <pointLight position={[-4, 0.5, -0.5]} intensity={0.3} color="#1e3a5f" distance={4} />
      
      {/* Rim Light */}
      <pointLight position={[0, 2, 3]} intensity={0.2} color="#ffffff" distance={5} />
    </>
  );
}

/**
 * Post-processing Effects
 */
function Effects() {
  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={0.8}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}

/**
 * Camera Controller - Simple rotation animation
 */
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.1;
    // Smooth orbital camera movement
    camera.position.x = Math.sin(t) * 5;
    camera.position.z = Math.cos(t) * 5;
    camera.position.y = 2 + Math.sin(t * 0.5) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Main 3D Scene Component - Enhanced Developer Workspace
 */
export function DeveloperScene() {
  return (
    <Canvas
      className="developer-scene-canvas"
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f172a 100%)'
      }}
      camera={{ position: [3, 2, 5], fov: 60 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      shadows
    >
      {/* Camera Animation */}
      <CameraController />
      
      {/* Better positioned lights for visibility */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-0.5, 0, 1]} intensity={1.5} color="#06b6d4" distance={5} />
      <pointLight position={[0.5, 0, 1]} intensity={1.2} color="#a855f7" distance={5} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Background Stars */}
      <Stars 
        radius={50} 
        depth={50} 
        count={800} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />

      {/* Main Scene Objects */}
      <Room />
      <DeskSetup />
      <Developer />
      <FloatingTechIcons />
      <CodeRain />

      {/* Sparkles */}
      <Sparkles 
        count={100} 
        scale={10} 
        size={3}
        speed={0.4}
        opacity={0.6}
        color="#06b6d4"
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.2}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </Canvas>
  );
}

export default DeveloperScene;