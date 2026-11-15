import * as THREE from "three";

export const vineVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const vineFragmentShader = `
  uniform float uTime;
  uniform float uPulseProgress;
  uniform float uPulseIntensity;
  uniform vec3 uBaseColor;
  uniform vec3 uPulseColor;
  uniform vec3 uGlowColor;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // vUv.y is the coordinate along the length of the TubeGeometry (0.0 = mouse base, 1.0 = leaf tips)
    float cordT = vUv.y;

    // Organic botanical gradient: deep emerald at root, fresher sprout green near tips
    vec3 gradientBase = mix(uBaseColor, vec3(0.08, 0.45, 0.22), cordT);

    // Subtle biological pulse running upward continuously
    float ambientPulse = sin(cordT * 12.0 - uTime * 3.0) * 0.5 + 0.5;
    ambientPulse = pow(ambientPulse, 3.5) * 0.4;

    // Click-triggered energetic pulse wave packet
    float pulseDist = abs(cordT - uPulseProgress);
    float pulseWidth = 0.18;
    float clickWave = smoothstep(pulseWidth, 0.0, pulseDist) * uPulseIntensity;

    // Rim lighting (Fresnel) for tactile depth
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

    // Blend base and luminous pulse
    vec3 finalColor = mix(gradientBase, uPulseColor, clamp(clickWave, 0.0, 1.0));
    finalColor += uGlowColor * (clickWave * 1.6 + ambientPulse * 0.35 + fresnel * 0.45);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createVineShaderMaterial(options?: {
  baseColor?: string;
  pulseColor?: string;
  glowColor?: string;
}) {
  return new THREE.ShaderMaterial({
    vertexShader: vineVertexShader,
    fragmentShader: vineFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPulseProgress: { value: -0.5 },
      uPulseIntensity: { value: 0 },
      uBaseColor: { value: new THREE.Color(options?.baseColor ?? "#082A19") },
      uPulseColor: { value: new THREE.Color(options?.pulseColor ?? "#8CC63F") },
      uGlowColor: { value: new THREE.Color(options?.glowColor ?? "#99D12B") },
    },
    transparent: false,
  });
}
