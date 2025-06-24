
export default async function fetchTopItems(token, limit = 20, time_range = 'short_term' , token_expired_date , refresh_token) {
    let TOKEN = token;
    let REFRESH_TOKEN = refresh_token
    const TIME_RANGE = time_range;
    const LIMIT = limit
    const TOKEN_EXPIRED_DATE = token_expired_date

    console.log("TOKEN EXPIRED DATE:", TOKEN_EXPIRED_DATE);
    console.log("TOKEN:", TOKEN);
    console.log("REFRESH TOKEN:", REFRESH_TOKEN);
    console.log("TIME RANGE:", TIME_RANGE);
    console.log("LIMIT:", LIMIT);
    
    const DateNow = new Date();
    const TOKEN_EXPIRED = new Date(TOKEN_EXPIRED_DATE);

    if( DateNow > TOKEN_EXPIRED || TOKEN === null || TOKEN === undefined ) {
        console.log("Token expired, refreshing...");
        const GET_TOKEN = await fetch(`api/token-refresh?refresh=${REFRESH_TOKEN}`);
        if (!GET_TOKEN.ok) {
            console.log("cookie null")
            const Response = await fetch(`api/logout`, {
                method: `POST`,
            })

            const Logout = await Response.json();
            console.log(Logout)

            throw new Error("Failed to refresh token");
        }

        const Data = await GET_TOKEN.json();
        const NewToken = Data.access_token;
        TOKEN = NewToken;
        REFRESH_TOKEN = Data.refresh_token;
        console.log("Token refreshed successfully");

    }

    const TopTracksData = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=20&offset=0`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        },
    })

    if (!TopTracksData.ok) {
        throw new Error("Failed to fetch top tracks");
    }

    const TopArtistsData = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=20&offset=0`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        },
    })

    if (!TopArtistsData.ok) {
        throw new Error("Failed to fetch top artists");
    }

    const TopTracksJSON = await TopTracksData.json();
    const TopArtistsJSON = await TopArtistsData.json();
    const TopTrackList = TopTracksJSON.items;
    const TopArtistList = TopArtistsJSON.items;

    const DataList = {
        topTracks: TopTrackList,
        topArtists: TopArtistList,
    };

    return DataList
}