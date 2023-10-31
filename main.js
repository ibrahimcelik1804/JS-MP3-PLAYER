/* elemanlara ulaşıp obje olarak kullanma, yakalama */
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')

const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')

const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress= document.getElementById('current-progress')


//sıra
let index


//dongu
let loop = true


//JSON ŞARKI LİSTE YAPI 

const songsList = [
    {
        name: "FLASH BACKS",
        link: "media/flashback.mp3",
        artist: "Inna",
        image: "media/inna.jpeg"
    },
    {
        name: "10 NUMARA",
        link: "media/on-numara.mp3",
        artist: "Lvbel C5",
        image: "media/lvbel10.jpg"
    },
    {
        name: "AŞKIN OLAYIM",
        link: "media/askin-olayim.mp3",
        artist: "Simge Sağın",
        image: "media/simge.jpg"
    },
    {
        name: "Arabam Dacia",
        link: "media/dacia.mp3",
        artist: "Lvbel C5",
        image: "media/lvbeldacia.jpg"
        
    },
    {
        name: "Antidepresan",
        link: "media/gitmeburdan.mp3",
        artist: "Mobel Matiz",
        image: "media/mobelmatiz.jpg"
    }
]
//time format
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60 )
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

//şarkı atama
const setSong = (arrayIndex) => {
   
    let{ name, link, artist, image} = songsList[arrayIndex]


    // audio atanacak 
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadeddata = () =>{

        maxDuration.innerText = timeFormatter(audio.duration)
    }   
    //en fazla vakti ver
    
    //container eger duruyorsa yok et
    playListContainer.classList.add('hide')
    playAudio()
    
 }
const playAudio = () =>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

}
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')

}
const nextSong = ()=>{
    if (loop){
        if (index == (songsList.length - 1)){
            index = 0
        }else {
            index +=1
        }
        setSong(index)
        playAudio()
    }else {
        let randIndex = Math.floor(Math.random() * songsList.lenght)
        console.log(randIndex)
        setSong(randIndex)
        playAudio()
    }
}
const previousSong = () =>{
    if (index > 0) {
        pauseAudio()
        index -=1

    } else { 
        index = songsList.lenght - 1
    }
    setSong(index)
    playAudio() 

}
audio.onended = () =>{
    nextSong()
}

const progressBarClicked = () =>{

}

progressBar.addEventListener('click', (event) =>{
    let coordStart = progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX
    let progress = ( coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')


})

//karıştır tıklanıldıgında

shuffleButton.addEventListener('click',()=>{
    if( shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
        console.log('krıştırma kapalı')
    } else {
        shuffleButton.classList.add('active')
        loop = false
        console.log('karıştıma açık')
    }
})

//tekrar et butonu tıklanıldığında

repeatButton.addEventListener('click',()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false
        console.log('tekrar kapalı')
    } else {
        repeatButton.classList.add('active')
        loop = true
        console.log('tekrar açık')
    }
})
const initializePlayList = () =>{
    for (const i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
         <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist}
        </span>
      </div>
    </li>`
    }
}

playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})
closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})



//play button
playButton.addEventListener('click', playAudio)
//durdur button
pauseButton.addEventListener('click', pauseAudio)
//sonraki şarkı
nextButton.addEventListener('click', nextSong)
//öncekine git
prevButton.addEventListener('click', previousSong)



setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))*100 + "%"

}, 1000);

//zamangüncellemesi
audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// ekran yüklenildiğinde
window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlayList()
}
