import React, { useRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import Page from "../components/Page"


extend({ OrbitControls })


function Controls() {
    const orbit = useRef()
    const { camera, gl: renderer } = useThree()

    useFrame(() => orbit.current.update())

    return (
        <orbitControls
            args={[ camera, renderer.domElement ]}
            ref={orbit}
        />
    )
}


function ZoomingTorus() {
    const torus = React.useRef()

    useFrame(() => {
        torus.current.rotation.x += 0.01
        torus.current.rotation.y += 0.005
    })

    return (
        <mesh ref={torus} position={[ 0, 0, -20 ]}>
            <torusGeometry args={[ 10, 3, 16, 100 ]} />
            <meshStandardMaterial color={ 0xFF0000 } />
        </mesh>
    )
}


function Background() {
    return (
        <div className="fixed inset-0">
            <Canvas>
                <ZoomingTorus />
                <pointLight args={[ 0xFFFFFF ]} position={ [20, 20, 20] } />
                <gridHelper />
                <Controls />
            </Canvas>
        </div>
    )
}


export default function Index() {
    return (
        <Page>
            <h1>Hello, world!</h1>
            <Background />
        </Page>
    )
}

