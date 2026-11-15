"use client";

import React, { useRef, useState, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text3D, Sparkles } from "@react-three/drei";
import gsap from "gsap";

// =========================================================================
// 1. TYPOGRAPHY CONFIGURATION (MATHEMATICAL ZERO-COLLISION KERNING)
// =========================================================================
interface LetterConfig {
  id: number;
  char: string;
  word: "nana" | "creative";
  scatPos: [number, number, number];
  scatRot: [number, number, number];
  targetPos: [number, number, number];
  size: number;
  height: number;
}

// 12 letters distributed around the 3D digital void in initial state.
// Target positions reflect the exact official stacked lockup:
// "Nana" stacked over "Creative", sitting inside the negative space
// of the L-shaped stem, to the right of the vertical spine and hovering above the mouse.
const LETTERS_CONFIG: LetterConfig[] = [
  // "Nana" letters (Row 1 at y = 0.65)
  {
    id: 0,
    char: "N",
    word: "nana",
    scatPos: [-2.4, 1.7, 1.1],
    scatRot: [0.45, -0.65, 0.52],
    targetPos: [-0.85, 0.65, 0.0],
    size: 0.54,
    height: 0.08,
  },
  {
    id: 1,
    char: "a",
    word: "nana",
    scatPos: [2.2, 2.0, -0.9],
    scatRot: [-0.52, 0.72, -0.38],
    targetPos: [-0.33, 0.65, 0.0],
    size: 0.54,
    height: 0.08,
  },
  {
    id: 2,
    char: "n",
    word: "nana",
    scatPos: [-1.9, -1.3, 1.2],
    scatRot: [0.55, 0.42, -0.68],
    targetPos: [0.1, 0.65, 0.0],
    size: 0.54,
    height: 0.08,
  },
  {
    id: 3,
    char: "a",
    word: "nana",
    scatPos: [2.5, 0.9, 1.3],
    scatRot: [-0.62, -0.45, 0.78],
    targetPos: [0.53, 0.65, 0.0],
    size: 0.54,
    height: 0.08,
  },

  // "Creative" letters (Row 2 at y = 0.10)
  {
    id: 4,
    char: "C",
    word: "creative",
    scatPos: [-2.3, 0.3, -1.1],
    scatRot: [0.52, 0.82, -0.48],
    targetPos: [-0.85, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 5,
    char: "r",
    word: "creative",
    scatPos: [0.7, 2.2, 0.9],
    scatRot: [-0.38, -0.58, 0.62],
    targetPos: [-0.45, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 6,
    char: "e",
    word: "creative",
    scatPos: [1.8, -0.8, -0.9],
    scatRot: [0.65, 0.35, -0.52],
    targetPos: [-0.25, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 7,
    char: "a",
    word: "creative",
    scatPos: [-0.8, 2.2, -1.3],
    scatRot: [-0.48, 0.62, 0.42],
    targetPos: [0.06, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 8,
    char: "t",
    word: "creative",
    scatPos: [2.3, -0.4, 1.1],
    scatRot: [0.75, -0.42, -0.65],
    targetPos: [0.36, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 9,
    char: "i",
    word: "creative",
    scatPos: [-2.0, -0.6, 1.2],
    scatRot: [-0.58, -0.65, 0.52],
    targetPos: [0.56, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 10,
    char: "v",
    word: "creative",
    scatPos: [0.5, -1.5, -0.9],
    scatRot: [0.38, 0.75, -0.32],
    targetPos: [0.69, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
  {
    id: 11,
    char: "e",
    word: "creative",
    scatPos: [2.6, 1.7, -0.8],
    scatRot: [-0.68, 0.45, 0.75],
    targetPos: [1.01, 0.1, 0.0],
    size: 0.38,
    height: 0.07,
  },
];

// Helper to create the two crisp organic sprout leaves
function createSproutLeafShape(isLeft: boolean): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  if (isLeft) {
    shape.bezierCurveTo(-0.28, 0.24, -0.5, 0.65, -0.22, 1.05);
    shape.bezierCurveTo(-0.06, 0.78, 0.04, 0.36, 0, 0);
  } else {
    shape.bezierCurveTo(0.28, 0.24, 0.5, 0.65, 0.22, 1.05);
    shape.bezierCurveTo(0.06, 0.78, -0.04, 0.36, 0, 0);
  }
  return shape;
}

// =========================================================================
// 2. SCENE 1: THE STUDIO DIORAMA
// =========================================================================
function StudioDiorama({
  onDioramaClick,
  opacity = 1.0,
}: {
  onDioramaClick: () => void;
  opacity?: number;
}) {
  return (
    <group position={[0, -0.5, 0]} onClick={onDioramaClick}>
      {/* Diorama Base / Studio Floor (Dark Slate/Charcoal) */}
      <mesh position={[0, -0.08, -0.2]} receiveShadow>
        <boxGeometry args={[4.4, 0.16, 4.0]} />
        <meshStandardMaterial
          color="#0E1724"
          roughness={0.75}
          metalness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Back Studio Wall with Acoustic Slats */}
      <mesh position={[0, 1.5, -2.15]} receiveShadow>
        <boxGeometry args={[4.4, 3.0, 0.1]} />
        <meshStandardMaterial
          color="#121D2C"
          roughness={0.8}
          metalness={0.15}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Subtle Wall Accent Shelf */}
      <mesh position={[0, 2.3, -2.05]}>
        <boxGeometry args={[3.2, 0.06, 0.24]} />
        <meshStandardMaterial
          color="#1B283C"
          roughness={0.6}
          metalness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* ======================================================== */}
      {/* THE MODERN DESK                                          */}
      {/* ======================================================== */}
      <group position={[0, 0.75, -0.5]}>
        {/* Desk Top */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.08, 1.35]} />
          <meshStandardMaterial
            color="#182333"
            roughness={0.5}
            metalness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Minimalist Desk Steel Legs */}
        <mesh position={[-1.2, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.72, 1.1]} />
          <meshStandardMaterial
            color="#0A111A"
            roughness={0.7}
            metalness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[1.2, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.72, 1.1]} />
          <meshStandardMaterial
            color="#0A111A"
            roughness={0.7}
            metalness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Oversized Dark Emerald Desk Mat */}
        <mesh position={[0, 0.045, 0.05]} receiveShadow>
          <boxGeometry args={[1.9, 0.01, 0.82]} />
          <meshStandardMaterial
            color="#082015"
            roughness={0.6}
            metalness={0.1}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Backlit Mechanical Keyboard */}
        <mesh position={[-0.15, 0.06, 0.15]} castShadow>
          <boxGeometry args={[0.72, 0.025, 0.24]} />
          <meshStandardMaterial
            color="#0B131D"
            emissive="#8CC63F"
            emissiveIntensity={0.25}
            roughness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Ergonomic Desk Mouse (Clickable) */}
        <mesh
          position={[0.55, 0.065, 0.16]}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onDioramaClick();
          }}
        >
          <boxGeometry args={[0.13, 0.04, 0.22]} />
          <meshStandardMaterial
            color="#8CC63F"
            emissive="#8CC63F"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Ceramic Coffee Mug */}
        <mesh position={[-0.75, 0.09, 0.18]} castShadow>
          <cylinderGeometry args={[0.065, 0.06, 0.14, 16]} />
          <meshStandardMaterial
            color="#E8F3EC"
            roughness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* ======================================================== */}
        {/* THE GLOWING COMPUTER MONITOR (PORTAL TO SCENE 2)         */}
        {/* ======================================================== */}
        <group position={[0, 0.65, -0.22]}>
          {/* Heavy Articulated Aluminum Stand */}
          <mesh position={[0, -0.32, -0.1]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.55, 16]} />
            <meshStandardMaterial
              color="#0A111A"
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={opacity}
            />
          </mesh>
          <mesh position={[0, -0.6, -0.1]}>
            <boxGeometry args={[0.42, 0.02, 0.32]} />
            <meshStandardMaterial
              color="#0A111A"
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Monitor Chassis & Slim Bezel */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[2.2, 1.25, 0.06]} />
            <meshStandardMaterial
              color="#080E16"
              roughness={0.4}
              metalness={0.5}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* THE GLOWING SCREEN PLANE */}
          <mesh position={[0, 0.15, 0.035]}>
            <planeGeometry args={[2.12, 1.17]} />
            <meshStandardMaterial
              color="#0B3B24"
              emissive="#8CC63F"
              emissiveIntensity={1.9}
              roughness={0.15}
              metalness={0.1}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Monitor Glow Light (Illuminating the Man and Desk) */}
          <pointLight
            position={[0, 0.15, 0.35]}
            intensity={4.8 * opacity}
            color="#8CC63F"
            distance={3.2}
            decay={2}
          />
          <spotLight
            position={[0, 0.3, 0.2]}
            target-position={[0, -0.4, 0.8]}
            angle={0.85}
            penumbra={0.7}
            intensity={4.2 * opacity}
            color="#E8F3EC"
          />
        </group>
      </group>

      {/* ======================================================== */}
      {/* THE MAN SITTING IN ERGONOMIC CHAIR                      */}
      {/* ======================================================== */}
      <group position={[0, 0, 0.45]}>
        {/* Star Base & Casters on floor */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 5]} />
          <meshStandardMaterial
            color="#080E16"
            roughness={0.6}
            metalness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.38, 16]} />
          <meshStandardMaterial
            color="#141E2B"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Chair Seat Cushion */}
        <mesh position={[0, 0.48, 0.05]} castShadow>
          <boxGeometry args={[0.62, 0.1, 0.58]} />
          <meshStandardMaterial
            color="#121A26"
            roughness={0.7}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Contoured Ergonomic Backrest */}
        <mesh position={[0, 0.95, -0.22]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.56, 0.85, 0.08]} />
          <meshStandardMaterial
            color="#0C131D"
            roughness={0.8}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Adjustable Headrest */}
        <mesh position={[0, 1.45, -0.26]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.34, 0.16, 0.06]} />
          <meshStandardMaterial
            color="#0C131D"
            roughness={0.8}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Armrests */}
        <mesh position={[-0.34, 0.68, 0.05]}>
          <boxGeometry args={[0.07, 0.04, 0.32]} />
          <meshStandardMaterial
            color="#080E16"
            roughness={0.5}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0.34, 0.68, 0.05]}>
          <boxGeometry args={[0.07, 0.04, 0.32]} />
          <meshStandardMaterial
            color="#080E16"
            roughness={0.5}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* ======================================================== */}
        {/* CHARACTER: Stylized Man Working in the Studio            */}
        {/* ======================================================== */}
        {/* Torso in Dark Modern Hoodie */}
        <mesh position={[0, 0.85, 0.02]} rotation={[0.08, 0, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.44, 8, 16]} />
          <meshStandardMaterial
            color="#1F2937"
            roughness={0.75}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Stylized Head with Modern Hair */}
        <group position={[0, 1.34, 0.04]} rotation={[0.12, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial
              color="#E2B18E"
              roughness={0.5}
              transparent
              opacity={opacity}
            />
          </mesh>
          {/* Hair Mesh */}
          <mesh position={[0, 0.06, -0.03]} rotation={[-0.1, 0, 0]}>
            <sphereGeometry args={[0.17, 18, 18, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial
              color="#131B26"
              roughness={0.9}
              transparent
              opacity={opacity}
            />
          </mesh>
        </group>

        {/* Left Arm reaching to keyboard */}
        <mesh position={[-0.24, 0.72, 0.22]} rotation={[0.65, 0.1, -0.2]}>
          <cylinderGeometry args={[0.06, 0.05, 0.42, 12]} />
          <meshStandardMaterial
            color="#1F2937"
            roughness={0.75}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Right Arm reaching to mouse */}
        <mesh position={[0.28, 0.72, 0.22]} rotation={[0.68, -0.15, 0.2]}>
          <cylinderGeometry args={[0.06, 0.05, 0.42, 12]} />
          <meshStandardMaterial
            color="#1F2937"
            roughness={0.75}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// 3. SCENE 2: THE LOGO REVEAL (INSIDE THE DIGITAL VOID)
// =========================================================================
function LogoRevealScene({
  isAligned,
  onMouseClick,
  lettersGroupRefs,
  sparklesGroupRef,
  leavesGroupRef,
  stemMaterial,
  leftClickRef,
  scrollWheelRef,
  mouseGroupRef,
  isHovered,
  setIsHovered,
}: {
  isAligned: boolean;
  onMouseClick: () => void;
  lettersGroupRefs: React.MutableRefObject<(THREE.Group | null)[]>;
  sparklesGroupRef: React.RefObject<THREE.Group | null>;
  leavesGroupRef: React.RefObject<THREE.Group | null>;
  stemMaterial: THREE.MeshStandardMaterial;
  leftClickRef: React.RefObject<THREE.Mesh | null>;
  scrollWheelRef: React.RefObject<THREE.Mesh | null>;
  mouseGroupRef: React.RefObject<THREE.Group | null>;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}) {
  // 1. Curved L-Shape TubeGeometry
  const { stemTubeGeo } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.85, -1.05, 0.2), // Front nose of mouse
      new THREE.Vector3(0.25, -1.08, 0.15),
      new THREE.Vector3(-0.55, -1.1, 0.1),
      new THREE.Vector3(-1.12, -1.06, 0.05), // Sweeping 90-degree bend
      new THREE.Vector3(-1.32, -0.72, 0.0), // Vertical spine
      new THREE.Vector3(-1.32, 0.25, 0.0),
      new THREE.Vector3(-1.32, 1.15, 0.0),
      new THREE.Vector3(-1.3, 1.65, 0.0), // Sprout apex
    ]);
    const geo = new THREE.TubeGeometry(curve, 64, 0.046, 16, false);
    return { stemTubeGeo: geo };
  }, []);

  // 2. Materials
  const mouseLimeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8CC63F"),
        roughness: 0.3,
        metalness: 0.18,
      }),
    []
  );

  const darkBaseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#081F13"),
        roughness: 0.55,
        metalness: 0.25,
      }),
    []
  );

  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8CC63F"),
        emissive: new THREE.Color("#0B3B24"),
        emissiveIntensity: 0.35,
        roughness: 0.22,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    []
  );

  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFFFFF"),
        roughness: 0.28,
        metalness: 0.05,
      }),
    []
  );

  // 3. Extruded Geometries for Two Crisp Sprout Leaves
  const { leftLeafGeo, rightLeafGeo } = useMemo(() => {
    const opts = {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    return {
      leftLeafGeo: new THREE.ExtrudeGeometry(createSproutLeafShape(true), opts),
      rightLeafGeo: new THREE.ExtrudeGeometry(createSproutLeafShape(false), opts),
    };
  }, []);

  // Ambient breathing sway for leaves
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (leavesGroupRef.current) {
      leavesGroupRef.current.rotation.z = Math.sin(t * 1.6) * 0.05;
      leavesGroupRef.current.rotation.x = Math.cos(t * 1.2) * 0.04;
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* ======================================================== */}
      {/* 1. THE BASE PEDESTAL (Subtle dark translucent disc)      */}
      {/* ======================================================== */}
      <group position={[1.15, -1.22, 0.15]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.82, 48]} />
          <meshStandardMaterial
            color="#0D1624"
            roughness={0.7}
            metalness={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.002]}>
          <ringGeometry args={[0.79, 0.82, 48]} />
          <meshBasicMaterial color="#8CC63F" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. THE COMPUTER MOUSE (#8CC63F top shell, dark base)    */}
      {/* ======================================================== */}
      <group
        ref={mouseGroupRef}
        position={[1.15, -1.05, 0.2]}
        rotation={[0.22, -0.38, 0.08]}
        onClick={(e) => {
          e.stopPropagation();
          onMouseClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={() => {
          setIsHovered(false);
        }}
      >
        <mesh position={[0, -0.06, 0]} material={darkBaseMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.45, 0.1, 28]} />
        </mesh>
        <mesh position={[0, 0.1, -0.1]} material={mouseLimeMaterial} castShadow>
          <sphereGeometry args={[0.45, 28, 22, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </mesh>
        <mesh
          ref={leftClickRef}
          position={[-0.14, 0.1, 0.22]}
          rotation={[0.18, 0.04, -0.04]}
          material={mouseLimeMaterial}
          castShadow
        >
          <boxGeometry args={[0.22, 0.1, 0.36]} />
        </mesh>
        <mesh
          position={[0.14, 0.1, 0.22]}
          rotation={[0.18, -0.04, 0.04]}
          material={mouseLimeMaterial}
          castShadow
        >
          <boxGeometry args={[0.22, 0.1, 0.36]} />
        </mesh>
        <mesh position={[0, 0.08, 0.22]} material={darkBaseMaterial}>
          <boxGeometry args={[0.05, 0.08, 0.38]} />
        </mesh>
        <mesh
          ref={scrollWheelRef}
          position={[0, 0.16, 0.2]}
          rotation={[0, 0, Math.PI / 2]}
          material={darkBaseMaterial}
          castShadow
        >
          <cylinderGeometry args={[0.075, 0.075, 0.05, 18]} />
        </mesh>
        <mesh position={[-0.2, 0.04, 0.42]} rotation={[Math.PI / 2, -0.3, 0]} material={darkBaseMaterial}>
          <cylinderGeometry args={[0.06, 0.075, 0.1, 14]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. THE GLOWING STEM (L-Shape TubeGeometry)               */}
      {/* ======================================================== */}
      <mesh geometry={stemTubeGeo} material={stemMaterial} castShadow receiveShadow />

      {/* ======================================================== */}
      {/* 4. MAGICAL PARTICLES (Bioluminescent Sparkles Dust)     */}
      {/* ======================================================== */}
      <group ref={sparklesGroupRef}>
        <Sparkles
          count={55}
          scale={[2.6, 3.6, 1.8]}
          position={[-0.45, 0.35, 0.1]}
          color="#8CC63F"
          size={3.2}
          speed={0.4}
          noise={0.5}
          opacity={0.85}
        />
        <Sparkles
          count={32}
          scale={[2.2, 3.2, 1.4]}
          position={[-0.45, 0.35, 0.1]}
          color="#FFFFFF"
          size={2.0}
          speed={0.3}
          noise={0.4}
          opacity={0.7}
        />
      </group>

      {/* ======================================================== */}
      {/* 5. THE LEAVES (Two crisp bright green sprout leaves)     */}
      {/* ======================================================== */}
      <group ref={leavesGroupRef} position={[-1.3, 1.65, 0.0]}>
        <mesh material={darkBaseMaterial} position={[0, -0.04, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>
        <group position={[-0.04, 0.02, 0]} rotation={[-0.1, 0.22, 0.65]} scale={[0.85, 0.85, 0.85]}>
          <mesh geometry={leftLeafGeo} material={leafMaterial} castShadow receiveShadow />
        </group>
        <group position={[0.04, 0.02, 0]} rotation={[0.1, -0.22, -0.65]} scale={[0.9, 0.9, 0.9]}>
          <mesh geometry={rightLeafGeo} material={leafMaterial} castShadow receiveShadow />
        </group>
      </group>

      {/* ======================================================== */}
      {/* 6. TYPOGRAPHY: Pure White (#FFFFFF) Snapping Lockup      */}
      {/* ======================================================== */}
      <group>
        {LETTERS_CONFIG.map((cfg, index) => {
          return (
            <Float
              key={cfg.id}
              speed={isAligned ? 0 : 2.0}
              rotationIntensity={isAligned ? 0 : 1.2}
              floatIntensity={isAligned ? 0 : 1.4}
              floatingRange={isAligned ? [0, 0] : [-0.08, 0.08]}
            >
              <group
                ref={(el) => {
                  lettersGroupRefs.current[index] = el;
                }}
              >
                <Text3D
                  font="/fonts/helvetiker_bold.typeface.json"
                  size={cfg.size}
                  height={cfg.height}
                  curveSegments={16}
                  bevelEnabled={true}
                  bevelSize={0.02}
                  bevelThickness={0.02}
                  bevelOffset={0}
                  bevelSegments={5}
                  material={textMaterial}
                  castShadow
                  receiveShadow
                >
                  {cfg.char}
                </Text3D>
              </group>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

// =========================================================================
// 4. MAIN INTERACTIVE EXPERIENCE (CAMERA FLY-THROUGH & LOGO REVEAL)
// =========================================================================
function CinematicHeroMaster() {
  const { camera, pointer } = useThree();

  // State: whether we are in the initial studio diorama or zoomed into the digital void
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimatingRef = useRef(false);

  // References for Scene 2 (Logo Reveal)
  const mouseGroupRef = useRef<THREE.Group>(null);
  const leftClickRef = useRef<THREE.Mesh>(null);
  const scrollWheelRef = useRef<THREE.Mesh>(null);
  const leavesGroupRef = useRef<THREE.Group>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);
  const lettersGroupRefs = useRef<(THREE.Group | null)[]>([]);

  // Opacity tracking for seamless crossfade between diorama and digital void
  const [dioramaOpacity, setDioramaOpacity] = useState(1.0);
  const dioramaOpacityRef = useRef({ value: 1.0 });

  // Camera Proxy for GSAP animation
  // Initial starting wide position: over the man's shoulder looking at the glowing monitor
  const cameraProxy = useRef({
    x: 1.75,
    y: 1.35,
    z: 2.7,
    lookX: 0,
    lookY: 0.85,
    lookZ: -0.5,
  });

  // Luminous Stem Material
  const stemMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8CC63F"),
      emissive: new THREE.Color("#8CC63F"),
      emissiveIntensity: 1.2,
      roughness: 0.18,
      metalness: 0.1,
    });
  }, []);

  // Set initial letter positions on mount
  useEffect(() => {
    LETTERS_CONFIG.forEach((cfg, index) => {
      const group = lettersGroupRefs.current[index];
      if (group) {
        group.position.set(...cfg.scatPos);
        group.rotation.set(...cfg.scatRot);
      }
    });
  }, []);

  // Mouse hover scale feedback
  useEffect(() => {
    if (!mouseGroupRef.current) return;
    gsap.to(mouseGroupRef.current.scale, {
      x: isHovered ? 1.07 : 1.0,
      y: isHovered ? 1.07 : 1.0,
      z: isHovered ? 1.07 : 1.0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isHovered]);

  // Frame Loop: Smooth camera placement + subtle handheld cinematic parallax in diorama mode
  useFrame(() => {
    if (!isZoomedIn && !isAnimatingRef.current) {
      // Subtle handheld drift based on mouse coordinates in Diorama mode
      const parallaxX = pointer.x * 0.18;
      const parallaxY = pointer.y * 0.12;

      camera.position.set(
        cameraProxy.current.x + parallaxX,
        cameraProxy.current.y + parallaxY,
        cameraProxy.current.z
      );
      camera.lookAt(
        cameraProxy.current.lookX,
        cameraProxy.current.lookY,
        cameraProxy.current.lookZ
      );
    } else {
      camera.position.set(
        cameraProxy.current.x,
        cameraProxy.current.y,
        cameraProxy.current.z
      );
      camera.lookAt(
        cameraProxy.current.lookX,
        cameraProxy.current.lookY,
        cameraProxy.current.lookZ
      );
    }
  });

  // =========================================================================
  // THE MASTER INTERACTION: FLY-THROUGH INTO MONITOR & LOGO REVEAL
  // =========================================================================
  const handleInteraction = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const targetZoom = !isZoomedIn;
    setIsZoomedIn(targetZoom);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    if (targetZoom) {
      // -------------------------------------------------------------
      // FORWARD PASS: Fly over shoulder, zoom into monitor, reveal logo
      // -------------------------------------------------------------
      // Camera Fly-Through into computer monitor
      tl.to(
        cameraProxy.current,
        {
          x: 0,
          y: 0.25,
          z: 5.2,
          lookX: 0,
          lookY: 0.25,
          lookZ: 0,
          duration: 2.1,
          ease: "power2.inOut",
        },
        0
      );

      // Fade out Diorama as camera passes through the monitor glass
      tl.to(
        dioramaOpacityRef.current,
        {
          value: 0.0,
          duration: 0.8,
          ease: "power1.in",
          onUpdate: () => setDioramaOpacity(dioramaOpacityRef.current.value),
        },
        0.75
      );

      // Trigger Stem Glow & Sparkles surge as we enter digital void
      tl.to(
        stemMaterial,
        {
          emissiveIntensity: 3.2,
          duration: 0.45,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        1.1
      );

      if (sparklesGroupRef.current) {
        tl.to(
          sparklesGroupRef.current.scale,
          {
            x: 1.85,
            y: 1.85,
            z: 1.85,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
          1.15
        );
      }

      // Leaves Bloom
      if (leavesGroupRef.current) {
        tl.to(
          leavesGroupRef.current.scale,
          {
            x: 1.28,
            y: 1.28,
            z: 1.28,
            duration: 0.26,
            delay: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "back.out(2)",
          },
          1.1
        );
      }

      // 3D White Letters fly in and snap flawlessly into L-shape pocket
      setIsAligned(true);
      LETTERS_CONFIG.forEach((cfg, index) => {
        const group = lettersGroupRefs.current[index];
        if (!group) return;

        tl.to(
          group.position,
          {
            x: cfg.targetPos[0],
            y: cfg.targetPos[1],
            z: cfg.targetPos[2],
            duration: 1.1,
            ease: "back.out(1.4)",
          },
          1.25 + index * 0.038
        );

        tl.to(
          group.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          1.25 + index * 0.038
        );
      });
    } else {
      // -------------------------------------------------------------
      // REVERSE PASS: Scatter letters, fly camera back out to diorama
      // -------------------------------------------------------------
      setIsAligned(false);

      // Scatter letters back out into chaos
      LETTERS_CONFIG.forEach((cfg, index) => {
        const group = lettersGroupRefs.current[index];
        if (!group) return;

        tl.to(
          group.position,
          {
            x: cfg.scatPos[0],
            y: cfg.scatPos[1],
            z: cfg.scatPos[2],
            duration: 0.85,
            ease: "power2.inOut",
          },
          index * 0.02
        );

        tl.to(
          group.rotation,
          {
            x: cfg.scatRot[0],
            y: cfg.scatRot[1],
            z: cfg.scatRot[2],
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.02
        );
      });

      // Fade Diorama back in
      tl.to(
        dioramaOpacityRef.current,
        {
          value: 1.0,
          duration: 0.9,
          delay: 0.4,
          ease: "power1.out",
          onUpdate: () => setDioramaOpacity(dioramaOpacityRef.current.value),
        },
        0.3
      );

      // Camera flies back out of monitor to wide diorama angle
      tl.to(
        cameraProxy.current,
        {
          x: 1.75,
          y: 1.35,
          z: 2.7,
          lookX: 0,
          lookY: 0.85,
          lookZ: -0.5,
          duration: 1.9,
          ease: "power2.inOut",
        },
        0.2
      );
    }
  };

  return (
    <group onClick={handleInteraction}>
      {/* SCENE 1: STUDIO DIORAMA (Fades out when entering the computer monitor) */}
      {dioramaOpacity > 0.01 && (
        <StudioDiorama
          onDioramaClick={handleInteraction}
          opacity={dioramaOpacity}
        />
      )}

      {/* SCENE 2: THE LOGO REVEAL (Inside the Digital Void) */}
      <group visible={isZoomedIn || dioramaOpacity < 0.9}>
        <LogoRevealScene
          isAligned={isAligned}
          onMouseClick={handleInteraction}
          lettersGroupRefs={lettersGroupRefs}
          sparklesGroupRef={sparklesGroupRef}
          leavesGroupRef={leavesGroupRef}
          stemMaterial={stemMaterial}
          leftClickRef={leftClickRef}
          scrollWheelRef={scrollWheelRef}
          mouseGroupRef={mouseGroupRef}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </group>
    </group>
  );
}

// =========================================================================
// 5. EXPORTED PURE 3D COMPONENT (ZERO HTML/CSS UI OVERLAYS)
// =========================================================================
export interface NanaInteractiveLogo3DProps {
  className?: string;
}

export function NanaInteractiveLogo3D({
  className = "h-[540px] md:h-[660px] w-full",
}: NanaInteractiveLogo3DProps) {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-3xl bg-[#1B263B] border border-[#2A3A54] shadow-2xl shadow-black/50 ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* 100% PURE 3D CANVAS - ZERO ABSOLUTE HTML/CSS OVERLAYS */}
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: [1.75, 1.35, 2.7], fov: 44 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          className="h-full w-full cursor-pointer"
          style={{ touchAction: "pan-y" }}
        >
          {/* Deep Navy/Slate Canvas Void (#1B263B) */}
          <color attach="background" args={["#1B263B"]} />

          {/* Dim, Deep Navy Ambient Light Filling Room */}
          <ambientLight intensity={0.32} color="#1B263B" />

          {/* Soft Studio Directional Fill */}
          <directionalLight position={[-3, 4, 3]} intensity={0.65} color="#FFFFFF" />

          {/* Emerald Point Light near the vertical stem */}
          <pointLight
            position={[-1.3, 0.8, 1.6]}
            intensity={2.6}
            color="#8CC63F"
            distance={6}
            decay={2}
          />

          {/* Master Cinematic Fly-Through Scene */}
          <CinematicHeroMaster />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default NanaInteractiveLogo3D;
