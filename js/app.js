// function

async function getMusicList() {
    //await the response of the fetch call
   let response = await fetch('http://localhost:8000/music.json');
    //proceed once the first promise is resolved.
   let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
}

function createChild(parent, name, id, image){
    // div
    var div = document.createElement("div");
    div.setAttribute("id", id);
    div.classList.add("blockMusic__item");
    div.setAttribute("style", 'background-image: url("img/'+ image + '")');

    // title
    var title = document.createElement("span");
    title.innerHTML = name;
    title.classList.add("blockMusic__title");

    // append
    div.appendChild(title);
    parent.appendChild(div);
}

function getRandomInArray(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function getMultipleRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function reloadPage(){
    location.reload();
}

function checkGuess(e, randomMusic){
    if(e.id == randomMusic.id){
        alert("GG WP");

        // incremente score
        var url = window.location.href;
        var formData = new FormData();
        formData.append('status', 'ok');
        fetch(url, { method: 'POST', body: formData })
        
        reloadPage();
    } else {
        alert("WRONG NOOOB");
        reloadPage();
    }
}

function clear(data){
    songs = getMultipleRandom(data, 9);
    songs.sort( (a, b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    return songs;
}

// time
// refresh page every minute
window.setTimeout(() => {
    reloadPage() 
}, 60000)

// second counter
var seconds = 0;
var secondeCounter = document.getElementById('seconds_counter');

function incrementSeconds() {
    seconds += 1;
    secondeCounter.innerText = seconds + "/60";
}
var cancel = setInterval(incrementSeconds, 1000);

// api promise
getMusicList().then(data => {
    // create music title's block
    var parent = document.getElementById('music_block');

    songs = clear(data);

    songs.forEach((e) => {
        createChild(parent, e.name, e.id, e.image);
    });

    // get random music and set it to the youtube iframe
    let randomMusic = getRandomInArray(songs);
    console.log(randomMusic.name);
    var iframe = document.getElementById("youtube");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + randomMusic.url + '?autoplay=1');

    // add event to music's block
    var nodeMusics = document.getElementById("music_block").childNodes;
    nodeMusics.forEach((e) => {
        e.addEventListener("click", function(){ 
            checkGuess(e, randomMusic);
        });
    });
});
