const playlist = [
    "../static/pietro/haveallthesongsbeenwritten.mp3",
    "../static/pietro/outofmymind.mp3",
    "../static/pietro/rut.mp3",
    "../static/pietro/the calling.mp3",
    "../static/pietro/tysonvsdouglas.mp3",
    "../static/pietro/lifetocome.mp3",
    "../static/pietro/runforcover.mp3",
    "../static/pietro/somekindoflove.mp3",
    "../static/pietro/theman.mp3",
    "../static/pietro/wonderfulwonderful.mp3"
];

const audioPlayer = new Audio();
let lastPlayedIndex = -1;

function playRandomSong() {
    let randomIndex;
    
    do {
        randomIndex = Math.floor(Math.random() * playlist.length);
    } while (randomIndex === lastPlayedIndex && playlist.length > 1);

    lastPlayedIndex = randomIndex;
    
    audioPlayer.src = playlist[randomIndex];
    audioPlayer.play();
}

audioPlayer.addEventListener('ended', playRandomSong);

document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('music-overlay').style.display = 'none';
    playRandomSong();
});