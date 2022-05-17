/* eslint-disable */
export const globalVars = () => {
    let api_url;
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === ('production' || 'preview')) {
        api_url = '184.169.199.251:8080';
    } else {
        api_url = 'http://localhost:8080';
    }
    return {
        API_URL: api_url,
    }
}