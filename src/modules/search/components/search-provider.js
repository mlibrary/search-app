import React, { createContext, useContext, useReducer, useEffect } from "react"
import { Pride } from "pride"
import { useLocation, navigate } from "@reach/router"
const qs = require("qs")

Pride.Settings.datastores_url =
  "https://search-staging.www.lib.umich.edu/spectrum"

const StateContext = createContext()

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useSearch = () => useContext(StateContext)

function useInitialSearchState() {
  const location = useLocation()
  const { query } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  })

  return {
    query: query ? query : "",
    run: query && query.length > 0, // if we have a query
  }
}

function createStateInURLString({ query }) {
  const string = qs.stringify(
    {
      query: query.length > 0 ? query : undefined,
    },
    {
      format: "RFC1738",
      allowDots: true,
      arrayFormat: "repeat",
      encodeValuesOnly: true,
    }
  )

  return string
}

export default function SearchProvider({ children }) {
  const { run, query } = useInitialSearchState()
  const initialState = {
    run,
    query: query,
    status: "initializing",
    results: null,
    stateInURLString: "",
  }

  function reducer(state, action) {
    switch (action.type) {
      case "setStatus":
        return {
          ...state,
          status: action.status,
        }
      case "addDatastore":
        return {
          ...state,
          datastores: {
            ...state.datastores,
            ...action.datastore,
          },
        }
      case "setRun":
        return {
          ...state,
          run: action.run,
          status: "loading",
        }
      case "setQuery":
        return {
          ...state,
          query: action.query,
          stateInURLString: createStateInURLString({
            query: action.query,
          }),
        }
      case "addRecords":
        return {
          ...state,
          records: {
            ...state.records,
            ...action.records,
          },
        }
      case "addResults":
        return {
          ...state,
          resultMetadata: {
            ...state.resultMetadata,
            ...action.resultMetadata,
          },
          results: {
            ...state.results,
            ...action.results,
          },
        }
      case "clearResults":
        return {
          ...state,
          results: null,
        }
      default:
        return state
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Search />
      {children}
    </StateProvider>
  )
}

let searcher

function Search() {
  const [{ status, run, query, stateInURLString }, dispatch] = useSearch()

  useEffect(() => {
    if (searcher && run) {
      searcher
        .set({
          field_tree: Pride.FieldTree.parseField("all_fields", query),
          page: 1,
          count: 10,
        })
        .run()

      dispatch({
        type: "clearResults",
      })

      dispatch({
        type: "setRun",
        run: false,
      })
    }
  })

  // Sync the state to the URL
  useEffect(() => {
    if (stateInURLString.length > 0) {
      navigate("?" + stateInURLString, { replace: true })
    } else if (status !== "initializing") {
      // Only do this after initializing state.
      navigate("/", { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateInURLString])

  useEffect(() => {
    function handleResults(datastore, results, resultMetadata) {
      if (!results.includes(undefined)) {
        let result_uids = []

        const records = results.reduce((acc, d) => {
          d.renderFull(metadata => {
            const record_uid = metadata.datastore + "-" + metadata.uid

            acc = {
              ...acc,
              [record_uid]: metadata,
            }

            result_uids = result_uids.concat(record_uid)
          })

          return acc
        }, {})

        dispatch({
          type: "addRecords",
          records: records,
        })

        if (result_uids.length > 0) {
          const uid = datastore.get("uid")

          dispatch({
            type: "addResults",
            resultMetadata: {
              [uid]: resultMetadata,
            },
            results: {
              [uid]: result_uids,
            },
          })
        }
      }
    }

    function setup() {
      /*
        Grab all the datastores from Pride.
        Add them to state.
        
        TODO
        - [ ] What is a datastore? Explain it here.
      */
      const datastores = Pride.AllDatastores.array

      datastores.forEach(datastore => {
        dispatch({
          type: "addDatastore",
          datastore: {
            [datastore.get("uid")]: { ...datastore.get("metadata") },
          },
        })
      })

      /*
      For every datastore setup a Search object.
      These will be used to run Searches on and
      add event listeners to catch records being
      returned by a search.
      */
      const searches = datastores.map(datastore => {
        /*
          Create a search object from each
          Pride datastore.
        */
        const search = datastore.baseSearch()
        /*
          Setup results observers. These will be triggered
          when a search is run and results are available.
          We render out the full record and save the record
          data (not the Pride record) to be saved to state.
        */
        search.resultsObservers.add(results => {
          const { total_available } = search.getData()
          handleResults(datastore, results, {
            totalAvailable: total_available,
          })
        })

        return search
      })

      searcher = new Pride.Util.SearchSwitcher(
        searches[0],
        searches.slice(1, searches.length)
      )
    }

    if (status === "initializing") {
      Pride.init({
        success: () => {
          dispatch({
            type: "setStatus",
            status: "success",
          })

          setup()
        },
        failure: () => {
          dispatch({
            type: "setStatus",
            status: "error",
          })
        },
      })
    }
  }, []) // eslint-disable-line

  return null
}

export const metadata_key = {
  mirlyn: {
    name: "Catalog",
    slug: "catalog",
  },
  articlesplus: {
    name: "Articles",
    slug: "articles",
  },
  databases: {
    name: "Databases",
    slug: "databases",
  },
  journals: {
    name: "Online Journals",
    slug: "onlinejournals",
  },
  website: {
    name: "Website",
    slug: "website",
  },
}
