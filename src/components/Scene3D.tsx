import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const NeuralPlexus = ({ count = 150 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  // Initialize points with random positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        originalPos: new THREE.Vector3()
      });
      temp[i].originalPos.copy(temp[i].position);
    }
    return temp;
  }, [count]);

  // Buffers for rendering
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    let lineIdx = 0;

    // Update particle positions
    particles.forEach((p, i) => {
      // Natural floating movement
      p.position.add(p.velocity);

      // Mouse interaction - stronger attraction/repulsion
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);
      const distToMouse = p.position.distanceTo(mouseVec);

      if (distToMouse < 6) {
        const dir = p.position.clone().sub(mouseVec).normalize();
        // Create a "swirl" or "push" effect
        const force = (6 - distToMouse) * 0.08;
        p.position.add(dir.multiplyScalar(force));
      }

      // Gentle pull back to original area to prevent drifting away forever
      const pull = p.position.clone().sub(p.originalPos).multiplyScalar(-0.01);
      p.position.add(pull);

      // Update position buffer
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });

    // Update lines based on proximity
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);
        if (dist < 3.5) {
          linePositions[lineIdx++] = particles[i].position.x;
          linePositions[lineIdx++] = particles[i].position.y;
          linePositions[lineIdx++] = particles[i].position.z;
          linePositions[lineIdx++] = particles[j].position.x;
          linePositions[lineIdx++] = particles[j].position.y;
          linePositions[lineIdx++] = particles[j].position.z;
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#00f2ff"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f2ff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <NeuralPlexus count={160} />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </>
  );
};

export const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
};
