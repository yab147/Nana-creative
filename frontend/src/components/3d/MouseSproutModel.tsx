"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { createVineShaderMaterial } from "./shaders/vinePulseShader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper to generate a realistic botanical leaf shape
function createLeafShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  // Left curve to tip
  shape.bezierCurveTo(-0.35, 0.4, -0.45, 0.9, 0, 1.4);
  // Right curve back to base
  shape.bezierCurveTo(0.45, 0.9, 0.35, 0.4, 0, 0);
  return shape;
}

interface MouseSproutModelProps {
  onPulseTriggered?: () => void;
  scrollTriggerElement?: HTMLElement | null;
}

export default function MouseSproutModel({
  onPulseTriggered,
  scrollTriggerElement,
}: MouseSproutModelProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const mouseGroupRef = useRef<THREE.Group>(null);
  const leftClickRef = useRef<THREE.Mesh>(null);
  const rightClickRef = useRef<THREE.Mesh>(null);
  const scrollWheelRef = useRef<THREE.Mesh>(null);
  const leavesGroupRef = useRef<THREE.Group>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const pulseProgressRef = useRef<number>(-0.5);
  const pulseIntensityRef = useRef<number>(0);

  const { pointer } = useThree();

  // Create Vine Curves: Main trunk, left branch, right branch
  const {
    mainCurve,
    leftBranchCurve,
    rightBranchCurve,
    mainTubeGeo,
    leftTubeGeo,
    rightTubeGeo,
  } = useMemo(() => {
    // Main trunk rising from front of the mouse
    const trunk = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.15, 0.85),
      new THREE.Vector3(0.08, 0.6, 0.65),
      new THREE.Vector3(-0.18, 1.25, 0.35),
      new THREE.Vector3(0.12, 1.95, 0.15),
      new THREE.Vector3(-0.06, 2.65, -0.05),
      new THREE.Vector3(0.02, 3.25, -0.1),
    ]);

    // Left branch branching off at y ~ 1.95
    const leftBranch = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, 1.95, 0.15),
      new THREE.Vector3(0.45, 2.2, 0.22),
      new THREE.Vector3(0.85, 2.5, 0.28),
    ]);

    // Right branch branching off at y ~ 2.65
    const rightBranch = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.06, 2.65, -0.05),
      new THREE.Vector3(-0.42, 2.9, 0.05),
      new THREE.Vector3(-0.78, 3.15, 0.12),
    ]);

    return {
      mainCurve: trunk,
      leftBranchCurve: leftBranch,
      rightBranchCurve: rightBranch,
      mainTubeGeo: new THREE.TubeGeometry(trunk, 48, 0.045, 10, false),
      leftTubeGeo: new THREE.TubeGeometry(leftBranch, 24, 0.035, 8, false),
      rightTubeGeo: new THREE.TubeGeometry(rightBranch, 24, 0.035, 8, false),
    };
  }, []);

  // Shared GLSL shader materials for main and secondary branches
  const mainVineMaterial = useMemo(
    () =>
      createVineShaderMaterial({
        baseColor: "#082A19",
        pulseColor: "#8CC63F",
        glowColor: "#99D12B",
      }),
    []
  );

  const leftVineMaterial = useMemo(
    () =>
      createVineShaderMaterial({
        baseColor: "#0B3B24",
        pulseColor: "#8CC63F",
        glowColor: "#99D12B",
      }),
    []
  );

  const rightVineMaterial = useMemo(
    () =>
      createVineShaderMaterial({
        baseColor: "#0B3B24",
        pulseColor: "#8CC63F",
        glowColor: "#99D12B",
      }),
    []
  );

  // Translucent Emerald Leaf Material (MeshPhysicalMaterial)
  const leafMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#8CC63F"),
      emissive: new THREE.Color("#082A19"),
      emissiveIntensity: 0.2,
      roughness: 0.22,
      metalness: 0.05,
      transmission: 0.65, // translucent light passing through leaf
      thickness: 0.45,
      ior: 1.48,
      clearcoat: 0.4,
      clearcoatRoughness: 0.18,
      side: THREE.DoubleSide,
    });
  }, []);

  // Extruded geometry for organic leaves
  const leafGeometry = useMemo(() => {
    const shape = createLeafShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
  }, []);

  // Computer Mouse Matte-Anodized Green Material
  const mouseGreenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8CC63F"),
      roughness: 0.32,
      metalness: 0.22, // matte-anodized finish
    });
  }, []);

  // Midnight Navy Scroll Wheel & Accent Material (#1B263B)
  const navySlateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1B263B"),
      roughness: 0.55,
      metalness: 0.1,
    });
  }, []);

  // Deep Forest Emerald Chassis Underbody (#082A19)
  const darkBaseMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#082A19"),
      roughness: 0.4,
      metalness: 0.3,
    });
  }, []);

  // Trigger pulse function
  const triggerPulse = () => {
    setPulseActive(true);
    pulseProgressRef.current = 0.0;
    pulseIntensityRef.current = 2.4;

    // Button click tactile animation
    if (leftClickRef.current) {
      gsap.to(leftClickRef.current.position, {
        y: -0.04,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    if (scrollWheelRef.current) {
      gsap.to(scrollWheelRef.current.rotation, {
        x: "+=1.2",
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // Leaves pulse bloom effect
    if (leavesGroupRef.current) {
      gsap.to(leavesGroupRef.current.scale, {
        x: 1.14,
        y: 1.14,
        z: 1.14,
        duration: 0.3,
        delay: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.4)",
      });
    }

    if (onPulseTriggered) {
      onPulseTriggered();
    }
  };

  // Setup GSAP ScrollTrigger for camera scrub, tilt, and leaf unfurl
  useEffect(() => {
    if (!rootGroupRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTriggerElement || document.body,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          if (rootGroupRef.current) {
            // Scroll scrubs rotation and depth
            rootGroupRef.current.rotation.y = progress * Math.PI * 0.4;
            rootGroupRef.current.position.y = -progress * 0.8;
            rootGroupRef.current.position.z = progress * 0.5;
          }
          if (leavesGroupRef.current) {
            // Leaves unfurl with scroll depth
            const unfurl = 1.0 + progress * 0.25;
            leavesGroupRef.current.scale.set(unfurl, unfurl, unfurl);
          }
        },
      });
    });

    return () => ctx.revert();
  }, [scrollTriggerElement]);

  // Frame loop: updates GLSL pulse progress, organic sway, and cursor parallax
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Propagate active pulse upward
    if (pulseActive) {
      pulseProgressRef.current += delta * 1.35; // propagation speed
      if (pulseProgressRef.current > 1.2) {
        pulseActive && setPulseActive(false);
        pulseProgressRef.current = -0.5;
        pulseIntensityRef.current = 0;
      }
    }

    // Update GLSL shader uniforms
    mainVineMaterial.uniforms.uTime.value = time;
    mainVineMaterial.uniforms.uPulseProgress.value = pulseProgressRef.current;
    mainVineMaterial.uniforms.uPulseIntensity.value = pulseIntensityRef.current;

    leftVineMaterial.uniforms.uTime.value = time;
    leftVineMaterial.uniforms.uPulseProgress.value = Math.max(
      0,
      pulseProgressRef.current - 0.25
    );
    leftVineMaterial.uniforms.uPulseIntensity.value = pulseIntensityRef.current;

    rightVineMaterial.uniforms.uTime.value = time;
    rightVineMaterial.uniforms.uPulseProgress.value = Math.max(
      0,
      pulseProgressRef.current - 0.4
    );
    rightVineMaterial.uniforms.uPulseIntensity.value = pulseIntensityRef.current;

    // Organic botanical leaf swaying
    if (leavesGroupRef.current) {
      leavesGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(time * 1.8 + i * 1.3) * 0.08;
        child.rotation.x = Math.cos(time * 1.4 + i) * 0.06;
      });
    }

    // Smooth cursor tracking tilt (LERP)
    if (mouseGroupRef.current) {
      const targetRotY = pointer.x * 0.38;
      const targetRotX = -pointer.y * 0.26 + 0.15; // slight pitch forward
      const floatY = Math.sin(time * 1.6) * 0.05;

      mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mouseGroupRef.current.rotation.y,
        targetRotY,
        0.06
      );
      mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mouseGroupRef.current.rotation.x,
        targetRotX,
        0.06
      );
      mouseGroupRef.current.position.y = THREE.MathUtils.lerp(
        mouseGroupRef.current.position.y,
        floatY,
        0.08
      );
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -1.2, 0]}>
      {/* Primary Interactive Group */}
      <group
        ref={mouseGroupRef}
        onClick={(e) => {
          e.stopPropagation();
          triggerPulse();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* ======================================================== */}
        {/* 1. SCULPTED COMPUTER MOUSE (Nana Creative Brand Colors)  */}
        {/* ======================================================== */}
        <group position={[0, 0, 0]}>
          {/* Base bottom chassis (#082A19) */}
          <mesh
            position={[0, -0.06, 0]}
            material={darkBaseMaterial}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.55, 0.58, 0.12, 32]} />
          </mesh>

          {/* Palm rest ergonomically curved rear shell (#8CC63F) */}
          <mesh
            position={[0, 0.16, -0.22]}
            rotation={[-0.18, 0, 0]}
            material={mouseGreenMaterial}
            castShadow
          >
            <sphereGeometry args={[0.62, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          </mesh>

          {/* Left Click Button (#8CC63F) */}
          <mesh
            ref={leftClickRef}
            position={[-0.22, 0.15, 0.38]}
            rotation={[0.18, 0.05, -0.05]}
            material={mouseGreenMaterial}
            castShadow
          >
            <boxGeometry args={[0.34, 0.14, 0.55]} />
          </mesh>

          {/* Right Click Button (#8CC63F) */}
          <mesh
            ref={rightClickRef}
            position={[0.22, 0.15, 0.38]}
            rotation={[0.18, -0.05, 0.05]}
            material={mouseGreenMaterial}
            castShadow
          >
            <boxGeometry args={[0.34, 0.14, 0.55]} />
          </mesh>

          {/* Midnight Navy Center Split & Scroll Well (#1B263B) */}
          <mesh position={[0, 0.12, 0.38]} material={navySlateMaterial}>
            <boxGeometry args={[0.07, 0.12, 0.58]} />
          </mesh>

          {/* Midnight Navy Tactile Scroll Wheel (#1B263B) */}
          <mesh
            ref={scrollWheelRef}
            position={[0, 0.22, 0.36]}
            rotation={[0, 0, Math.PI / 2]}
            material={navySlateMaterial}
            castShadow
          >
            <cylinderGeometry args={[0.1, 0.1, 0.08, 20]} />
          </mesh>

          {/* Front metallic collar socket for the sprouting vine */}
          <mesh
            position={[0, 0.12, 0.78]}
            rotation={[Math.PI / 2, 0, 0]}
            material={navySlateMaterial}
          >
            <cylinderGeometry args={[0.08, 0.1, 0.14, 16]} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 2. CATMULL-ROM ORGANIC VINE CORD WITH GLSL PULSE SHADER  */}
        {/* ======================================================== */}
        <group>
          {/* Main rising trunk cord */}
          <mesh geometry={mainTubeGeo} material={mainVineMaterial} castShadow />

          {/* Left branch */}
          <mesh
            geometry={leftTubeGeo}
            material={leftVineMaterial}
            castShadow
          />

          {/* Right branch */}
          <mesh
            geometry={rightTubeGeo}
            material={rightVineMaterial}
            castShadow
          />
        </group>

        {/* ======================================================== */}
        {/* 3. TRANSLUCENT EMERALD LEAVES (MeshPhysicalMaterial)     */}
        {/* ======================================================== */}
        <group ref={leavesGroupRef}>
          {/* Apex Sprout Leaf 1 (Left signature ear from logo) */}
          <group
            position={[0.02, 3.25, -0.1]}
            rotation={[-0.3, 0.4, 0.65]}
            scale={[0.7, 0.7, 0.7]}
          >
            <mesh
              geometry={leafGeometry}
              material={leafMaterial}
              castShadow
              receiveShadow
            />
            {/* Fine emerald midrib spine */}
            <mesh position={[0, 0.7, 0.015]} material={darkBaseMaterial}>
              <cylinderGeometry args={[0.01, 0.015, 1.35, 6]} />
            </mesh>
          </group>

          {/* Apex Sprout Leaf 2 (Right signature ear from logo) */}
          <group
            position={[0.02, 3.25, -0.1]}
            rotation={[0.2, -0.5, -0.85]}
            scale={[0.75, 0.75, 0.75]}
          >
            <mesh
              geometry={leafGeometry}
              material={leafMaterial}
              castShadow
              receiveShadow
            />
            {/* Fine emerald midrib spine */}
            <mesh position={[0, 0.7, 0.015]} material={darkBaseMaterial}>
              <cylinderGeometry args={[0.01, 0.015, 1.35, 6]} />
            </mesh>
          </group>

          {/* Left Branch Leaf 3 */}
          <group
            position={[0.85, 2.5, 0.28]}
            rotation={[0.4, 0.8, -0.3]}
            scale={[0.55, 0.55, 0.55]}
          >
            <mesh
              geometry={leafGeometry}
              material={leafMaterial}
              castShadow
              receiveShadow
            />
          </group>

          {/* Right Branch Leaf 4 */}
          <group
            position={[-0.78, 3.15, 0.12]}
            rotation={[-0.2, -0.9, 0.45]}
            scale={[0.5, 0.5, 0.5]}
          >
            <mesh
              geometry={leafGeometry}
              material={leafMaterial}
              castShadow
              receiveShadow
            />
          </group>
        </group>

        {/* Ambient Sprout Pollen Particles floating around foliage */}
        <points position={[0, 2.2, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  0.3, 0.4, 0.2, -0.4, 0.8, -0.1, 0.2, 1.1, -0.3,
                  -0.2, 0.2, 0.4, 0.5, -0.2, 0.1, -0.5, 0.5, 0.3,
                  0.1, 1.3, 0.2, -0.3, 1.4, -0.2, 0.4, 0.9, 0.3
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#8CC63F"
            transparent
            opacity={0.7}
            sizeAttenuation
          />
        </points>
      </group>

      {/* Ground subtle emerald contact shadow */}
      <mesh
        position={[0, -0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial
          color="#082A19"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}
