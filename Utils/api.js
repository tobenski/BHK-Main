export const tokenApi = '/api/jwt'
export const secureApi = `${process.env.NEXT_PUBLIC_HOST}/api/secureapi`
export const apiCall = async (url) => {
    const response = await fetch(`${secureApi}?url=${url}`, { method: 'GET' })

    const data = await response.json()
    console.log(data)
    return data
}

/**
 * Local API hosted on Vercel.
 * Used to make "secret api calls"
 * and making the frontend page logic easier.
 */
export const teamApi = (id) => {
    return `${process.env.NEXT_PUBLIC_HOST}/api/team?id=${id}`
}

/**
 * Wordpress API calls.
 * Used to manage the application.
 */

export const baseApi = `${process.env.NEXT_PUBLIC_API_BASE}wp/v2/`
export const settingsApi = `${process.env.NEXT_PUBLIC_API_BASE}tobenski/`

export const pagesApi = (slug) => {
    return `${baseApi}pages?slug=${slug}`
}
export const mediaApi = (mediaId) => {
    return `${baseApi}wp/v2/media/${mediaId}`
}
// export const navigationApi = `https://bhk.tobenski.dk/api/tobenski/v1/menu`
// export const navigationApi = `${process.env.NEXT_PUBLIC_API_BASE}menus/v1/menus/`
export const navigationApi = `${process.env.NEXT_PUBLIC_API_BASE}tobenski/navigation/`
