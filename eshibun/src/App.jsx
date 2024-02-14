import { Canvas, events, useFrame } from "@react-three/fiber"
import './App.css'
import { Suspense, useRef, useState } from "react"
import Rose from "../public/Rose"
import LoadingScreen from "./LoadingScreen"
import { Html, OrbitControls, ScrollControls, Scroll, useScroll } from "@react-three/drei"

const Cube = ({positon, size, color}) => {
  const ref = useRef()

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useFrame((state, delta) => {
    // ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    // ref.current.rotation.z += delta
    // ref.current.position.z = Math.sin(state.clock.elapsedTime)
  })
  return (
    <mesh 
      position={positon} 
      ref={ref} 
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <boxGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "orange" : "pink"}/>
    </mesh>
  )
}

const MoveRose = () => {
  const data = useScroll()
  const group = useRef()
  useFrame((state, delta) => {
    group.current.children[0].rotation.y = data.range(0, 1/3) * Math.PI + delta
  })

  return (
    <group ref={group}>
      <Rose scale={1.5} position={[0, -4, 0]} />
    </group>
  )
}

const App = () => {
  return (
    <>
    <h1>Eshiebun</h1>
      <Canvas>
        <directionalLight position={[0,0,2]} />
        <ambientLight />
        <OrbitControls enableZoom={false}/>
        <ScrollControls pages={5} damping={0.25}>
          <Suspense fallback={<Html><LoadingScreen /></Html>}>
            <MoveRose />
          </Suspense>
        </ScrollControls>
      </Canvas>
      <p>Hadasdasd</p>
    </>
  )
}

export default App
