import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  Float, 
  MeshTransmissionMaterial, 
  Environment, 
  Sparkles 
} from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: "React", color: "#61dafb" },
  { name: "Java", color: "#f89820" },
  { name: "Spring", color: "#6db33f" },
  { name: "Node", color: "#339933" },
  { name: "ThreeJS", color: "#ffffff" },
  { name: "SQL", color: "#00758f" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
];

function Crystal({ position, name, color, index }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  // Random rotation speed
  const rotSpeed = useMemo(() => Math.random() * 0.5 + 0.2, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Gentle rotation
      mesh.current.rotation.x += delta * rotSpeed * 0.5;
      mesh.current.rotation.y += delta * rotSpeed;
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2} 
      position={position}
    >
      <group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        {/* The Glass Crystal */}
        <mesh ref={mesh}>
          <icosahedronGeometry args={[0.8, 0]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={2}
            chromaticAberration={1}
            anisotropy={1}
            distortion={1}
            distortionScale={1}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            roughness={0}
            color={hovered ? color : "#ffffff"}
            tonemapped={true}
          />
        </mesh>

        {/* Inner Glowing Text */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          {name}
        </Text>
        
        {/* Inner Glow Core */}
        <mesh scale={0.5}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function SkillCrystals() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Environment preset="city" />
        
        {/* Generate Crystals in a random cloud */}
        <group>
          {skills.map((skill, i) => {
            // Calculate positions to spread them out
            const x = (Math.random() - 0.5) * 8;
            const y = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 4;
            return (
              <Crystal 
                key={i} 
                position={[x, y, z]} 
                name={skill.name} 
                color={skill.color} 
                index={i} 
              />
            );
          })}
        </group>

        <Sparkles count={50} scale={8} size={4} speed={0.4} opacity={0.5} color="#06b6d4" />
      </Canvas>
    </div>
  );
}