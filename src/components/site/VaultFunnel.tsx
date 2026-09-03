import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RED = "#C41E3A";
const GOLD = "#E0BE45";

function Funnel() {
  const group = useRef<THREE.Group>(null);
  const leads = useRef<THREE.InstancedMesh>(null);
  const coins = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const LEADS = 90;
  const COINS = 46;

  const leadSeeds = useMemo(
    () =>
      Array.from({ length: LEADS }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 0.25 + Math.random() * 1.25,
        t: Math.random(),
        s: 0.35 + Math.random() * 0.5,
      })),
    [],
  );

  const coinSeeds = useMemo(
    () =>
      Array.from({ length: COINS }, () => ({
        a: Math.random() * Math.PI * 2,
        spread: 0.2 + Math.random() * 1.1,
        t: Math.random(),
        s: 0.5 + Math.random() * 0.6,
        spin: Math.random() * Math.PI,
      })),
    [],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      if (!reduced) group.current.rotation.y += delta * 0.18;
      const mx = state.pointer.x;
      const my = state.pointer.y;
      const max = 0.13; // ~7.5deg
      group.current.rotation.z += (mx * -max * 0.5 - group.current.rotation.z) * 0.05;
      group.current.rotation.x += (my * max - group.current.rotation.x) * 0.05;
    }

    if (leads.current) {
      leadSeeds.forEach((seed, i) => {
        const p = (seed.t + (reduced ? 0 : time * 0.13 * seed.s)) % 1;
        const y = 2.6 - p * 2.6;
        const radius = seed.r * (1 - p * 0.82);
        dummy.position.set(
          Math.cos(seed.a + p * 2) * radius,
          y,
          Math.sin(seed.a + p * 2) * radius,
        );
        const sc = 0.035 + p * 0.01;
        dummy.scale.setScalar(sc);
        dummy.updateMatrix();
        leads.current!.setMatrixAt(i, dummy.matrix);
      });
      leads.current.instanceMatrix.needsUpdate = true;
    }

    if (coins.current) {
      coinSeeds.forEach((seed, i) => {
        const p = (seed.t + (reduced ? 0 : time * 0.16 * seed.s)) % 1;
        const y = -0.15 - p * 2.4;
        const radius = seed.spread * p;
        dummy.position.set(Math.cos(seed.a) * radius, y, Math.sin(seed.a) * radius);
        dummy.rotation.set(Math.PI / 2 + seed.spin, reduced ? 0 : time * seed.s, seed.spin);
        dummy.scale.setScalar(0.085);
        dummy.updateMatrix();
        coins.current!.setMatrixAt(i, dummy.matrix);
      });
      coins.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {/* glass funnel body */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[1.75, 0.32, 2.5, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#2A2730"
          transmission={0.92}
          thickness={1.1}
          roughness={0.16}
          metalness={0.05}
          ior={1.4}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* brass rims */}
      <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.055, 16, 96]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.05, 16, 64]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.28} />
      </mesh>

      {/* brass neck / vault throat */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.42, 48, 1, true]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.34}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* vault ribs */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, 1.35, 0]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.02, 2.5, 0.02]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.4} opacity={0.5} transparent />
        </mesh>
      ))}

      {/* dim incoming leads */}
      <instancedMesh ref={leads} args={[undefined, undefined, LEADS]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#8D8894" transparent opacity={0.6} />
      </instancedMesh>

      {/* bright gold coins */}
      <instancedMesh ref={coins} args={[undefined, undefined, COINS]}>
        <cylinderGeometry args={[1, 1, 0.18, 20]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.18}
          emissive={GOLD}
          emissiveIntensity={0.35}
        />
      </instancedMesh>
    </group>
  );
}

export default function VaultFunnel({ distance = 7.2 }: { distance?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, distance], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#F3EEE6" />
      <pointLight position={[-3, -2, 2]} intensity={22} color={RED} distance={12} />
      <pointLight position={[0, -2.6, 1.5]} intensity={14} color={GOLD} distance={9} />
      <Funnel />
    </Canvas>
  );
}
