import { Canvas, events, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef, useState } from "react"

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
      <Canvas>
        <directionalLight position={[0,0,2]} />
        <ambientLight />
        <Cube positon={[0,0,1]} color={"pink"} size={[1,1,1]}/>
      </Canvas>
    </>
  )
}

export default App
