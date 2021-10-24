const player = document.querySelector('.player');
const video = document.querySelector('.video');
const videoControlls = document.querySelector('.video-controlls');
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
const playBackSpeed = document.querySelector('.playback-speed');
const playBackModal = document.querySelector('.playback-speed-modal');
const speedRates = document.querySelectorAll('.speed-rate');
var currentVolume = 0;
var mouseIsDown = false;
var fullScreenIsOn = false;
var timer;

 //This function does not work when deplpoyed to vercel so i added everything from here to timeUpdate function
video.onloadedmetadata = function () {
    defaultVolumeSet();
    let seconds = Math.floor(video.duration);
    let minutes = seconds / 60;
    videoDuration.innerText = (minutes < 1) ?  `0:${seconds}` : `${minutes}:${seconds}`;
    currentTime.innerText =  '0:00';
    progressBar.max = seconds;
    video.playbackRate = 1;
    playBackSpeed.innerText = "1.0x";
    document.querySelector('.speed-rate[data-value="1"]').classList.add('active-speed');
}

player.addEventListener('mousemove',(e)=> {
    videoControlls.style.bottom = '0px';
    clearTimeout(timer);
    if(playBackModal.classList.contains('playback-speed-modal-active')){
        return
    }else {
    timer = setTimeout(function(){
        videoControlls.style.bottom = '-60px';
    }, 1500);
    }
})

player.addEventListener('mouseout', (e)=>{
    if (playBackModal.classList.contains('playback-speed-modal-active')){
        return;
    }else {
        videoControlls.style.bottom = '-60px';
    }
});

videoControlls.addEventListener('mouseover', (e)=>{
    clearTimeout(timer);
    videoControlls.style.bottom = '0px'
}) 

const defaultVolumeSet = () => {
    let volumeProgress = (volumeBar.value-volumeBar.min)/(volumeBar.max-volumeBar.min)*100;
    volumeBar.style.background =  `linear-gradient(to right, white 0%, white ${volumeProgress}%, rgba(0, 0 , 0 , 0.3) ${volumeProgress}%, rgba(0, 0 , 0 , 0.3) 100%)`;
    video.volume = volumeBar.value / 100;
}

const progressBarChange =()=> {
    let newTime = Number(progressBar.value);
    video.currentTime = newTime;
}

const timeUpdateHandler =()=> {
    progressBar.max = Math.floor(video.duration);
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
    if (video.currentTime == video.duration){
        playVid.classList.toggle('active');
        pauseVid.classList.toggle('active');
    }
    let durationSeconds = Math.floor(video.duration);
    let durationMinutes =  durationSeconds / 60;
    videoDuration.innerText = (durationMinutes < 1) ?  `0:${durationSeconds}` : `${durationMinutes}:${durationSeconds}`;
    video.playbackRate = 1;
    playBackSpeed.innerText = "1.0x";
    document.querySelector('.speed-rate[data-value="1"]').classList.add('active-speed');
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

const setVolume =  ()=>{
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

const openFullScreen = ()=> {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) { 
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) { 
        player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { 
        player = window.top.document.body; 
        player.msRequestFullscreen();
    }
    fullScreen.classList.toggle('active');
    smallScreen.classList.toggle('active');
    fullScreenIsOn = true;
}

const closeFullScreen = ()=> {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        window.top.document.msExitFullscreen();
    }
    fullScreen.classList.toggle('active');
    smallScreen.classList.toggle('active');
    fullScreenIsOn = false;
}

const openClosePlayback =()=> {
    playBackModal.classList.toggle('playback-speed-modal-active');
}

const playBackSpeedChange = (speedRate)=> {
    let activeSpeed = document.querySelector('.speed-rate.active-speed');
        if (activeSpeed && activeSpeed !== speedRate){
            activeSpeed.classList.remove('active-speed');
        }
        speedRate.classList.toggle('active-speed');
        playBackSpeed.innerText = speedRate.children[0].innerText;
        video.playbackRate = Number(speedRate.getAttribute('data-value'));
}

video.addEventListener('dblclick', (e)=> {
    if(fullScreenIsOn){
        closeFullScreen();
    }else{
        openFullScreen();
    }
})


video.addEventListener('timeupdate', timeUpdateHandler);
video.addEventListener('click', playPauseVid);
volumeBar.addEventListener('change', setVolume);
volumeBar.addEventListener('input', setVolume);
muteOn.addEventListener('click', muteUnmute);
muteOff.addEventListener('click', muteUnmute);
playVid.addEventListener('click', playPauseVid);
pauseVid.addEventListener('click', playPauseVid);
progressBar.addEventListener('change',progressBarChange);
progressBar.addEventListener('input',progressBarChange);
progressBar.addEventListener('mousedown', (e)=> {video.pause()});
progressBar.addEventListener('mouseup', (e)=> { video.play()});
playBackSpeed.addEventListener('click', openClosePlayback);
fullScreen.addEventListener('click', openFullScreen);
smallScreen.addEventListener('click', closeFullScreen);
speedRates.forEach(speedRate => {
    speedRate.addEventListener('click', (e)=> {
        playBackSpeedChange(speedRate)
    })
});

document.addEventListener('keydown',(e)=> {
    switch (e.code) {
        case "Space":
            e.preventDefault();
            playPauseVid();
        break;
        
        case "ArrowRight":
            if (video.currentTime == video.duration) {
                return;
            }else {
                e.preventDefault();
                let vidCurrentTime = video.currentTime;
                video.currentTime = vidCurrentTime + 5;
            }
        break;
        
        case "ArrowLeft":
            if (video.currentTime == 0){
                return;
            }else {
                e.preventDefault();
                let vidCurrentTime = video.currentTime;
                video.currentTime = vidCurrentTime - 5;
            }
        break;
    }
})

document.addEventListener('click', (e)=> {
    if(!e.target.closest('.playback-speed-modal,.video-controlls')){
        playBackModal.classList.remove('playback-speed-modal-active')
    };
})

