const artistList = JSON.parse(artists);
// test to see if artists is parsed
console.dir(artistList);

const genreList = JSON.parse(genres);
// test to see if artists is parsed
console.dir(genreList);

document.addEventListener("DOMContentLoaded", function(){
    const artists = document.querySelector(".artists");
    const genres = document.querySelector(".genres");

    // populate select of artist
    for(let artist of artistList){
        let option = document.createElement("option");
        option.setAttribute("value", `${artist.id}`);
        option.textContent = `${artist.name}`;

        artists.appendChild(option);
    }

    // populate select of genre
    for(let genre of genreList){
        let option = document.createElement("option");
        option.setAttribute("value", `${genre.id}`);
        option.textContent = `${genre.name}`;

        genres.appendChild(option);
    }
});