import { Canvas, events, useFrame } from "@react-three/fiber"
import './App.css'
import { Suspense, useRef, useState } from "react"
import Rose from "../public/Rose"
import LoadingScreen from "./LoadingScreen"
import { Html, OrbitControls, ScrollControls } from "@react-three/drei"

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

const App = () => {
  return (
    <>
    <h1>Eshiebun</h1>
      <Canvas>
        <directionalLight position={[0,0,2]} />
        <ambientLight />
        <OrbitControls />
        <ScrollControls pages={3} damping={0.25}>
          <Suspense fallback={<Html><LoadingScreen /></Html>}>
            <Rose scale={1.5} position={[0, -4, 0]}/>
          </Suspense>
        </ScrollControls>
      </Canvas>
      <p>Hadasdasd</p>
    </>
  )
}

export default App
