
async function getMusicList() {
    //await the response of the fetch call
   let response = await fetch('http://localhost:8000/music.json');
    //proceed once the first promise is resolved.
   let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
}

function createChild(parent, name, id){
    // div
    var div = document.createElement("div");
    div.setAttribute("id", id);
    div.classList.add("blockMusic__item");

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

function checkGuess(e, randomMusic){
    if(e.id == randomMusic.id){
        alert("GG WP");
    } else {
        alert("WRONG NOOOB");
    }
}

getMusicList().then(data => {
    // create music title's block
    var parent = document.getElementById('music_block');
    data.forEach((e) => {
        createChild(parent, e.name, e.id);
    });

    // get random music and set it to the youtube iframe
    let randomMusic = getRandomInArray(data);
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
