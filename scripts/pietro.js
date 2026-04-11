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
    "../static/pietro/wonderfulwonderful.mp3",
    "../static/pietro/arabella.mp3",
    "../static/pietro/fireside.mp3",
    "../static/pietro/iwantitall.mp3",
    "../static/pietro/madsounds.mp3",
    "../static/pietro/onefortheroad.mp3",
    "../static/pietro/snapoutofit.mp3",
    "../static/pietro/doiwannaknow.mp3",
    "../static/pietro/iwannabeyours.mp3",
    "../static/pietro/kneesocks.mp3",
    "../static/pietro/no1partyanthem.mp3",
    "../static/pietro/rumine.mp3",
    "../static/pietro/whydyoucallme.mp3",
    "../static/pietro/americansports.mp3",
    "../static/pietro/clusterone.mp3",
    "../static/pietro/goldentrunks.mp3",
    "../static/pietro/letsstaytogether.mp3",
    "../static/pietro/onepointperspective.mp3",
    "../static/pietro/sinceimetyou.mp3",
    "../static/pietro/time.mp3",
    "../static/pietro/anycoloryoulike.mp3",
    "../static/pietro/comingbacktolife.mp3",
    "../static/pietro/greatdayforfreedom.mp3",
    "../static/pietro/lonesometown.mp3",
    "../static/pietro/ontherun.mp3",
    "../static/pietro/sonofapreacherman.mp3",
    "../static/pietro/tranquilityt.mp3",
    "../static/pietro/batphone.mp3",
    "../static/pietro/commanche.mp3",
    "../static/pietro/greatgiginthesky.mp3",
    "../static/pietro/lostforwords.mp3",
    "../static/pietro/outoflimits.mp3",
    "../static/pietro/speaktome.mp3",
    "../static/pietro/ultracheese.mp3",
    "../static/pietro/braindamage.mp3",
    "../static/pietro/eclipse.mp3",
    "../static/pietro/highhopes.mp3",
    "../static/pietro/marooned.mp3",
    "../static/pietro/positivemusic.mp3",
    "../static/pietro/startreatement.mp3",
    "../static/pietro/usandthem.mp3",
    "../static/pietro/breathe.mp3",
    "../static/pietro/flowersonthewall.mp3",
    "../static/pietro/ifloveisareddress.mp3",
    "../static/pietro/misrlou.mp3",
    "../static/pietro/rumble.mp3",
    "../static/pietro/strawbrryletter.mp3",
    "../static/pietro/wearingtheinsideout.mp3",
    "../static/pietro/bullwinkle2.mp3",
    "../static/pietro/fouroutoffive.mp3",
    "../static/pietro/jungleboogie.mp3",
    "../static/pietro/money.mp3",
    "../static/pietro/sciencefiction.mp3",
    "../static/pietro/surfrider.mp3",
    "../static/pietro/whatdoyouwantfromme.mp3",
    "../static/pietro/bustinsurf.mp3",
    "../static/pietro/girlyoullbeawoman.mp3",
    "../static/pietro/keeptalking.mp3",
    "../static/pietro/monstertruck.mp3",
    "../static/pietro/shelookslikefun.mp3",
    "../static/pietro/takeitback.mp3",
    "../static/pietro/youcannevertell.mp3",
    "../static/pietro/avenuec.mp3",
    "../static/pietro/blindingflorence.mp3",
    "../static/pietro/cosmiclove.mp3",
    "../static/pietro/dogdaysareover.mp3",
    "../static/pietro/drummingsong.mp3",
    "../static/pietro/earlymorning.mp3",
    "../static/pietro/florencehowl.mp3",
    "../static/pietro/girlwithoneeye.mp3",
    "../static/pietro/goodnews.mp3",
    "../static/pietro/halfawyoverthehill.mp3",
    "../static/pietro/homeagain.mp3",
    "../static/pietro/hurricanedrunk.mp3",
    "../static/pietro/imnotcallingyoualiar.mp3",
    "../static/pietro/itsamiracle.mp3",
    "../static/pietro/iwanttobesbbaby.mp3",
    "../static/pietro/mandy.mp3",
    "../static/pietro/mybabylovesme.mp3",
    "../static/pietro/myboybuildscoffins.mp3",
    "../static/pietro/rabbitheart.mp3",
    "../static/pietro/sandra.mp3",
    "../static/pietro/sthscomingup.mp3",
    "../static/pietro/thetwoofus.mp3",
    "../static/pietro/youvegotthelove.mp3"
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

const volumeSlider = document.getElementById('volume-slider');

audioPlayer.volume = volumeSlider.value;

volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value;
});

document.getElementById('skip-btn').addEventListener('click', function() {
    playRandomSong();
});