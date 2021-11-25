import React, { useMemo, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const Gltf = React.forwardRef((props, ref) => {
    const [gltf, setGltf] = useState()
    useMemo(
        () =>
            new GLTFLoader().load(props.url, (gltf) => {
                setGltf(gltf)
                props.onLoad && props.onLoad(gltf)
            }),
        [props.url, props.onLoad]
    )

    return gltf ? <primitive object={gltf.scene} ref={ref} {...props} /> : null
})

export default Gltf
