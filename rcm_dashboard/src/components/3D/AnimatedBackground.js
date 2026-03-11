import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles(props) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.002;
    }
  });

  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;
    positions[i + 1] = (Math.random() - 0.5) * 2000;
    positions[i + 2] = (Math.random() - 0.5) * 2000;
  }

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
