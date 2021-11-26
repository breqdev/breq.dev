import React, { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import useScroll from "../models/useScroll"

import Greeting from "./Greeting"
import Projects from "./Projects"
import About from "./About"

export default function Background() {
    const [sceneIndex, setSceneIndex] = useState(0)
    const [logoLoaded, setLogoLoaded] = useState(false)

    useScroll(
        (scroll) => {
            setSceneIndex(Math.floor(scroll / (window.innerHeight * 2)))
        },
        { global: true }
    )

    const scenes = [Greeting, Projects, null, About]

    useEffect(() => {
        setSceneIndex(
            Math.floor(
                -document.body.getBoundingClientRect().top /
                    (window.innerHeight * 2)
            )
        )
    }, [])

    return (
        <div
            className={
                "fixed inset-0 z-[-10] transition-opacity duration-500 " +
                (logoLoaded ? "opacity-100" : "opacity-0")
            }
        >
            <Canvas
                camera={{ fov: 10, near: 0.1, far: 1000, position: [0, 0, 50] }}
            >
                {scenes.map((Scene, i) =>
                    Scene ? (
                        <Scene
                            visible={i === sceneIndex}
                            onLoad={() => setLogoLoaded(true)}
                        />
                    ) : null
                )}
            </Canvas>
        </div>
    )
}
