/**
 * Local API hosted on Vercel. 
 * Used to make "secret api calls"
 * and making the frontend page logic easier.
 */
export const teamApi = (id) => {return `/api/team?id=${id}` }

/**
 * Wordpress API calls.
 * Used to manage the application.
 */

export const pagesApi = 'https://admin.tobenski.dk/api/wp/v2/pages/'
export const mediaApi = (mediaId) => { return `https://admin.tobenski.dk/api/wp/v2/media/${mediaId}`}