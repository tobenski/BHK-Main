import useSWR from 'swr'
import { baseApi } from '../Utils/api'

const useMedia = (id) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const { data, error } = useSWR(`${baseApi}media/${id}`, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useMedia
