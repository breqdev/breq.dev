import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Configure,
} from "react-instantsearch-dom";

const SearchBox = connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="flex items-center border-b-2 border-black px-2 text-black transition-all duration-300 focus-within:border-white md:px-0">
    <input
      type="text"
      className="z-20 flex-grow bg-panpink pb-2 outline-none"
      value={currentRefinement}
      onFocus={onFocus}
      onChange={(e) => refine(e.target.value)}
    />
    <FontAwesomeIcon icon={faSearch} />
    <span className="sr-only">search</span>
  </form>
));

const truncate = (length, input) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

function Hit({ hit, ...props }) {
  return (
    <li className="rounded-xl border-2 border-black text-black focus-within:border-white">
      <Link href={hit.slug} onClick={props.onSelect}>
        <a className="block p-4 outline-none">
          <h3 className="text-xl">
            {hit.title}
            <span className="italic text-gray-700"> - {hit.type}</span>
          </h3>
          <h4 className="text-base">{truncate(100, hit.description)}</h4>
        </a>
      </Link>
    </li>
  );
}

const Hits = connectHits(({ hits, ...props }) => (
  <div className="absolute top-0 left-0 right-0 my-12 bg-panpink p-4 md:my-16">
    {hits.length > 0 ? (
      <ul className="flex flex-col gap-4">
        {hits.map((hit) => (
          <Hit hit={hit} onSelect={props.onSelect} />
        ))}
      </ul>
    ) : (
      <p className="text-center">No results found</p>
    )}
    <a href="https://www.algolia.com/">
      <img
        className="mx-auto mt-2"
        src="/search-by-algolia-light-background.svg"
        alt="search powered by Algolia"
      />
    </a>
  </div>
));

export default function Search(props) {
  const [searchState, setSearchState] = useState({ query: "" });

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );

  const handleSelect = () => {
    setSearchState({ query: "" });
    props.onSelect();
  };

  return (
    <div className="relative mx-auto w-full max-w-sm p-2 lg:mx-0">
      <InstantSearch
        searchClient={searchClient}
        indexName="breq.dev"
        searchState={searchState}
        onSearchStateChange={setSearchState}
      >
        <Configure hitsPerPage={5} />
        <SearchBox />
        {searchState.query.length > 0 && <Hits onSelect={handleSelect} />}
      </InstantSearch>
    </div>
  );
}
