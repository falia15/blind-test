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
    let div = document.createElement("div");
    div.setAttribute("id", id);
    div.classList.add("blockMusic__item");
    div.setAttribute("style", 'background-image: url("img/'+ image + '")');

    // title
    let title = document.createElement("span");
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
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
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
        let url = window.location.href;
        let formData = new FormData();
        formData.append('status', 'ok');
        fetch(url, { method: 'POST', body: formData })

        reloadPage();
    }
    alert("WRONG NOOOB");
    reloadPage();
    
}

function clear(data){
    // get 0 random and sort name by asc
    music = getMultipleRandom(data, 9);
    music.sort( (a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    return music;
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
    let parent = document.getElementById('music_block');

    music = clear(data);

    music.forEach((e) => {
        createChild(parent, e.name, e.id, e.image);
    });

    // get random music and set it to the youtube iframe
    let randomMusic = getRandomInArray(music);
    let iframe = document.getElementById("youtube");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + randomMusic.url + '?autoplay=1');

    // add event to music's block
    let nodeMusics = document.getElementById("music_block").childNodes;
    nodeMusics.forEach((e) => {
        e.addEventListener("click", function(){ 
            checkGuess(e, randomMusic);
        });
    });
});
