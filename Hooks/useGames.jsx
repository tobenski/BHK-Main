import useSWR from 'swr'

const useGames = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}games`,
        fetcher
    )
    return {
        data: {
            header: 'Kommende Kampe',
            games: data,
        },
        isLoading: !error && !data,
        isError: error,
    }
}

export default useGames
