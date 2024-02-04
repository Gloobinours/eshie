import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { useRef } from "react"

const Cube = ({positon, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
  })
  return (
    <mesh position={positon} ref={ref}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const App = () => {
  return (
    <>
      <Canvas>
        <directionalLight position={[0,0,2]} />
        <ambientLight />
        <Cube positon={[0,1,0]} color={"orange"} size={[1,1,1]}/>
      </Canvas>
    </>
  )
}

export default App
