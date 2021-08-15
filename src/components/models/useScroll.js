import { useEffect } from "react"

export default function useScroll(callback) {
    useEffect(() => {
        const listener = window.addEventListener(
            "scroll",
            () => callback(-document.body.getBoundingClientRect().top),
        )

        return () => {
            window.removeEventListener("scroll", listener)
        }
    }, [callback])
}
