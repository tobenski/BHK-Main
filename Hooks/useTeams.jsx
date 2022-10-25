import useSWR from 'swr'
import { teamApi } from '../Utils/api'

const useTeams = (id) => {
    // console.log(id);
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error} = useSWR(
        teamApi(id), fetcher
    )
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useTeams