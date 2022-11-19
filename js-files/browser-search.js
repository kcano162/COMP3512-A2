const artistList = JSON.parse(artists);
console.dir(artistList);

const genreList = JSON.parse(genres);
console.dir(genreList);

const songList = JSON.parse(songs);
console.dir(songList);

document.addEventListener("DOMContentLoaded", function(){
    const selectArtists = document.querySelector(".artists");
    const selectGenres = document.querySelector(".genres");

    //populate the table
        // sort by column
        const table = document.querySelector(".tbl");
        let btns = document.querySelectorAll('th a');
       
        for(let song of songList){
            const tr = document.createElement("tr");
            let title = document.createElement("td");
            let artist = document.createElement("td");
            let year = document.createElement("td");
            let genre = document.createElement("td");
            let popularity = document.createElement("td");
            let btn = document.createElement("td");

            tr.setAttribute("class", "addedSong");
            title.innerHTML = `<a href="#">${song.title}</a>`;
            title.setAttribute("class", "title");
            artist.textContent = `${song.artist.name}`;
            year.textContent = `${song.year}`;
            genre.textContent = `${song.genre.name}`;
            popularity.textContent = `${song.details.popularity}`;
            btn.innerHTML = `<button>Add</button>`;

            tr.appendChild(title);
            tr.appendChild(artist);
            tr.appendChild(year);
            tr.appendChild(genre);
            tr.appendChild(popularity);
            tr.appendChild(btn);
            table.appendChild(tr);
        }

        for(let btn of btns){
            let sortField = btn.getAttribute("data-");
            let sorted;
            btn.addEventListener("click", function(){
                switch(sortField){
                    case "title":
                        sorted = songList.sort( (a,b) => a[sortField] < b[sortField] ? -1:1);
                        break; 
                    case "genre":
                    case "artist":
                        sorted = songList.sort( (a,b) => a[sortField].name < b[sortField].name ? -1:1);
                        console.log(sortField);
                        break;
                    case "popularity": 
                        sorted = songList.sort( (a,b) => a.details[sortField] > b.details[sortField] ? -1:1);
                        console.log(sortField);
                        break;
                    case "year":
                        sorted = songList.sort( (a,b) => a[sortField] > b[sortField] ? -1:1);
                        break;
                    default:
                        sorted = songList.sort( (a,b) => a[sortField] < b[sortField] ? -1:1);
                }

                let rows = document.querySelectorAll(".addedSong");
                
                for(let row of rows){
                    table.removeChild(row);
                }

                for(let song of sorted){
                    const tr = document.createElement("tr");
                    let title = document.createElement("td");
                    let artist = document.createElement("td");
                    let year = document.createElement("td");
                    let genre = document.createElement("td");
                    let popularity = document.createElement("td");
                    let btn = document.createElement("td");

                    tr.setAttribute("class", "addedSong");
                    title.innerHTML = `<a href="#">${song.title}</a>`;
                    title.setAttribute("class", "title");
                    artist.textContent = `${song.artist.name}`;
                    year.textContent = `${song.year}`;
                    genre.textContent = `${song.genre.name}`;
                    popularity.textContent = `${song.details.popularity}`;
                    btn.innerHTML = `<button>Add</button>`;

                    tr.appendChild(title);
                    tr.appendChild(artist);
                    tr.appendChild(year);
                    tr.appendChild(genre);
                    tr.appendChild(popularity);
                    tr.appendChild(btn);
                    table.appendChild(tr);
                }
            }); 
    }

   const link = document.querySelectorAll(".title");
   for (let l of link){
    l.addEventListener("click", function(e){
        document.querySelector(".songInfo, .radar h2").style.display = "block";
        document.querySelector(".radar h2").style.display = "block";
        document.querySelector(".search-browse").style.display = "none";

        document.querySelector("#liTitle").textContent = `Title: ${this.songList.title}`;
});
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