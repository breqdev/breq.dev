import { useEffect } from "react"

export default function useScroll(callback, options) {
    useEffect(() => {
        const listener = window.addEventListener(
            "scroll",
            () => {
                let scroll = -document.body.getBoundingClientRect().top
                if (!options?.global) {
                    scroll %= window.innerHeight * 2
                }

                callback(scroll, window.innerHeight)
            },
        )

        return () => {
            window.removeEventListener("scroll", listener)
        }
    }, [callback, options])
}
