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

// Helper to create the two organic sprout leaves
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
// 2. CREATIVE 3D ROBOTIC CAMERA RIG / ARM (PRODUCTION IDENTITY)
// =========================================================================
function RoboticCameraRig({
  armRef,
  probeRef,
  tallyColor = "#8CC63F",
}: {
  armRef: React.RefObject<THREE.Group | null>;
  probeRef: React.RefObject<THREE.Mesh | null>;
  tallyColor?: string;
}) {
  return (
    <group ref={armRef} position={[1.75, -1.05, 0.0]}>
      {/* Heavy Cylindrical Turntable Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.1, 24]} />
        <meshStandardMaterial color="#0A111A" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Emerald / Lime Accent Ring on Turntable */}
      <mesh position={[0, 0.105, 0]}>
        <ringGeometry args={[0.22, 0.25, 24]} />
        <meshBasicMaterial color="#8CC63F" />
      </mesh>

      {/* Shoulder Joint Pivot */}
      <group position={[0, 0.18, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#141E2B" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lower Boom (Twin Carbon-Fiber Tubes with Metallic Joints) */}
        <mesh position={[-0.18, 0.36, 0.08]} rotation={[0.42, 0.15, -0.45]} castShadow>
          <cylinderGeometry args={[0.032, 0.038, 0.78, 12]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} metalness={0.6} />
        </mesh>
        <mesh position={[-0.26, 0.36, -0.04]} rotation={[0.42, 0.15, -0.45]} castShadow>
          <cylinderGeometry args={[0.032, 0.038, 0.78, 12]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} metalness={0.6} />
        </mesh>

        {/* Articulated Elbow Joint Housing */}
        <group position={[-0.38, 0.68, 0.12]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
            <meshStandardMaterial color="#0B3B24" roughness={0.4} metalness={0.5} />
          </mesh>

          {/* Forearm Boom */}
          <group position={[-0.14, -0.22, 0.08]} rotation={[-0.3, 0.1, 0.5]}>
            <mesh castShadow>
              <boxGeometry args={[0.07, 0.44, 0.09]} />
              <meshStandardMaterial color="#141E2B" roughness={0.3} metalness={0.7} />
            </mesh>

            {/* Wrist 3-Axis Gimbal */}
            <group position={[0, -0.26, 0.02]}>
              <mesh castShadow>
                <sphereGeometry args={[0.07, 14, 14]} />
                <meshStandardMaterial color="#0A111A" roughness={0.3} metalness={0.8} />
              </mesh>

              {/* Stylized Cinema Camera Body (ARRI/RED/Canon Cine Hybrid) */}
              <group position={[-0.08, -0.04, 0.05]} rotation={[0.2, -0.3, 0.1]}>
                {/* Cinema Box Camera Chassis */}
                <mesh castShadow>
                  <boxGeometry args={[0.22, 0.15, 0.16]} />
                  <meshStandardMaterial color="#0B131D" roughness={0.4} metalness={0.5} />
                </mesh>

                {/* Top Handle / Monitor Bracket */}
                <mesh position={[0, 0.1, 0]}>
                  <boxGeometry args={[0.16, 0.03, 0.04]} />
                  <meshStandardMaterial color="#1F2937" roughness={0.4} metalness={0.6} />
                </mesh>

                {/* Cinema Lens Barrel with Focus Scale Ring */}
                <group position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.065, 0.075, 0.14, 18]} />
                    <meshStandardMaterial color="#0A0E17" roughness={0.2} metalness={0.7} />
                  </mesh>
                  {/* Sprout Lime Focus Ring */}
                  <mesh position={[0, 0.01, 0]}>
                    <cylinderGeometry args={[0.076, 0.076, 0.02, 18]} />
                    <meshStandardMaterial
                      color="#8CC63F"
                      roughness={0.3}
                      emissive="#8CC63F"
                      emissiveIntensity={0.4}
                    />
                  </mesh>
                  {/* Front Lens Glass Element */}
                  <mesh position={[0, 0.075, 0]}>
                    <circleGeometry args={[0.06, 18]} />
                    <meshStandardMaterial color="#1B263B" roughness={0.1} metalness={0.9} />
                  </mesh>
                </group>

                {/* Active Production Tally Light */}
                <mesh position={[0.08, 0.06, 0.082]}>
                  <sphereGeometry args={[0.018, 10, 10]} />
                  <meshStandardMaterial
                    color={tallyColor}
                    emissive={tallyColor}
                    emissiveIntensity={2.5}
                  />
                </mesh>

                {/* Tactile Robotic Finger / Actuator Probe for Mouse Click */}
                <mesh
                  ref={probeRef}
                  position={[-0.1, -0.12, 0.08]}
                  rotation={[0.3, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.015, 0.02, 0.16, 12]} />
                  <meshStandardMaterial color="#8CC63F" roughness={0.3} metalness={0.4} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// =========================================================================
// 3. CONTINUOUS 3D RECYCLING HERO SCENE
// =========================================================================
function ContinuousHeroScene() {
  const { camera, size } = useThree();

  // References
  const mouseGroupRef = useRef<THREE.Group>(null);
  const leftClickRef = useRef<THREE.Mesh>(null);
  const scrollWheelRef = useRef<THREE.Mesh>(null);
  const leavesGroupRef = useRef<THREE.Group>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);
  const robotArmRef = useRef<THREE.Group>(null);
  const probeRef = useRef<THREE.Mesh>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const lettersGroupRefs = useRef<(THREE.Group | null)[]>([]);

  // States
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedUp, setIsLockedUp] = useState(false);

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
  const stemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8CC63F"),
        emissive: new THREE.Color("#8CC63F"),
        emissiveIntensity: 1.1,
        roughness: 0.18,
        metalness: 0.1,
      }),
    []
  );

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
        roughness: 0.25,
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

  // 4. GSAP Automated Continuous Recycling Loop (repeat: -1)
  useEffect(() => {
    // Initial Setup: Set letters to scattered positions
    LETTERS_CONFIG.forEach((cfg, index) => {
      const group = lettersGroupRefs.current[index];
      if (group) {
        group.position.set(...cfg.scatPos);
        group.rotation.set(...cfg.scatRot);
      }
    });

    // Master Timeline with infinite automated continuous loop
    const masterTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
      delay: 0.4,
    });

    // =============================================================
    // STEP 1: THE ACTION (Robotic arm smoothly moves down & clicks mouse)
    // =============================================================
    if (robotArmRef.current) {
      // Articulate arm downward to press left mouse button
      masterTl.to(
        robotArmRef.current.position,
        {
          x: 1.62,
          y: -1.14,
          z: 0.06,
          duration: 0.7,
          ease: "power2.inOut",
        },
        0.2
      );

      masterTl.to(
        robotArmRef.current.rotation,
        {
          x: 0.16,
          z: -0.14,
          duration: 0.7,
          ease: "power2.inOut",
        },
        0.2
      );
    }

    // Mouse Left Button clicks down
    if (leftClickRef.current) {
      masterTl.to(
        leftClickRef.current.position,
        {
          y: 0.065,
          duration: 0.12,
          ease: "power1.in",
        },
        0.85
      );
      masterTl.to(
        leftClickRef.current.position,
        {
          y: 0.1,
          duration: 0.16,
          ease: "power1.out",
        },
        0.97
      );
    }

    // =============================================================
    // STEP 2: THE ASSEMBLY (Letters snap into lockup + Camera Flash)
    // =============================================================
    // Cinematic camera flash pulse
    if (flashLightRef.current) {
      masterTl.to(
        flashLightRef.current,
        {
          intensity: 8.5,
          duration: 0.09,
          ease: "power2.out",
        },
        0.95
      );
      masterTl.to(
        flashLightRef.current,
        {
          intensity: 0.3,
          duration: 0.45,
          ease: "power2.in",
        },
        1.04
      );
    }

    // Stem neon luminous surge
    masterTl.to(
      stemMaterial,
      {
        emissiveIntensity: 3.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
      0.95
    );

    // Leaves perk up energetically
    if (leavesGroupRef.current) {
      masterTl.to(
        leavesGroupRef.current.scale,
        {
          x: 1.25,
          y: 1.25,
          z: 1.25,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: "back.out(2)",
        },
        0.95
      );
    }

    // Sparkles expand
    if (sparklesGroupRef.current) {
      masterTl.to(
        sparklesGroupRef.current.scale,
        {
          x: 1.6,
          y: 1.6,
          z: 1.6,
          duration: 0.45,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        0.98
      );
    }

    // Robot arm retracts slightly to a hovering observation pose
    if (robotArmRef.current) {
      masterTl.to(
        robotArmRef.current.position,
        {
          x: 1.75,
          y: -1.05,
          z: 0.0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.05
      );
      masterTl.to(
        robotArmRef.current.rotation,
        {
          x: 0,
          z: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.05
      );
    }

    // Letters assemble in L-pocket
    masterTl.add(() => setIsLockedUp(true), 1.0);
    LETTERS_CONFIG.forEach((cfg, index) => {
      const group = lettersGroupRefs.current[index];
      if (!group) return;

      masterTl.to(
        group.position,
        {
          x: cfg.targetPos[0],
          y: cfg.targetPos[1],
          z: cfg.targetPos[2],
          duration: 0.95,
          ease: "back.out(1.4)",
        },
        1.0 + index * 0.035
      );

      masterTl.to(
        group.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.85,
          ease: "power2.out",
        },
        1.0 + index * 0.035
      );
    });

    // =============================================================
    // STEP 3: THE PAUSE (Hold perfect logo lockup for 4 seconds)
    // =============================================================
    masterTl.to({}, { duration: 4.0 });

    // =============================================================
    // STEP 4: THE REWIND (The Recycle: Digital glitch & scatter)
    // =============================================================
    // Quick micro-glitch jitter effect
    LETTERS_CONFIG.forEach((cfg, index) => {
      const group = lettersGroupRefs.current[index];
      if (!group) return;
      const randOffset = (index % 2 === 0 ? 1 : -1) * 0.045;

      masterTl.to(
        group.position,
        {
          x: `+=${randOffset}`,
          y: `+=${-randOffset * 0.6}`,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          ease: "rough",
        },
        ">"
      );
    });

    // Digital rewind glitch light flicker
    if (flashLightRef.current) {
      masterTl.to(
        flashLightRef.current,
        {
          intensity: 3.2,
          duration: 0.07,
          yoyo: true,
          repeat: 2,
        },
        "<"
      );
    }

    // Letters scatter back into the air (strewed up into scatPos and scatRot)
    masterTl.add(() => setIsLockedUp(false), ">");
    LETTERS_CONFIG.forEach((cfg, index) => {
      const group = lettersGroupRefs.current[index];
      if (!group) return;

      masterTl.to(
        group.position,
        {
          x: cfg.scatPos[0],
          y: cfg.scatPos[1],
          z: cfg.scatPos[2],
          duration: 0.95,
          ease: "power3.inOut",
        },
        ">" + (index === 0 ? "" : "<+0.02")
      );

      masterTl.to(
        group.rotation,
        {
          x: cfg.scatRot[0],
          y: cfg.scatRot[1],
          z: cfg.scatRot[2],
          duration: 0.9,
          ease: "power2.inOut",
        },
        "<"
      );
    });

    // Reset robot arm position cleanly
    if (robotArmRef.current) {
      masterTl.to(
        robotArmRef.current.position,
        {
          x: 1.75,
          y: -1.05,
          z: 0.0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      );
    }

    return () => {
      masterTl.kill();
    };
  }, [stemMaterial]);

  // Frame Loop: Smooth Leaves sway + Dynamic Camera Responsive Controller
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle organic breathing sway on leaves
    if (leavesGroupRef.current) {
      leavesGroupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
      leavesGroupRef.current.rotation.x = Math.cos(t * 1.2) * 0.04;
    }

    // Dynamic Camera Responsive Calculations (Mobile First)
    const isSmallMobile = size.width < 480;
    const isMobile = size.width < 768;
    const isTablet = size.width < 1024;

    let targetZ = 5.2;
    let targetFov = 42;
    let targetY = 0.25;

    if (isSmallMobile) {
      targetZ = 7.6;
      targetFov = 54;
      targetY = 0.15;
    } else if (isMobile) {
      targetZ = 6.4;
      targetFov = 48;
      targetY = 0.2;
    } else if (isTablet) {
      targetZ = 5.6;
      targetFov = 45;
      targetY = 0.25;
    }

    const perspCamera = camera as THREE.PerspectiveCamera;
    if (perspCamera && Math.abs(perspCamera.fov - targetFov) > 0.1) {
      perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFov, 0.08);
      perspCamera.updateProjectionMatrix();
    }

    // Smooth subtle cinematic parallax
    const parallaxX = state.pointer.x * 0.16;
    const parallaxY = state.pointer.y * 0.1;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, targetY, 0);
  });

  return (
    <group position={[0, -0.12, 0]}>
      {/* ======================================================== */}
      {/* 1. CINEMATIC CAMERA FLASH LIGHT (Pulses on mouse click)   */}
      {/* ======================================================== */}
      <pointLight
        ref={flashLightRef}
        position={[1.5, -0.4, 1.2]}
        color="#FFFFFF"
        intensity={0.2}
        distance={8}
        decay={2}
      />

      {/* ======================================================== */}
      {/* 2. THE BASE PEDESTAL & DESK RUNNER                       */}
      {/* ======================================================== */}
      <group position={[1.15, -1.22, 0.15]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.95, 48]} />
          <meshStandardMaterial
            color="#0D1624"
            roughness={0.7}
            metalness={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.002]}>
          <ringGeometry args={[0.92, 0.95, 48]} />
          <meshBasicMaterial color="#8CC63F" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. THE COMPUTER MOUSE (#8CC63F top shell, dark base)    */}
      {/* ======================================================== */}
      <group
        ref={mouseGroupRef}
        position={[1.15, -1.05, 0.2]}
        rotation={[0.22, -0.38, 0.08]}
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
      </group>

      {/* ======================================================== */}
      {/* 4. THE ROBOTIC CAMERA RIG / ARM (Hovering near desk)    */}
      {/* ======================================================== */}
      <RoboticCameraRig armRef={robotArmRef} probeRef={probeRef} />

      {/* ======================================================== */}
      {/* 5. THE GLOWING STEM (Curved L-Shape TubeGeometry)        */}
      {/* ======================================================== */}
      <mesh geometry={stemTubeGeo} material={stemMaterial} castShadow receiveShadow />

      {/* ======================================================== */}
      {/* 6. MAGICAL PARTICLES (Bioluminescent Sparkles Dust)     */}
      {/* ======================================================== */}
      <group ref={sparklesGroupRef}>
        <Sparkles
          count={50}
          scale={[2.6, 3.6, 1.8]}
          position={[-0.45, 0.35, 0.1]}
          color="#8CC63F"
          size={3.2}
          speed={0.4}
          noise={0.5}
          opacity={0.85}
        />
        <Sparkles
          count={30}
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
      {/* 7. THE LEAVES (Two crisp bright green sprout leaves)     */}
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
      {/* 8. TYPOGRAPHY: Snapping "Nana Creative" 3D Letters       */}
      {/* ======================================================== */}
      <group>
        {LETTERS_CONFIG.map((cfg, index) => {
          return (
            <Float
              key={cfg.id}
              speed={isLockedUp ? 0 : 2.0}
              rotationIntensity={isLockedUp ? 0 : 1.2}
              floatIntensity={isLockedUp ? 0 : 1.4}
              floatingRange={isLockedUp ? [0, 0] : [-0.08, 0.08]}
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
// 4. EXPORTED PURE 3D COMPONENT (ZERO HTML/CSS UI OVERLAYS)
// =========================================================================
export interface NanaInteractiveLogo3DProps {
  className?: string;
}

export function NanaInteractiveLogo3D({
  className = "h-[380px] sm:h-[460px] md:h-[520px] lg:h-[620px] w-full",
}: NanaInteractiveLogo3DProps) {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-3xl bg-[#1B263B] border border-[#2A3A54] shadow-2xl shadow-black/50 ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: [0.2, 0.35, 5.2], fov: 44 }}
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
          <ambientLight intensity={0.36} color="#1B263B" />

          {/* Soft Studio Directional Fill */}
          <directionalLight position={[-3, 4, 3]} intensity={0.7} color="#FFFFFF" castShadow />

          {/* Emerald Point Light near the vertical stem */}
          <pointLight
            position={[-1.3, 0.8, 1.6]}
            intensity={2.8}
            color="#8CC63F"
            distance={6}
            decay={2}
          />

          {/* Continuous Recycling Master Scene */}
          <ContinuousHeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default NanaInteractiveLogo3D;
