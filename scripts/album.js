function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

const weeklyAudio = new Audio();
let isWeeklyPlaying = false;

const albumNameEl = document.getElementById('album-name');
const albumDescEl = document.getElementById('album-description');
const albumLinkEl = document.getElementById('album-link');
const weeklyPlayBtn = document.getElementById('weekly-play-btn');
const weeklyVolumeSlider = document.getElementById('weekly-volume-slider');

weeklyAudio.volume = weeklyVolumeSlider.value;

fetch('albums.json')
    .then(response => response.json())
    .then(data => {
        let currentWeek = getWeekNumber(new Date());
        
        if (currentWeek > 52) currentWeek = 1; 

        const album = data.find(item => item.week === currentWeek);

        if (album) {
            albumNameEl.textContent = album.name;
            albumDescEl.textContent = album.description;
            
            albumLinkEl.href = album.link;
            albumLinkEl.style.display = 'inline-block';
            
            weeklyAudio.src = album.musicFile;
            weeklyPlayBtn.disabled = false;
        } else {
            albumNameEl.textContent = "coś poszło nie tak. fuck...";
        }
    })
    .catch(error => {
        console.error('coś poszło nie tak. fuck...', error);
        albumNameEl.textContent = "coś poszło nie tak. fuck...";
    });

weeklyPlayBtn.addEventListener('click', function() {
    if (isWeeklyPlaying) {
        weeklyAudio.pause();
        weeklyPlayBtn.textContent = 'graj';
    } else {
        weeklyAudio.play();
        weeklyPlayBtn.textContent = 'przestan grać';
    }
    isWeeklyPlaying = !isWeeklyPlaying;
});

weeklyVolumeSlider.addEventListener('input', function() {
    weeklyAudio.volume = this.value;
});

weeklyAudio.addEventListener('ended', function() {
    isWeeklyPlaying = false;
    weeklyPlayBtn.textContent = 'graj';
});