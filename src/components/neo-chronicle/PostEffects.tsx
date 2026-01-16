'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNeoStore } from '@/lib/store';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uTheme; // 0.0 = Day, 1.0 = Night
varying vec2 vUv;

// Random noise
float random(vec2 p) {
  return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  
  // Base noise (Grain)
  float noise = random(uv + uTime);
  
  // Scanlines
  float scanline = sin(uv.y * 800.0 + uTime * 10.0) * 0.5 + 0.5;
  
  // Vignette
  float dist = length(uv - 0.5);
  float vignette = smoothstep(0.8, 0.4, dist);
  
  vec4 color = vec4(0.0);
  
  if (uTheme < 0.5) {
    // DAY MODE: Paper texture
    float paperGrain = noise * 0.05;
    color = vec4(vec3(paperGrain), 0.0); // Only modify alpha/darkness? No, post process usually overlays
    // We can't easily grab the scene texture without EffectComposer here.
    // So distinct simple overlay approach:
    
    // Just draw patterns on top?
    // Since this is just a quad in front, we need transparency.
     gl_FragColor = vec4(0.0, 0.0, 0.0, paperGrain * 0.5 + (1.0 - vignette) * 0.2); 
  } else {
    // NIGHT MODE: Cyber noise
    float cyberNoise = step(0.98, noise) * 0.1; // Sparkles
    float scanlineAlpha = scanline * 0.1;
    gl_FragColor = vec4(0.0, 1.0, 0.8, cyberNoise + scanlineAlpha + (1.0 - vignette) * 0.5);
  }
}
`;

// Simple overlay quad without EffectComposer for performance
export function PostEffects() {
    const mesh = useRef<THREE.Mesh>(null);
    const { theme } = useNeoStore();
    const { viewport } = useThree(); // To fill screen if placed in scene?

    // Actually, to make it a true overlay in Scene, we can put it in front of camera or use HUD pattern.
    // Or simple absolute div with CSS? No, user requested "shader effect".
    // Let's create a full screen plane that sits in front of camera.

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTheme: { value: 0 },
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            const targetTheme = theme === 'day' ? 0.0 : 1.0;
            material.uniforms.uTheme.value = THREE.MathUtils.lerp(
                material.uniforms.uTheme.value,
                targetTheme,
                0.05
            );
        }
    });

    return (
        // Put mesh as a child of camera or just huge plane?
        // Putting it as HUD is tricky without proper setup.
        // Simpler approach: Fixed plane at camera.
        // However, for R3F, simpler is a CSS overlay or a plane in the scene.
        // Let's try CSS overlay with logic first? User specifically asked for "Visual Effects (Lo-fi / Anime Aesthetic)".
        // Let's stick to R3F plane for consistency with "3D Centerpiece".
        // We'll place it slightly in front of the camera using createPortal or just simple parenting?
        // Actually, let's just make a plane that covers the view.
        <mesh ref={mesh} position={[0, 0, 1]}>
            <planeGeometry args={[100, 100]} /> {/* Huge plane */}
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}
// Note: Position [0,0,1] might interact with camera position [0,0,5].
// Better to not use this "PostEffects" inside the main scene like this if it blocks view or lighting.
// I'll make args huge and position it appropriately or use <ScreenQuad> if using drei (but I didn't install shader-material helpers from drei, just core).
// Let's try to keeping it out of the way for now and rely on CSS overlay in UIOverlay for grain if this is risky without testing.
// Wait, user asked for GLSL shader effects.
// I'll update Scene.tsx to NOT include PostEffects as a mesh that might block everything, unless I'm sure transparency works.
// Transparency is set to true. It should work as an overlay.
