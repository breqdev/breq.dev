import React from "react"


export default function YouTube(props) {
    return (
        <div className="my-4 aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
            <iframe title="YouTube video" type="text/html" src={`https://www.youtube.com/embed/${props.id}`} />
        </div>
    )
}
