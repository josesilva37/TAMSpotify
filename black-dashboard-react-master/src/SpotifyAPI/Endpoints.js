export async function getUser(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://api.spotify.com/v1/me", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log('error', error));

}

export async function getUserPlaylists(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log('error', error));
}

export async function getUserTopTracks(token, time) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let tempo = 'short_term';
    switch (parseInt(time)) {
        case 1:
            tempo = 'short_term';
            break;
        case 2:
            tempo = 'medium_term';
            console.log("entrou")
            break;
        case 3:
            tempo = 'long_term';
            break;
    }
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${tempo}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log('error', error));
}

export async function getUserTopArtists(token, time) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let tempo = 'medium_term';
    console.log(time)
    switch (parseInt(time)) {
        case 1:
            tempo = 'short_term';
            break;
        case 2:
            tempo = 'medium_term';
            break;
        case 3:
            console.log("entrou")
            tempo = 'long_term';
            break;
    }
    console.log(tempo)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${tempo}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log('error', error));
}


export async function getUserAlbums(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://api.spotify.com/v1/me/albums", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log('error', error));
}
