'use client';

import * as THREE from 'three'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer, Text, RoundedBox, Image } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/assets/tag.glb')
useTexture.preload('/assets/band.jpg')
useTexture.preload('/assets/profile.png')
useTexture.preload('/assets/github-qr.png')

function ProfileContent() {
  const logoTexture = useTexture('/logo.png')

  return (
    <group position={[0, 0.53, 0.03]}>
      {/* --- LOGO (Top Left) --- */}
      <mesh position={[-0.22, 0.39, 0.005]}>
        <planeGeometry args={[0.07, 0.07]} />
        <meshBasicMaterial map={logoTexture} color="white" transparent />
      </mesh>

      {/* --- PROFILE PICTURE (No Borders, Lowered) --- */}
      <Image url="/assets/profile.png" transparent position={[0, 0.15, 0.003]} scale={[0.32, 0.32]} radius={0.01} />

      {/* --- NAME & DESIGNATION --- */}
      <Text position={[0, -0.09, 0.005]} fontSize={0.045} color="white" anchorX="center" anchorY="middle" letterSpacing={-0.01} fontWeight="bold">
        Muhammad Munawwar
      </Text>

      <Text position={[0, -0.15, 0.005]} fontSize={0.027} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.03}>
        MERN STACK DEVELOPER
      </Text>

      {/* --- DETAILS GRID (All White, Phone, Github, Location) --- */}
      <group position={[-0.22, -0.25, 0.005]}>
        {/* Labels */}
        <Text position={[0, 0, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle" fontWeight="bold">PHONE</Text>
        <Text position={[0, -0.04, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle" fontWeight="bold">GITHUB</Text>
        <Text position={[0, -0.08, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle" fontWeight="bold">LOCATION</Text>

        {/* Separators */}
        <Text position={[0.14, 0, 0]} fontSize={0.027} color="#ffffff" anchorX="center" anchorY="middle">:</Text>
        <Text position={[0.14, -0.04, 0]} fontSize={0.027} color="#ffffff" anchorX="center" anchorY="middle">:</Text>
        <Text position={[0.14, -0.08, 0]} fontSize={0.027} color="#ffffff" anchorX="center" anchorY="middle">:</Text>

        {/* Values */}
        <Text position={[0.16, 0, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle">+92 314 1304783</Text>
        <Text position={[0.16, -0.04, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle">muhammad-munawwar</Text>
        <Text position={[0.16, -0.08, 0]} fontSize={0.027} color="#ffffff" anchorX="left" anchorY="middle">Karachi, Pakistan</Text>
      </group>

      {/* --- BACK SIDE (QR Code) --- */}
      <group position={[0, 0, -0.031]} rotation={[0, Math.PI, 0]}>
        {/* QR Code Image */}
        <Image url="/assets/github-qr.png" position={[0, 0.16, 0.001]} scale={[0.29, 0.29]} />

        {/* SCAN TO VIEW text */}
        <Text position={[0, -0.08, 0.002]} fontSize={0.02} color="#888888" anchorX="center" anchorY="middle" fontWeight="bold">
          SCAN TO VIEW
        </Text>
        <Text position={[0, -0.12, 0.002]} fontSize={0.028} color="#ffffff" anchorX="center" anchorY="middle" fontWeight="bold" letterSpacing={0.01}>
          MY GITHUB
        </Text>

      </group>
    </group>
  )
}

export default function Badge({ eventSource }: { eventSource?: HTMLElement }) {
  return (
    <div className="w-full h-full absolute inset-0 z-[100] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        gl={{ alpha: true }}
        eventSource={eventSource || (typeof window !== 'undefined' ? document.body : undefined)}
        eventPrefix="client"
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment background={false} blur={0.75}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </React.Suspense>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<any>(null), fixed = useRef<any>(null), j1 = useRef<any>(null), j2 = useRef<any>(null), j3 = useRef<any>(null), card = useRef<any>(null) // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
  const { nodes, materials } = useGLTF('/assets/tag.glb') as any;
  if (nodes.card?.geometry) {
    nodes.card.geometry.computeBoundingBox();
    const bbox = nodes.card.geometry.boundingBox;
    console.log("CARD GEOMETRY BOUNDS:", JSON.stringify({ min: bbox.min, max: bbox.max }));
  }
  const texture = useTexture('/assets/band.jpg')
  const { width, height } = useThree((state) => state.size)
  const viewport = useThree((state) => state.viewport)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState<any>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      // Calculate catmul curve
      const t1 = j3.current.translation()
      const t2 = j2.current.lerped
      const t3 = j1.current.lerped
      const t4 = fixed.current.translation()

      const isValid = (p: any) => p && !isNaN(p.x) && !isNaN(p.y) && !isNaN(p.z)

      if (isValid(t1) && isValid(t2) && isValid(t3) && isValid(t4)) {
        curve.points[0].copy(t1)
        curve.points[1].copy(t2)
        curve.points[2].copy(t3)
        curve.points[3].copy(t4)

        if (band.current && band.current.geometry) {
          const points = curve.getPoints(32)
          // Ensure no NaNs crash the WebGL context
          if (!points.some(p => isNaN(p.x) || isNaN(p.y) || isNaN(p.z))) {
            band.current.geometry.setPoints(points)
          }
        }
      }

      // Tilt it back towards the screen
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  // @ts-ignore
  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Calculate responsive anchor position
  const isMobile = viewport.width < 5
  // We want it slightly shifted to the left on desktop (changed from /4.0 to /5.5)
  const anchorX = isMobile ? 0 : viewport.width / 5.5
  // Position the lanyard anchor higher on desktop
  const anchorY = isMobile ? -0.8 : 4.8

  return (
    <>
      <group position={[anchorX, anchorY, 0]}>
        <RigidBody ref={fixed} {...segmentProps as any} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps as any}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps as any}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps as any}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps as any} type="dynamic">
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as any).releasePointerCapture(e.pointerId);
              drag(false);
              if (card.current) card.current.setBodyType(0, true); // Revert to Dynamic
            }}
            onPointerDown={(e) => {
              (e.target as any).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              if (card.current) card.current.setBodyType(2, true); // Set to KinematicPositionBased
            }}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color="#1a1a1a" clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

            <ProfileContent />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  )
}
