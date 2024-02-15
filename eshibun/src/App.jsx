import * as THREE from "three"
import { Canvas, events, useFrame, useThree } from "@react-three/fiber"
import './App.css'
import { Suspense, useRef, useState } from "react"
import Rose from "../public/Rose"
import LoadingScreen from "./LoadingScreen"
import { Html, OrbitControls, ScrollControls, Scroll, useScroll, Image } from "@react-three/drei"

const Img = ({c = new THREE.Color(), ...props}) => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useFrame(() => {
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05)
  })

  return <Image ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />
}

const ImageLoader = () => {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const ref = useRef()
  useFrame(() => {
    ref.current.children[0].material.zoom = 1 + data.range(1, 1 / 3) / 3
    ref.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    ref.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
    ref.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    ref.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
    ref.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3
    // ref.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3)
    ref.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
  })

  return (
    <group ref={ref}>
      <Img position={[-2, -height, 0]} scale={[4, height, 1]} url="/images/image (3).jpg" />
      <Img position={[2, -height, 1]} scale={3} url="/images/image (2).jpg" />

      <Img position={[-2, -height*2, 2]} scale={[1.5, 3, 1]} url="/images/image (1).jpg" />
      <Img position={[0, -height*2, 3]} scale={[1, 2, 1]} url="/images/image (9).jpg" />
      <Img position={[1, -height*2, 3.5]} scale={[1, 1.5, 1.5]} url="/images/image (10).jpg" />
      
      <Img position={[0, -height * 2.5, 2.5]} scale={[1.5, 3, 1]} url="/images/image (6).jpg" />
      <Img position={[0, -height * 3 - height / 4, 0]} scale={[width, height / 2, 1]} url="/images/image (7).jpg" />
    </group>
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
      <Canvas>
        <directionalLight position={[0,0,2]} />
        <ambientLight />
        {/* <OrbitControls enableZoom={false}/> */}
        <ScrollControls pages={4} damping={0.25}>
          <Suspense fallback={<Html><LoadingScreen /></Html>}>
          <Scroll>
            <MoveRose />
            <ImageLoader />
          </Scroll>
          <Scroll html>
            <h1>Eshiebun</h1>
            <p style={{ position: 'absolute', top: '100vh', left: '0.5em', fontSize: '20vw' }}>I</p>
            <p style={{ position: 'absolute', top: '150vh', left: '60vw', fontSize: '20vw' }}>Love</p>
            <p style={{ position: 'absolute', top: '200vh', left: '0.5vw', fontSize: '40vw' }}>You</p>
          </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>
      <p>Hadasdasd</p>
    </>
  )
}

export default App
