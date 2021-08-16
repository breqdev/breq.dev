import React, { useRef } from "react"
import useScroll from "../components/models/useScroll"

import Page from "../components/Page"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import Background from "../components/index/IndexCanvas"
import Terminal from "../components/index/Terminal"


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

    const handleScroll = () => window.scrollBy({top: 200, behavior: "smooth"})

    return (
        <div className="absolute bottom-0 left-0 right-0 mb-32 text-center text-8xl transition-opacity duration-300" ref={iconRef} onClick={handleScroll}>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
    )
}



export default function Index() {
    let projects = ["test", "test", "test"]

    return (
        <Page>
            <div className="text-white relative">
                <div style={{ height: "200vh" }} className="max-w-6xl mx-auto px-16 text-right font-display">
                    <div className="h-screen relative">
                        <ScrollDownHint />
                    </div>

                    <h1 className="text-7xl mb-2">hey, I'm Brooke.</h1>
                    <p className="text-4xl">welcome to my little patch of internet.</p>
                </div>

                <div style={{ height: "200vh" }} className="max-w-6xl mx-auto px-8 py-32 text-center font-display relative">
                    <h1 className="text-6xl mb-2 sticky top-0 py-32">projects</h1>
                </div>

                <div style={{ height: "200vh" }} className="max-w-6xl mx-auto px-8 py-32 text-center font-display">
                    <div className="flex flex-wrap items-start gap-8">
                        {projects.map(project => (
                        <div className="bg-white rounded-xl text-black h-96 w-96 flex-grow" key={project}>
                            <h2 className="text-4xl mb-2">{project}</h2>
                        </div>
                    ))}
                    </div>
                </div>

                <div style={{ height: "200vh" }} className="max-w-6xl mx-auto px-8 py-32 text-center font-display">
                    <h1 className="text-6xl mb-2 sticky top-0 py-32">about me</h1>
                </div>

                <div style={{ height: "200vh" }} className="max-w-3xl mx-auto px-8 font-display text-2xl">
                    <p>
                        hey, i'm brooke, and i'm here to learn, create, and enjoy it.
                        <br />
                        <br />
                        i'm passionate about embedded systems,
                        backend engineering, and web dev.
                        <br />
                        <br />
                        my favorite tools are python, react, redis, and linux.
                        someday i want to learn rust.
                        <br />
                        <br />
                        i believe that the only way to learn something fully is
                        to be creative with it. you can never truly understand
                        something without applying it to a problem yourself.
                        <br />
                        <br />
                        i'm a transgender woman, and i'm still learning to love myself.
                        i want to be myself and leave an impact on the world that i can be proud of.
                        <br />
                        <br />
                        technology should be for everyone. i think it's important to create tools
                        and resources that help people express themselves creatively—whether that's
                        with code, or something else entirely. (we can't all spend our lives making
                        websites with too much javascript.)
                        <br />
                        <br />
                        be excellent to each other.
                    </p>
                </div>

                <Terminal />

                <div className="absolute inset-0 bg-black -z-10" />
            </div>
            <Background />
        </Page>
    )
}

