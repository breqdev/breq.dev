import React, { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import Gltf from "../components/models/Gltf"
import useScroll from "../components/models/useScroll"

import Page from "../components/Page"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"


function InnerLogo() {
    const model = useRef()

    useScroll((scroll) => {
        if (model.current) {
            const scale = Math.min(0.5 + scroll / 1500, 1)
            model.current.scale.set(scale, scale, scale)

            const x = Math.max(-scroll / 200, -700)
            model.current.position.set(x, 0, 0)
        }
    }, model)

    return (
        <Gltf url="/models/inner_logo.glb" ref={model} scale={[0.5, 0.5, 0.5]} />
    )
}


function ThreeLights() {
    const position = (angle) => [10 * Math.cos(angle), 10 * Math.sin(angle), 10]

    return (
        <>
            <spotLight color={0xFF1B8D} position={position(Math.PI * 3/6)} />
            <spotLight color={0xFFDA00} position={position(Math.PI * 7/6)} />
            <spotLight color={0x1BB3FF} position={position(Math.PI * 11/6)} />
        </>
    )
}


function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [0, 0, 50] }}>
                <InnerLogo />
                <ThreeLights />
            </Canvas>
        </div>
    )
}


function ScrollDownHint() {
    const iconRef = useRef()

    useScroll((scroll) => {
        if (iconRef.current) {
            if (scroll > 1) {
                iconRef.current.style.opacity = 0
            } else {
                iconRef.current.style.opacity = 1
            }
        }
    })

    return (
        <div className="absolute bottom-0 left-0 right-0 mb-32 text-center text-8xl transition-opacity duration-300" ref={iconRef}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
    )
}


export default function Index() {
    return (
        <Page>
            <div className="text-white relative">
                <div className="h-screen relative">
                    <ScrollDownHint />
                </div>


                <div className="max-w-6xl mx-auto px-16 text-right font-display">
                    <h1 className="text-7xl mb-2">hey, I'm Brooke.</h1>
                    <p className="text-4xl">welcome to my little patch of internet.</p>
                </div>
                <div style={{ height: "500vh" }} />

                <div className="absolute inset-0 bg-black -z-10" />
            </div>
            <Background />
        </Page>
    )
}

