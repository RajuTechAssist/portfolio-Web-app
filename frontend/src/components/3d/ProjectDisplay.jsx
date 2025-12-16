import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Image, 
  Environment, 
  Float, 
  Text,
  MeshTransmissionMaterial
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Individual Project Card in 3D Space
 */
function ProjectCard({ position, rotation, texture, active, index }) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      // Smoothly animate to target position based on 'active' state
      const targetZ = active ? 0 : -2;
      const targetScale = active ? 1.2 : 0.8;
      const targetRotY = active ? 0 : rotation[1]; // Face forward if active
      
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, delta * 4);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, delta * 4));
      
      // Gentle floating wobble
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, delta * 4);
    }
  });

  return (
    <group position={position} rotation={[0, rotation[1], 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={mesh}>
          <boxGeometry args={[3, 2, 0.1]} /> {/* 3:2 Aspect Ratio Card */}
          
          {/* Glass Effect Material */}
          <MeshTransmissionMaterial 
            backside
            backsideThickness={1}
            thickness={0.5}
            chromaticAberration={0.5}
            anisotropy={1}
            distortion={0.4}
            distortionScale={1}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            roughness={0.1}
            color={active ? "#ffffff" : "#444444"}
            background={new THREE.Color("#050505")}
          />
        </mesh>
        
        {/* Placeholder for Image (Using a color plane for now) */}
        {/* In production, swap this mesh for <Image url={texture} /> */}
        <mesh position={[0, 0, 0.06]} scale={active ? 1.05 : 1}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshBasicMaterial 
            color={index % 2 === 0 ? "#06b6d4" : "#a855f7"} 
            transparent 
            opacity={0.3} 
          />
        </mesh>

        {/* Decorative "Holographic" Text inside the glass */}
        <Text 
          position={[0, 0, 0.08]} 
          fontSize={0.2} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
        >
          PROJECT {index + 1}
        </Text>
      </Float>
    </group>
  );
}

/**
 * Main 3D Scene for Projects
 */
export default function ProjectDisplay({ currentProject, totalProjects }) {
  // Calculate positions for 3 cards: Previous, Current, Next
  // We use a modulo operator to simulate an infinite carousel visually
  
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, 0, 5]} intensity={1} color="#a855f7" />
      
      <Environment preset="city" />

      <group position={[0, -0.5, 0]}>
        {/* Render 3 visual slots based on current index */}
        {[-1, 0, 1].map((offset) => {
          const index = (currentProject + offset + totalProjects) % totalProjects;
          
          return (
            <ProjectCard 
              key={`${index}-${offset}`}
              index={index}
              active={offset === 0}
              position={[offset * 2.5, 0, 0]} // Spread them out horizontally
              rotation={[0, offset * -0.3, 0]} // Tilt side cards inward
            />
          );
        })}
      </group>
    </Canvas>
  );
}