import useSWR from 'swr'

const useSponsors = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}sponsors`,
        fetcher
    )
    return {
        data: {
            header: 'Støt sponsorne - De støtter os...',
            sponsors: data,
        },
        isLoading: !error && !data,
        isError: error,
    }
}

export default useSponsors
