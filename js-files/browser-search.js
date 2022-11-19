const artistList = JSON.parse(artists);
// test to see if artists is parsed
console.dir(artistList);

const genreList = JSON.parse(genres);
// test to see if artists is parsed
console.dir(genreList);

const songList = JSON.parse(songs);
console.dir(songList);


/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
//requesting data from api




document.addEventListener("DOMContentLoaded", function(){
    const selectArtists = document.querySelector(".artists");
    const selectGenres = document.querySelector(".genres");

    //Lab 10 labs
// fetch(api)
// .then( (resp) => resp.json())
// .then( data => {
//     const table = document.querySelector(".tbl");
//     for(let song of data){
//         const tr = document.createElement("tr");
//         let title = document.createElement("td");
//         let artist = document.createElement("td");
//         let year = document.createElement("td");
//         let genre = document.createElement("td");
//         let popularity = document.createElement("td");

//         title.textContent = `${song.title}`;
//         artist.textContent = `${song.artist.name}`;
//         year.textContent = `${song.year}`;
//         genre.textContent = `${song.genre.name}`;
//         popularity.textContent = `${song.details.popularity}`;
//         table.appendChild(tr);
//         tr.appendChild(title);
//         tr.appendChild(artist);
//         tr.appendChild(year);
//         tr.appendChild(genre);
//         tr.appendChild(popularity);
//     }

// })



    //populate the table
        const table = document.querySelector(".tbl");

        for(let song of songList){
            const tr = document.createElement("tr");
            let title = document.createElement("td");
            let artist = document.createElement("td");
            let year = document.createElement("td");
            let genre = document.createElement("td");
            let popularity = document.createElement("td");

            title.innerHTML = `<a href="">${song.title}</a>`;
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

    //eventListener for the singleSong view
        let click =    document.querySelector(".tbl td a");
        
        click.addEventListener("click", function(e){
        document.querySelector(".songInfo").style.display= "block";
        document.querySelector(".search-browse").style.display = "none";

        const ul = document.querySelector(".analysis ul");
        const li = document.createElement("li");
        let songTitle = document.createElement(e.target.title);


    });


});