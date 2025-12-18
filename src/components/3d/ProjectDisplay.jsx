import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  Float, 
  ContactShadows,
  useCursor,
  MeshTransmissionMaterial,
  Text,
  useTexture,
  RoundedBox
} from '@react-three/drei';
import * as THREE from 'three';

// --- NEW COMPONENT: SCROLL HANDLER ---
function ScrollHandler({ setIndex, projectsLength }) {
  const { gl } = useThree();
  
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent default scroll behavior if needed, or just let it flow
      // A threshold prevents ultra-fast scrolling
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          setIndex((prev) => (prev + 1) % projectsLength);
        } else {
          setIndex((prev) => (prev - 1 + projectsLength) % projectsLength);
        }
      }
    };
    
    // Attach listener to the canvas element
    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl, setIndex, projectsLength]);

  return null;
}

// --- COMPONENT: THE SCREEN IMAGE ---
function ScreenImage({ project, active }) {
  const imageUrl = project?.image || null; 
  const texture = useTexture(imageUrl ? imageUrl : "/glow-services.jpg"); // Fallback to prevent crash
  
  if (texture) {
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
  }

  return (
    <mesh position={[0, 0, 0.02]}>
      <planeGeometry args={[3.2, 2]} />
      {imageUrl ? (
        <meshBasicMaterial 
            map={texture} 
            toneMapped={false}
            color={active ? "white" : "#888"} // Dim inactive screens
        />
      ) : (
        // Cool placeholder pattern if no image
        <meshBasicMaterial color="#1a1a1a">
           <canvasTexture attach="map" image={createPlaceholderCanvas()} />
        </meshBasicMaterial>
      )}
    </mesh>
  );
}

// Helper to create a pattern for placeholder projects
function createPlaceholderCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111'; ctx.fillRect(0,0,64,64);
  ctx.strokeStyle = '#333'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(64,64); ctx.stroke();
  return canvas;
}

// --- COMPONENT: TECH SLATE FRAME (The "3D Model") ---
function TechFrame({ children, active }) {
  return (
    <group>
      {/* 1. Main Metallic Frame */}
      <RoundedBox args={[3.4, 2.2, 0.15]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2} 
          envMapIntensity={2}
        />
      </RoundedBox>

      {/* 2. Glowing Side Bars (Neon Accents) */}
      <mesh position={[-1.75, 0, 0]}>
        <boxGeometry args={[0.05, 1.2, 0.16]} />
        <meshBasicMaterial color="#06b6d4" toneMapped={false} />
      </mesh>
      <mesh position={[1.75, 0, 0]}>
        <boxGeometry args={[0.05, 1.2, 0.16]} />
        <meshBasicMaterial color="#a855f7" toneMapped={false} />
      </mesh>

      {/* 3. Glass Cover (The "Screen" layer) */}
      <group position={[0, 0, 0.08]}>
        {/* The Glass itself */}
        <mesh>
          <planeGeometry args={[3.25, 2.05]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.1}
            roughness={0.1}
            chromaticAberration={0.2}
            anisotropy={0.5}
            color="white"
          />
        </mesh>
        
        {/* The Content underneath the glass */}
        <group position={[0, 0, -0.01]}>
          {children}
        </group>
      </group>
    </group>
  );
}

// --- COMPONENT: INDIVIDUAL PROJECT CARD ---
function ProjectCard({ project, active, position, rotation, index, onClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  // Use pointer cursor if active (clickable link) or inactive (clickable nav)
  useCursor(hovered);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Active state animation
      const targetZ = active ? 0 : -2.5;
      const targetY = hovered ? 0.2 : 0; // "Come up" on hover
      const targetRotY = active ? 0 : rotation[1];
      const targetScale = active ? 1.1 : 0.9;

      // Smooth lerp animations
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, delta * 3);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, delta * 3);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, delta * 3);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, delta * 3));
      
      // Idle float
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.02;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(); // Parent handles logic (Open link or Navigate)
  };

  return (
    <group 
      position={position} 
      rotation={rotation}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group 
          ref={mesh}
          onPointerOver={() => setHover(true)} 
          onPointerOut={() => setHover(false)}
          onClick={handleClick}
        >
          {/* Render the detailed 3D Frame */}
          <TechFrame active={active}>
            <ScreenImage project={project} active={active} />
          </TechFrame>

          {/* Hover Text Hint */}
          {hovered && (
            <Text 
              position={[0, -1.4, 0]} 
              fontSize={0.15} 
              color="white" 
              anchorX="center" 
              anchorY="middle"
            >
              {active ? "CLICK TO OPEN" : "VIEW PROJECT"}
            </Text>
          )}
        </group>
      </Float>
      
      {/* Dynamic Shadow */}
      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={active ? 0.6 : 0.3} 
        scale={6} 
        blur={2.5} 
        far={2} 
        color={active ? "#06b6d4" : "#000"} 
      />
    </group>
  );
}

// --- MAIN EXPORT ---
export default function ProjectDisplay({ currentProject, projects = [], setIndex }) {
  // Safety check
  if (!projects || projects.length === 0) return null;

  const handleCardClick = (index, project) => {
    if (index === currentProject) {
      // If clicking the ACTIVE card, open the link
      if (project.links?.live && project.links.live !== '#') {
        window.open(project.links.live, '_blank');
      } else {
        alert("Demo link not available for this project yet.");
      }
    } else {
      // If clicking a SIDE card, navigate to it
      setIndex(index);
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 35 }} gl={{ alpha: true }}>
      {/* Scroll Controls */}
      <ScrollHandler setIndex={setIndex} projectsLength={projects.length} />

      {/* Lighting setup for the metallic frame */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 0, 10]} intensity={2} color="#a855f7" />
      <pointLight position={[10, 0, 10]} intensity={2} color="#06b6d4" />
      
      {/* Top down spotlight for drama */}
      <spotLight 
        position={[0, 10, 0]} 
        intensity={2} 
        angle={0.5} 
        penumbra={1} 
        color="#ffffff" 
      />

      <Environment preset="city" />

      <group position={[0, 0.2, 0]}>
        {[-1, 0, 1].map((offset) => {
          // Calculate true index allowing for wrap-around
          const index = (currentProject + offset + projects.length) % projects.length;
          const isActive = offset === 0;
          
          return (
            <ProjectCard 
              key={`${index}-${offset}`}
              index={index}
              project={projects[index]}
              active={isActive}
              onClick={() => handleCardClick(index, projects[index])}
              // Position: Active in center, others pushed to sides and back
              position={[offset * 3.5, 0, isActive ? 0 : -2]} 
              // Rotation: Sides tilt inward to face user
              rotation={[0, offset * -0.4, 0]} 
            />
          );
        })}
      </group>
    </Canvas>
  );
}

// Preload the main project image
useTexture.preload("/glow-services.jpg");