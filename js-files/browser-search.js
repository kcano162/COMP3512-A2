/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

// parse artists and genres
const artistList = JSON.parse(artists);
const genreList = JSON.parse(genres);

document.addEventListener("DOMContentLoaded", function(){
    // retrieve data
    const jsonData = localStorage.getItem("songs");
    
    // check if exists
    if(!jsonData){
        fetch(api)
        .then(resp => { if (resp.ok){
            return resp.json();
        }
        else {throw new Error("FetchFailed")};
        })
        .then(data => {
            // store song list in local storage
            const jsonData = JSON.stringify(data);
            localStorage.setItem("songs", jsonData);
    
            // retrieve song list
            const songList = JSON.parse(localStorage.getItem("songs"));
            
            /*--------------------------- Browse/Search Page -----------------------------*/
            // populate select
            const selectArtists = document.querySelector(".artists");
            const selectGenres = document.querySelector(".genres");
            populateSelect(artistList, selectArtists);
            populateSelect(genreList, selectGenres);

            // populate the table (no filter)
            const tbody = document.querySelector(".tbl tbody");
            displaySongs(songList, tbody);

            // column sort
            const btns = document.querySelectorAll('th a');
            filter(songList, btns, tbody);

            /*--------------------------- Single Song Page-----------------------------*/
            const link = document.querySelectorAll(".title");
            for (let l of link){
                l.addEventListener("click", function(e){
                document.querySelector(".songInfo, .radar h2").style.display = "block";
                document.querySelector(".radar h2").style.display = "block";
                document.querySelector(".search-browse").style.display = "none";
        
                document.querySelector("#liTitle").textContent = `Title: ${this.songList.title}`;
                });
            }
        
            document.addEventListener("click", function(){
                document.querySelector(".songInfo").style.display= "block";
                document.querySelector(".search-browse").style.display = "none";
            });
            //eventListener for the singleSong view
            let i = document.querySelectorAll(".songName");
            console.log(i);
            i.forEach( (item) => {
                item.addEventListener("click", (e) => {
                    console.log("yes");
                    document.querySelector(".songInfo").style.display= "block";
                    document.querySelector(".search-browse").style.display = "none";
                    
                    const details = songList.find( s => s.title == e.target.textContent);
                    displayAnalysisData(details);
                });
        
            });
        })
        .catch( err => { });
    }
    else{
        // retrieve song list
        const songList = JSON.parse(localStorage.getItem("songs"));

        // populate select
        const selectArtists = document.querySelector(".artists");
        const selectGenres = document.querySelector(".genres");
        populateSelect(artistList, selectArtists);
        populateSelect(genreList, selectGenres);

        // populate the table (no filter)
        const tbody = document.querySelector(".tbl tbody");
        displaySongs(songList, tbody);

        // column sort
        const btns = document.querySelectorAll('th a');
        filter(songList, btns, tbody);

         /*--------------------------- Single Song Page-----------------------------*/
         const link = document.querySelectorAll(".title");
         for (let l of link){
             l.addEventListener("click", function(e){
             document.querySelector(".songInfo, .radar h2").style.display = "block";
             document.querySelector(".radar h2").style.display = "block";
             document.querySelector(".search-browse").style.display = "none";
     
             document.querySelector("#liTitle").textContent = `Title: ${this.songList.title}`;
             });
         }
     
         //eventListener for the singleSong view
         let i = document.querySelectorAll(".songName");
         i.forEach( (item) => {
             item.addEventListener("click", (e) => {
                 console.log("yes");
                 document.querySelector(".songInfo").style.display= "block";
                 document.querySelector(".search-browse").style.display = "none";
                 
                 const details = songList.find( s => s.title == e.target.textContent);
                 displayAnalysisData(details);
             });
        });
    }
});

function displayAnalysisData(details){
    document.querySelector("#liTitle").textContent = details.title;
    document.querySelector("#liArtist").textContent = details.artist.name;

    // //note: artist type not working 
    document.querySelector("#liAType").textContent = artistList.type;
    document.querySelector("#liGenre").textContent = details.genre.name;
    document.querySelector("#liYear").textContent = details.year;
    let duration = details.details.duration / 60;
    document.querySelector("#liDuration").textContent = `${duration.toFixed(2)} mins`;

    //Analysis Data
    let bpm = document.querySelector("#bpm").textContent = details.details.bpm;
    let energy = document.querySelector("#energy").textContent = details.analytics.energy;
    let danceability = document.querySelector("#danceability").textContent = details.analytics.danceability;
    let liveness = document.querySelector("#liveness").textContent = details.analytics.liveness;
    let valence = document.querySelector("#valence").textContent = details.analytics.valence;
    let acousticness = document.querySelector("#acousticness").textContent = details.analytics.acousticness;
    let speechiness = document.querySelector("#speechiness").textContent = details.analytics.speechiness;
    let popularity = document.querySelector("#popularity").textContent = details.details.popularity;


    //RADAR
    const ctx = document.querySelector('#radarOutput');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    

            

}

/**
 * Browse/Search page functions
 */
function browseSearch(songList){
    
}

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
        title.className = "songName";
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

/**
 * Filtering columns by sorting the columns
 */
function filter(list, btns, tbody){
    for(let btn of btns){
        let sortField = btn.getAttribute("data-");
        let sorted;
        btn.addEventListener("click", function(){
            switch(sortField){
                case "title":
                    sorted = list.sort( (a,b) => a[sortField] < b[sortField] ? -1:1);
                    break; 
                case "genre":
                case "artist":
                      sorted = list.sort( (a,b) => a[sortField].name < b[sortField].name ? -1:1);
                    break;
                case "popularity": 
                    sorted = list.sort( (a,b) => a.details[sortField] > b.details[sortField] ? -1:1);
                    break;
                case "year":
                    sorted = list.sort( (a,b) => a[sortField] > b[sortField] ? -1:1);
                    break;
                default:
                    sorted = list.sort( (a,b) => a[sortField] < b[sortField] ? -1:1);
            }
            displaySongs(sorted, tbody);
        }); 
    }
}




