const readCookie = (Cookie) => {

    const MyCookies = decodeURIComponent(Cookie).split(';').map((cookie) => cookie.split(`=`) );        

    let CookieStorage = {}
    MyCookies.map((arr) => {

    let key = arr[0].trim();
    let value = arr[1];
    arr[0].trim() === 'token_expired_date' && (value = new Date(value));

    CookieStorage = {
        ...CookieStorage,
        [key] : value
    }            
    })

    return CookieStorage;
}

export default readCookie;