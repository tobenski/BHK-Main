import useSWR from 'swr'

const useNews = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}newsposts`,
        fetcher
    )
    return {
        data: {
            header: 'Nyheder',
            news: data,
        },
        isLoading: !error && !data,
        isError: error,
    }
}

const image1 =
    'https://scontent.faal2-1.fna.fbcdn.net/v/t39.30808-6/311583917_782225073086273_1867613685154151829_n.jpg?stp=cp6_dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=p_MHYgSVQG0AX_FPwVg&_nc_ht=scontent.faal2-1.fna&oh=00_AT-Bh9eI0cV7Q55tDS81IlQd8jjVig6JCZz1vq-ncU2Ysw&oe=635226DB'

export default useNews
