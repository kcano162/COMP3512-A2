const artistList = JSON.parse(artists);
// test to see if artists is parsed
console.dir(artistList);

const genreList = JSON.parse(genres);
// test to see if artists is parsed
console.dir(genreList);

const songList = JSON.parse(songs);
console.dir(songList);

document.addEventListener("DOMContentLoaded", function(){
    const selectArtists = document.querySelector(".artists");
    const selectGenres = document.querySelector(".genres");
});