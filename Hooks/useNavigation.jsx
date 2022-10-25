import useSWR from 'swr'

import { useState } from 'react'

const useNavigation = () => {
    const [isOpen, setIsOpen] = useState(true)
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_NAVIGATION}3`,
        fetcher
    )
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        isOpen,
        setIsOpen,
    }
}

export default useNavigation
