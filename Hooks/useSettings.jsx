import useSWR from 'swr'
import { baseApi, settingsApi } from '../Utils/api'

const useSettings = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`${settingsApi}settings`, fetcher)
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useSettings
