// declare variable
let previous = _('pre'),
    play = _('play'),
    next = _('next'),
    title = _('title'),
    recent_volume = _('volume'),
    volume_show = _('volume_show'),
    volume_icon = _('volume_icon'),
    slider = _('duration_slider'),
    show_duration = _('show_duration'),
    track_image = _('track_image'),
    auto_play = _('auto'),
    current = _('current'),
    total = _('total'),
    artist = _('artist');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;

// create audio
let track = document.createElement('audio');

// All Songs
const songs = [
  {
    title: "MEnorme",
    artist: "Linn da Quebrada",
    seconds: 244,
    cover: "../assets/images/linn da quebrada - menorme.jpg",
    src: "../assets/audios/Linn da Quebrada - MEnorme.mp3"
  },
  {
    title: "Oceano",
    artist: "Mc Tha",
    seconds: 128,
    cover: "../assets/images/mc tha - oceano.jpg",
    src: "../assets/audios/Mc Tha - Oceano.mp3"
  },
  {
    title: "FU",
    artist: "Miley Cyrus",
    seconds: 229,
    cover: "../assets/images/miley cyrus - fu.jpg",
    src: "../assets/audios/Miley Cyrus - FU.mp3"
  },
  {
    title: "Counterflow",
    artist: "Viktoria Modesta",
    seconds: 204,
    cover: "../assets/images/viktoria modesta - counterflow.jpg",
    src: "../assets/audios/Viktoria Modesta - Counterflow.mp3"
  },
  {
    title: "Shakushain",
    artist: "Wednesday Campanella",
    seconds: 219,
    cover: "../assets/images/wednesday campanella - shakushain.jpg",
    src: "../assets/audios/Wednesday Campanella - Shakushain.mp3"
  },
  {
    title: "Gimme Chocolate",
    artist: "Baby Metal",
    seconds: 243,
    cover: "../assets/images/baby metal - gimme chocolate.jpg",
    src: "../assets/audios/Baby Metal - Gimme Chocolate.mp3"
  },
  {
    title: "Karate",
    artist: "Baby Metal",
    seconds: 270,
    cover: "../assets/images/baby metal - karate.jpg",
    src: "../assets/audios/Baby Metal - Karate.mp3"
  },
  {
    title: "Kream (Ft. Tyga) [Remix]",
    artist: "Iggy Azalea",
    seconds: 150,
    cover: "../assets/images/iggy azalea - kream.jpg",
    src: "../assets/audios/Iggy Azalea - Kream (ft. Tyga).mp3"
  },
  {
    title: "Started",
    artist: "Iggy Azalea",
    seconds: 186,
    cover: "../assets/images/iggy azalea - started.jpg",
    src: "../assets/audios/Iggy Azalea - Started.mp3"
    },
  {
    title: "Burn the Pages",
    artist: "Sia",
    seconds: 235,
    cover: "../assets/images/sia - burn the pages.jpg",
    src: "../assets/audios/Sia - Burn The Pages.mp3"
  },
  {
    title: "Jumanji",
    artist: "Azealia Banks",
    seconds: 174,
    cover: "../assets/images/azealia banks - jumanji.jpg",
    src: "../assets/audios/Azealia Banks - Jumanji.mp3"
  },
  {
    title: "Pretty Girls",
    artist: "Britney Spears",
    seconds: 164,
    cover: "../assets/images/britney spears - pretty girls.jpg",
    src: "../assets/audios/Britney Spears - Pretty Girls.mp3"
  },
  {
    title: "Salute (TroyBoi Remix)",
    artist: "Little Mix",
    seconds: 251,
    cover: "../assets/images/little mix - salute.jpg",
    src: "../assets/audios/Little Mix - Salute.mp3"
  },
  {
    title: "Lies",
    artist: "Marina and the Diamonds",
    seconds: 368,
    cover: "../assets/images/marina and the diamonds - lies.jpg",
    src: "../assets/audios/Marina and the Diamonds - Lies.mp3"
  }
  
];

    total.innerHTML = songs.length;



// create function
function _(id) {
    return document.getElementById(id);
}

// load track


function loading(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = songs[index_no].src;
    title.innerHTML = songs[index_no].title;
    track_image.src = songs[index_no].cover;
    artist.innerHTML = songs[index_no].artist;
    track.load();
    current.innerHTML = index_no + 1;


    timer = setInterval(range_slider, 1000);

}
loading(index_no);
// check songs is playing

play.addEventListener("click", () => {
    if (playing_song == false) {
        playSong();
    } else {
        pauseSong();
    }
});
next.addEventListener("click", () => {
    next_song(); 
});
previous.addEventListener("click", () => {
    previous_song(); 
});
recent_volume.addEventListener("change", () => {
    volume_change();
});
slider.addEventListener("change", () => {
    change_duration();
});
auto_play.addEventListener("click", () => {
    autoplay_switch();
});
volume_icon.addEventListener("click", () => {
    mute_sound(); 
});
// play Song

function playSong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

// paue song

function pauseSong() {
    track.pause();
    playing_song = false;
        play.innerHTML = '<i class="fa fa-play"></i>';

}

// next Song

function next_song() {
    if (index_no < songs.length - 1) {
        index_no += 1;
        loading(index_no);
        playSong();
    } else {
        index_no = 0;
        loading(index_no);
        playSong();
    }
}
// previous Song

function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        loading(index_no);
        playSong();
    } else {
        index_no = songs.length;
        loading(index_no);
        playSong();
    }
}
// change volume

function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
    if (track.volume > 0) {
        volume_icon.classList.add('fa-volume-up');
    volume_icon.classList.remove('fa-volume-mute');
    }
}

// change slider position

function change_duration() {
     slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider() {
    let position = 0;
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play"></i>';
        if (autoplay == 1) {
            index_no += 1;
            loading(index_no);
            playSong();
        }
    }
}
// reset slider

function reset_slider() {
    slider.value = 0;
}
// auto play

function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    } else {
        autoplay = 1;
                auto_play.style.background = "#ff7765";

    }
}

// mute sound

function mute_sound() {
    volume_icon.classList.remove('fa-volume-up');
    volume_icon.classList.add('fa-volume-mute');
    track.volume = 0;
    recent_volume.value = 0;
    volume_show.innerHTML = 0;
}