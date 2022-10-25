import useSWR from 'swr'

const useSettings = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}settings`,
        fetcher
    )
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useSettings
