import React from "react"

export default function Desmos(props) {
    return (
        <div className="aspect-w-3 aspect-h-3 md:aspect-h-2 max-w-6xl">
            <iframe className="w-full h-full" src={`https://www.desmos.com/calculator/${props.id}?embed`} frameBorder="0" />
        </div>
    )
}
