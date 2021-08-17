import React, { useRef } from "react"
import Gltf from "../models/Gltf"
import useScroll from "../models/useScroll"


function Desk({ visible }) {
    const model = useRef()

    useScroll((scroll, height) => {
        if (model.current) {
            const x = -10 + scroll / height * 10
            model.current.position.set(x, 0, 0)

            model.current.rotation.y = - scroll * 0.003
            model.current.rotation.x = 0.5
        }
    })

    return (
        <Gltf url="/models/desk.glb" position={[-10, 0, 0]} ref={model} visible={visible} />
    )
}


export default function About({ visible }) {
    return (
        <>
            <Desk visible={visible} />
            <spotLight color={0xFFFFFF} position={[0, 0, 10]} visible={visible} />
        </>
    )
}