'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNeoStore } from '@/lib/store';

const vertexShader = `
uniform float uTime;
uniform float uHover;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Simple noise function
float random(vec3 scale, float seed) {
  return fract(sin(dot(gl_Position.xyz + seed, scale)) * 43758.5453 + seed);
}

void main() {
  vUv = uv;
  vNormal = normal;
  vPosition = position;
  
  vec3 pos = position;
  
  // "Breathing" effect
  float breath = sin(uTime * 2.0) * 0.05;
  pos += normal * breath;
  
  // Hover distortion
  float distortion = sin(pos.y * 10.0 + uTime * 5.0) * 0.1 * uHover;
  pos.x += distortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uTheme; // 0.0 = Day, 1.0 = Night
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Base colors
  vec3 dayColor = vec3(0.95, 0.95, 0.95); // White paper
  vec3 dayInk = vec3(0.1, 0.1, 0.1);      // Black ink
  
  vec3 nightColor = vec3(0.05, 0.05, 0.1); // Dark city
  vec3 neonColor = vec3(0.0, 1.0, 0.8);    // Cyan neon
  
  // Pattern generation (simulating Crest/Kamon)
  float dist = length(vUv - 0.5);
  float circle = smoothstep(0.4, 0.39, dist);
  float ring = smoothstep(0.3, 0.31, dist) - smoothstep(0.35, 0.36, dist);
  
  // Dynamic lines
  float lines = sin(vPosition.y * 20.0 + uTime) * 0.5 + 0.5;
  
  // Theme mixing
  vec3 finalColor;
  
  if (uTheme < 0.5) {
    // DAY MODE: Ink style
    float inkAmount = ring + lines * 0.2;
    // Edge darkening (fresnel-ish)
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    finalColor = mix(dayColor, dayInk, inkAmount + fresnel * 0.5);
  } else {
    // NIGHT MODE: Neon Cyberpunk
    float glow = ring * 2.0 + lines * 0.5;
    // Pulse effect
    float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
    finalColor = mix(nightColor, neonColor, glow * pulse);
    // Add wireframe-ish grid
    float grid = step(0.95, fract(vUv.x * 10.0)) + step(0.95, fract(vUv.y * 10.0));
    finalColor += grid * neonColor * 0.3;
  }
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function CyberCrest() {
    const mesh = useRef<THREE.Mesh>(null);
    const { theme, mouse } = useNeoStore();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTheme: { value: theme === 'day' ? 0.0 : 1.0 },
        uHover: { value: 0 },
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Smooth theme transition
            const targetTheme = theme === 'day' ? 0.0 : 1.0;
            material.uniforms.uTheme.value = THREE.MathUtils.lerp(
                material.uniforms.uTheme.value,
                targetTheme,
                0.05
            );

            // Rotation based on time and mouse
            mesh.current.rotation.y += 0.005;
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.5, 0.1);
            mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, mouse.x * 0.5, 0.1);
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2, 1]} /> {/* Low poly look */}
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={false} // Shader handles "wireframe" look in night mode
            />
        </mesh>
    );
}
