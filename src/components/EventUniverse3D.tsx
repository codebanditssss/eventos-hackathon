'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface EventUniverse3DProps {
  event: {
    name: string
    progress: number
    attendees: { registered: number; checkedIn: number }
    vendors: { total: number; active: number }
    sponsors: { total: number }
    status: string
    theme: string
  }
}

// Particle system for attendees
function AttendeeParticles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = Math.random() * 8 - 4
      const y = Math.random() * 8 - 4
      const z = Math.random() * 8 - 4
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshPhongMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.5} />
      </instancedMesh>
    </>
  )
}

// Central event sphere
function CentralSphere({ event }: { event: EventUniverse3DProps['event'] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    meshRef.current.rotation.y += 0.001
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  const statusColor = event.status === 'live' ? '#10b981' : event.status === 'upcoming' ? '#f59e0b' : '#8b5cf6'

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={statusColor}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Event name floating above */}
      <Html position={[0, 2.5, 0]} center>
        <div className="bg-white/90 backdrop-blur-lg px-4 py-2 rounded-xl shadow-xl border border-gray-200 whitespace-nowrap">
          <div className="text-sm font-bold text-gray-800">{event.name}</div>
          <div className="text-xs text-gray-600 capitalize">{event.status}</div>
        </div>
      </Html>

      {/* Progress ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[1.8, 2.0, 64]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

// Orbital rings for different data types
function OrbitalRing({ radius, color, label, count, speed }: { radius: number; color: string; label: string; count: number; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)
  const particlesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.z += speed * 1.5
    }
  })

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      temp.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }
    return temp
  }, [count, radius])

  return (
    <group>
      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Particles on ring */}
      <group ref={particlesRef}>
        {particles.map((pos, i) => (
          <Float key={i} speed={2 + Math.random()} rotationIntensity={0.5}>
            <mesh position={[pos.x, pos.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Label */}
      <Html position={[radius + 0.5, 0, 0]}>
        <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
          <div className="text-xs font-bold text-gray-800">{label}</div>
          <div className="text-xs text-gray-600">{count}</div>
        </div>
      </Html>
    </group>
  )
}

// Main 3D Scene
function Scene({ event }: EventUniverse3DProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

      {/* Central Event Sphere */}
      <CentralSphere event={event} />

      {/* Orbital Rings */}
      <OrbitalRing 
        radius={3.5} 
        color="#3b82f6" 
        label="Attendees" 
        count={Math.min(event.attendees.checkedIn / 50, 20)} 
        speed={0.002}
      />
      <OrbitalRing 
        radius={4.5} 
        color="#8b5cf6" 
        label="Vendors" 
        count={event.vendors.active} 
        speed={0.003}
      />
      <OrbitalRing 
        radius={5.5} 
        color="#f59e0b" 
        label="Sponsors" 
        count={event.sponsors.total} 
        speed={0.0025}
      />

      {/* Floating Particles */}
      <AttendeeParticles count={50} />

      {/* Camera Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Main Component
export default function EventUniverse3D({ event }: EventUniverse3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene event={event} />
      </Canvas>
    </div>
  )
}

