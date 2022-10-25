import useSWR from 'swr'

const useEvents = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}events`,
        fetcher
    )
    return {
        data: {
            header: 'Arrangementer',
            events: data,
        },
        isLoading: !error && !data,
        isError: error,
    }
}

export default useEvents
