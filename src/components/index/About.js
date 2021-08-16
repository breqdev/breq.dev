import React, { useRef } from "react"
import Gltf from "../models/Gltf"
import useScroll from "../models/useScroll"


function Desk() {
    const model = useRef()

    useScroll((scroll, height) => {
        if (model.current) {
            const x = -10 + scroll / height * 20
            model.current.position.set(x, 0, 0)

            model.current.rotation.y = - scroll * 0.003
            model.current.rotation.x = 0.5
        }
    })

    return (
        <Gltf url="/models/desk.glb" ref={model} />
    )
}


export default function About() {
    return (
        <>
            <Desk />
            <spotLight color={0xFFFFFF} position={[0, 0, 10]} />
        </>
    )
}