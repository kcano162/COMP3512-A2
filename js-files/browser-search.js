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
    const tbody = document.querySelector(".tbl tbody");
    let btns = document.querySelectorAll('th a');
       
    displaySongs(songList, tbody);

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
            displaySongs(sorted, tbody);
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

    // populate select of artist and genre
    populateSelect(artistList, selectArtists);
    populateSelect(genreList, selectGenres);

    //eventListener for the singleSong view
        let click =    document.querySelector(".tbl td a");
        
        click.addEventListener("click", function(e){
        document.querySelector(".songInfo").style.display= "block";
        document.querySelector(".search-browse").style.display = "none";

        const ul = document.querySelector(".analysis ul");
        const li = document.createElement("li");
        let songTitle = document.createElement(e.target.title);


    });

    /**
     * Populate select lists
     */
    function populateSelect(list, select){
        list.forEach( l => {
            let option = document.createElement("option");
            option.setAttribute("value", `${l.id}`);
            option.textContent = `${l.name}`;

            select.appendChild(option);
        });
    }

    /**
     * Displaying the sorted songs into a list in the page
     */
    function displaySongs(list, tbody){
        tbody.innerHTML = "";

        list.forEach( l => {
            const tr = document.createElement("tr");
            const title = document.createElement("td");
            const artist = document.createElement("td");
            const year = document.createElement("td");
            const genre = document.createElement("td");
            const popularity = document.createElement("td");
            const btn = document.createElement("td");

            tr.className = "songRow";
            title.innerHTML = `<a href="#">${l.title}</a>`;
            title.setAttribute("class", "title");
            artist.textContent = `${l.artist.name}`;
            year.textContent = `${l.year}`;
            genre.textContent = `${l.genre.name}`;
            popularity.textContent = `${l.details.popularity}`;
            btn.innerHTML = `<button>Add</button>`;

            tr.appendChild(title);
            tr.appendChild(artist);
            tr.appendChild(year);
            tr.appendChild(genre);
            tr.appendChild(popularity);
            tr.appendChild(btn);
            tbody.appendChild(tr);
        });
    }
});