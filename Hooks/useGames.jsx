import useSWR from 'swr'
import { baseApi } from '../Utils/api'

const useGames = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`${baseApi}game`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useGames
