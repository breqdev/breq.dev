import React, { useRef } from "react"
import Gltf from "../models/Gltf"
import useScroll from "../models/useScroll"

function InnerLogo(props) {
    const model = useRef()

    useScroll((scroll, height) => {
        if (model.current) {
            if (scroll < height / 2) {
                model.current.position.set(-scroll / 200, 0, 0)
            } else {
                model.current.position.set(-height / 400, 0, 0)
            }

            model.current.rotation.y = 2e-3 * scroll
        }
    }, model)

    return (
        <Gltf
            url="/models/inner_logo.glb"
            ref={model}
            scale={[0.5, 0.5, 0.5]}
            visible={props.visible}
            onLoad={props.onLoad}
        />
    )
}

function DimmingLight({ color, angle, visible }) {
    const position = [10 * Math.cos(angle), 10 * Math.sin(angle), 10]
    const light = useRef()

    useScroll((scroll) => {
        if (light.current) {
            light.current.intensity = Math.max(
                1 - scroll / window.innerHeight,
                0
            )
        }
    })

    return (
        <spotLight
            color={color}
            position={position}
            ref={light}
            visible={visible}
        />
    )
}

function ThreeLights({ visible }) {
    return (
        <>
            <DimmingLight
                color={0xff1b8d}
                angle={(Math.PI * 3) / 6}
                visible={visible}
            />
            <DimmingLight
                color={0xffda00}
                angle={(Math.PI * 7) / 6}
                visible={visible}
            />
            <DimmingLight
                color={0x1bb3ff}
                angle={(Math.PI * 11) / 6}
                visible={visible}
            />
        </>
    )
}

export default function Greeting({ visible, onLoad }) {
    return (
        <>
            <InnerLogo visible={visible} onLoad={onLoad} />
            <ThreeLights visible={visible} />
        </>
    )
}
