import React, { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import useScroll from "../models/useScroll"

import Greeting from "./Greeting"
import Projects from "./Projects"
import About from "./About"


export default function Background() {
    const [scene, setScene] = useState(0)

    useScroll((scroll) => {
        setScene(Math.floor(scroll / (window.innerHeight * 2)))
    }, {global: true})


    const scenes = [Greeting, Projects, null, About]
    const Scene = scenes[scene]


    useEffect(() => {
        setScene(Math.floor(-document.body.getBoundingClientRect().top / (window.innerHeight * 2)))
    }, [])

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [0, 0, 50] }}>
                {Scene ? <Scene /> : null}
                {/* <ambientLight /> */}
            </Canvas>
        </div>
    )
}
