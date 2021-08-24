import React, { useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHamburger, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch"
import { InstantSearch, connectSearchBox, connectHits, Configure } from "react-instantsearch-dom"


const SearchBox = connectSearchBox(({ refine, currentRefinement, onFocus }) =>(
    <div className="flex flex-col">
        <form className="flex items-center px-2 md:px-0">
            <input type="text" className="bg-panpink outline-none pb-2 z-20 flex-grow" value={currentRefinement} onFocus={onFocus} onChange={e => refine(e.target.value)} />
            <FontAwesomeIcon icon={faSearch} />
            <span className="sr-only">search</span>
        </form>
        <hr className="border-black" />
    </div>
))


function Hit({ hit, ...props }) {
    return (
        <li className="border-black focus-within:border-white border-2 rounded-xl">
            <Link to={hit.slug} className="block p-4 outline-none" onClick={props.onSelect}>
                <h3 className="text-xl">{hit.title}</h3>
                <h4 className="text-base">{hit.subtitle}</h4>
            </Link>
        </li>
    )
}


const Hits = connectHits(({ hits, ...props }) => (
    <div className="absolute top-0 left-0 right-0 my-12 md:my-16 bg-panpink p-4">
        {hits.length > 0 ? (
            <ul className="flex flex-col gap-4">
                {hits.map(hit => <Hit hit={hit} onSelect={props.onSelect} />)}
            </ul>
        ) : (
            <p className="text-center">No results found</p>
        )}
    </div>
))


function Search(props) {
    const [searchState, setSearchState] = useState({ query: "" })

    const searchClient = useMemo(() => algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY,
    ), [])

    const handleSelect = () => {
        setSearchState({ query: "" })
        props.onSelect()
    }

    return (
        <div className="relative md:w-1/2 p-2">
            <InstantSearch searchClient={searchClient} indexName="breq.dev" searchState={searchState} onSearchStateChange={setSearchState}>
                <Configure hitsPerPage={5} />
                <SearchBox />
                {searchState.query.length > 0 && <Hits onSelect={handleSelect} />}
            </InstantSearch>
        </div>
    )
}



export default function Navbar() {

    const navLinks = {
        projects: "/projects",
        blog: "/blog",
        contact: "/contact",
    }

    const [expanded, setExpanded] = useState(false)

    const handleSelect = () => setExpanded(false)


    return (
        <nav className="sticky top-0 bg-panpink p-4 font-display z-20">

            <div className="flex flex-col md:flex-row mx-auto w-full max-w-7xl gap-4">

                <div className="flex w-full md:w-max justify-between">
                    <a className="text-5xl hover:text-white outline-none focus:text-white focus:underline" href="/">breq.dev</a>

                    <button className="border-4 border-black rounded-xl p-2 md:hidden text-lg" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setExpanded(!expanded)}>
                        <FontAwesomeIcon icon={faHamburger} />
                    </button>
                </div>

                <div className={"md:flex absolute md:static left-0 mt-16 md:mt-0 w-full bg-panpink " + (expanded ? "" : "hidden")}>
                    <ul className="flex gap-2 p-4 md:p-0 flex-col md:flex-row">
                        {Object.entries(navLinks).map(([name, url]) => (
                            <li className="text-lg" key={url}>
                                <Link className="hover:text-white outline-none focus:text-white focus:underline" to={url} onClick={handleSelect}>{ name }</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex-grow" />

                    <Search onSelect={handleSelect} />
                </div>
            </div>
        </nav>

    )
}