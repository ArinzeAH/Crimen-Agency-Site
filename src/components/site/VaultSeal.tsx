import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#E0BE45";
const RED = "#C41E3A";

function Seal() {
  const group = useRef<THREE.Group>(null);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!reduced) group.current.rotation.z += delta * 0.18;
    const max = 0.12;
    group.current.rotation.x +=
      (state.pointer.y * max + 0.12 - group.current.rotation.x) * 0.05;
    group.current.rotation.y +=
      (state.pointer.x * max - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.12, 0, 0]} scale={1.15}>
      {/* main disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.28, 72]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.26} />
      </mesh>
      {/* inner recess */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.06, 72]} />
        <meshStandardMaterial color="#4A4136" metalness={0.8} roughness={0.45} />
      </mesh>
      {/* dial spokes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[0, 0, 0.22]}
          rotation={[0, 0, (i * Math.PI) / 6]}
        >
          <boxGeometry args={[2.7, 0.045, 0.05]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} />
        </mesh>
      ))}
      {/* hub */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.22, 40]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.18}
          emissive={GOLD}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* outer ring */}
      <mesh>
        <torusGeometry args={[1.72, 0.05, 16, 96]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function VaultSeal() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 6]} intensity={2.4} color="#F3EEE6" />
      <pointLight position={[2, 2, 4]} intensity={20} color="#E0BE45" distance={14} />
      <pointLight position={[-3, -2, 3]} intensity={20} color={RED} distance={12} />
      <directionalLight position={[-2, 1, 5]} intensity={1.2} color="#F3EEE6" />
      <Seal />
    </Canvas>
  );
}
