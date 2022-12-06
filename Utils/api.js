export const tokenApi = '/api/jwt'
export const secureApi = `${process.env.NEXT_PUBLIC_HOST}/api/secureapi`
export const apiCall = async (url) => {
    
    const response = await fetch (`${secureApi}?url=${url}`, {method: 'GET'})
    
        const data = await response.json()
        return data;
    // console.log(data);
    
}


/**
 * Local API hosted on Vercel. 
 * Used to make "secret api calls"
 * and making the frontend page logic easier.
 */
export const teamApi = (id) => {return `${process.env.NEXT_PUBLIC_HOST}/api/team?id=${id}` }

/**
 * Wordpress API calls.
 * Used to manage the application.
 */

export const baseApi = process.env.NEXT_PUBLIC_API_BASE
export const pagesApi = (slug) => {return `${baseApi}wp/v2/pages?slug=${slug}`}
export const mediaApi = (mediaId) => { return `${baseApi}wp/v2/media/${mediaId}`}
export const navigationApi = `${baseApi}menus/v1/menus/`