import React, { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"

import Page from "../components/Page"


function ZoomingTorus() {
    const torus = useRef()

    useFrame(() => {
        torus.current.rotation.y += 0.005
    })

    useEffect(() => {
        const listener = window.addEventListener("scroll", () => {
            const top = document.body.getBoundingClientRect().top

            torus.current.rotation.x = top / 100
        })

        return () => {
            window.removeEventListener("scroll", listener)
        }
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
        <div className="fixed inset-0 -z-10">
            <Canvas>
                <ZoomingTorus />
                <pointLight args={[ 0xFFFFFF ]} position={ [20, 20, 20] } />
            </Canvas>
        </div>
    )
}


export default function Index() {
    return (
        <Page>
            <div style={{ height: "500vh" }}>
            </div>
            <Background />
        </Page>
    )
}

