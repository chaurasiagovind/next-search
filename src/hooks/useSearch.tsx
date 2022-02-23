import axios from 'axios'
import { useEffect, useState } from 'react'
interface Query {
    term: string
    entity: string
}

export default function useSearch(query: Query, offset: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [results, setResults] = useState<any>([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setResults([])
    }, [query])

    useEffect(() => {
        console.log('query', query);
        if (query.term) {
            setLoading(true)
            let cancel: Function
            axios({
                method: 'GET',
                url: 'https://itunes.apple.com/search?limit=10',
                params: { term: query.term, entity: query.entity, offset: offset },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(response => {
                setResults((prevResults: any[]) => {
                    return [...prevResults, ...response.data.results]
                })
                setHasMore(response.data.resultCount === 10)
                setLoading(false)
            }).catch(e => {
                if (axios.isCancel(e)) return
                setError(true)
            })
            return () => cancel()
        }
    }, [query, offset])
    return { loading, error, results, hasMore }
}
