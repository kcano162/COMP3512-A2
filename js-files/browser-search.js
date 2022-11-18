const artistList = JSON.parse(artists);
// test to see if artists is parsed
console.dir(artistList);

const genreList = JSON.parse(genres);
// test to see if artists is parsed
console.dir(genreList);

const songList = JSON.parse(songs);



document.addEventListener("DOMContentLoaded", function(){
    const selectArtists = document.querySelector(".artists");
    const selectGenres = document.querySelector(".genres");
    const table = document.querySelector(".tbl");

    //populate the table

        for(let song of songList){
            const tr = document.createElement("tr");
            let title = document.createElement("td");
            let artist = document.createElement("td");
            let year = document.createElement("td");
            let genre = document.createElement("td");
            let popularity = document.createElement("td");

            title.textContent = `${song.title}`;
            artist.textContent = `${song.artist.name}`;
            year.textContent = `${song.year}`;
            genre.textContent = `${song.genre.name}`;
            popularity.textContent = `${song.details.popularity}`;
            table.appendChild(tr);
            tr.appendChild(title);
            tr.appendChild(artist);
            tr.appendChild(year);
            tr.appendChild(genre);
            tr.appendChild(popularity);


        }





    // populate select of artist
    for(let artist of artistList){
        let option = document.createElement("option");
        option.setAttribute("value", `${artist.id}`);
        option.textContent = `${artist.name}`;

        selectArtists.appendChild(option);
    }

    // populate select of genre
    for(let genre of genreList){
        let option = document.createElement("option");
        option.setAttribute("value", `${genre.id}`);
        option.textContent = `${genre.name}`;

        selectGenres.appendChild(option);
    }


});