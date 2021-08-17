import React from "react"
import Page from "../components/Page"


export default function Contact() {
    return (
        <Page>
            <div className="max-w-2xl mx-auto text-center font-display flex flex-col gap-8 px-4">
                <h1 className="text-6xl mt-4">get in touch</h1>

                <a href="https://github.com/Breq16" className="block border-2 border-black rounded-xl px-4">
                    <h3 className="text-4xl my-4">is it about my code?</h3>
                    <p className="text-2xl my-4 font-body">
                        the best way to reach me with code-related questions is
                        on GitHub. if you're having trouble, don't hesitate to open an issue!
                    </p>
                </a>

                <a href="https://keybase.io/breq" className="block border-2 border-black rounded-xl px-4">
                    <h3 className="text-4xl my-4">sliding in my dms?</h3>
                    <p className="text-2xl my-4 font-body">
                        i'm typically reachable on keybase, if encrypted messaging
                        is your jam.
                    </p>
                </a>

                <div className="block border-2 border-black rounded-xl px-4">
                    <h3 className="text-4xl my-4">discord?</h3>
                    <p className="text-2xl my-4 font-body">
                        i don't always accept friend requests from people i
                        don't know. if you'd like to reach out to me on discord,
                        please fill out the 'about me' on your profile so i
                        know who you are!
                    </p>
                </div>

                <a href="mailto:breq@breq.dev" className="block border-2 border-black rounded-xl px-4">
                    <h3 className="text-4xl my-4">ol' reliable?</h3>
                    <p className="text-2xl my-4 font-body">
                        shoot me an email at breq@breq.dev.
                    </p>
                </a>
            </div>
        </Page>
    )
}