const video = document.querySelector('.video');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.getElementById('current-time');
const videoDuration = document.getElementById('duration');
const playVid = document.querySelector('.play')
const pauseVid = document.querySelector('.pause');
const volumeBar = document.querySelector('.volume');
const muteOn = document.querySelector('.mute');
const muteOff = document.querySelector('.sound-on');
const fullScreen = document.querySelector('.fullscreen');
const smallScreen = document.querySelector('.smallscreen');
var currentVolume = 0;
var mouseIsDown = false;


const defaultVolumeSet = () => {
    let volumeProgress = (volumeBar.value-volumeBar.min)/(volumeBar.max-volumeBar.min)*100;
    volumeBar.style.background =  `linear-gradient(to right, white 0%, white ${volumeProgress}%, rgba(0, 0 , 0 , 0.3) ${volumeProgress}%, rgba(0, 0 , 0 , 0.3) 100%)`;
    video.volume = volumeBar.value / 100;
}

const progressBarChange =()=> {
    let newTime = progressBar.value;
    video.currentTime = newTime;
}

const timeUpdateHandler =()=> {
    progressBar.value = Math.floor(video.currentTime);
    let progress = (progressBar.value-progressBar.min)/(progressBar.max-progressBar.min)*100;
    progressBar.style.background = `linear-gradient(to right, red 0%, red ${progress}%, rgba(0, 0 , 0 , 0.3) ${progress}%, rgba(0, 0 , 0 , 0.3) 100%)`;
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let currentSeconds;
    if (seconds < 10) {
        currentSeconds = '0'+seconds;
    } else {
        currentSeconds = seconds;
    }
    currentTime.innerText = minutes +':'+currentSeconds

}

const playPauseVid = ()=> {
    if (video.paused) {
        video.play();
        playVid.classList.toggle('active');
        pauseVid.classList.toggle('active');
    }else {
        video.pause()
        playVid.classList.toggle('active');
        pauseVid.classList.toggle('active');
    }
}

const setVolume =  () =>{
    video.volume = volumeBar.value / 100;
    let progress = (volumeBar.value-volumeBar.min)/(volumeBar.max-volumeBar.min)*100;
    volumeBar.style.background =  `linear-gradient(to right, white 0%, white ${progress}%, rgba(0, 0 , 0 , 0.3) ${progress}%, rgba(0, 0 , 0 , 0.3) 100%)`;
    if (volumeBar.value == 0) {
        muteOff.classList.remove('active')
        muteOn.classList.add('active')
    }else {
        muteOff.classList.add('active')
        muteOn.classList.remove('active')
    }
}

const muteUnmute = ()=> {
    if(video.volume != 0){
        currentVolume = video.volume;
        video.volume = 0;
        volumeBar.value = 0;
        muteOn.classList.toggle('active');
        muteOff.classList.toggle('active');
        }else{
        video.volume = currentVolume;
        volumeBar.value = currentVolume * 100;
        muteOff.classList.toggle('active');
        muteOn.classList.toggle('active');
    }
    setVolume();
}

video.addEventListener('timeupdate', timeUpdateHandler);
video.addEventListener('click', playPauseVid);
volumeBar.addEventListener('change', setVolume);
volumeBar.addEventListener('input', setVolume);
muteOn.addEventListener('click', muteUnmute);
muteOff.addEventListener('click', muteUnmute);
playVid.addEventListener('click', playPauseVid);
pauseVid.addEventListener('click', playPauseVid);
progressBar.addEventListener('change',progressBarChange);
progressBar.addEventListener('mousedown', (e)=> {video.pause()});
progressBar.addEventListener('mouseup', (e)=> { video.play()});

video.onloadedmetadata = function () {
    defaultVolumeSet();
    let seconds = Math.floor(video.duration);
    let minutes = seconds / 60;
    videoDuration.innerText = (minutes < 1) ?  `0:${seconds}` : `${minutes}:${seconds}`;
    currentTime.innerText =  '0:00';
    progressBar.max = seconds;
}

