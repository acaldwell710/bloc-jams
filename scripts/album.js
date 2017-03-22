var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};
 
 // Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// My Example Album
var albumCoolJams = {
    title: 'Cool Jams',
    artist: 'various',
    label: 'pop',
    year: '2003',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'This is Me', duration: '3:05' },
        { title: 'One, Two', duration: '2:00' },
        { title: 'A Mile to Go', duration: '4:01' },
        { title: 'Yes, I can', duration: '3:38' },
        { title: 'Where were you?', duration: '2:55' }
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>';
 
    return template;
};

// Must remain outside of function in order to be accessed by other functions
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function (album) {
  
        albumTitle.firstChild.nodeValue = album.title;
        albumArtist.firstChild.nodeValue = album.artist;
        albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
        albumImage.setAttribute('src', album.albumArtUrl);
 
     // initialize parent container
        albumSongList.innerHTML = '';
 
     // call createSongRow & loop through all songs
        for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
// JUST ADDED BELOW -- PT. 2
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>'
// JUST ADDED ABOVE -- PT. 2
var currentlyPlayingSong = null;

window.onload = function() {

    setCurrentAlbum(albumPicasso);
 
    var myCurrentAlbums = [albumPicasso, albumMarconi, albumCoolJams];
    var i = 0;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(myCurrentAlbums[i]);
        i++;
        if (i == myCurrentAlbums.length) {
            i = 0;
        }
    });
    
    songListContainer.addEventListener('mouseover', function(event) {
    // #1
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songNumberCell = event.target.parentElement.querySelector('.song-item-number');
            var songNumber = songNumberCell.getAttribute('data-song-number');
            if (songNumber != currentlyPlayingSong) {
                songNumberCell.innerHTML = playButtonTemplate;
            }
         }
    });
    
    // JUST ADDED BELOW -- PT. 2
//    songListContainer.addEventListener("click", function(event) {
//        console.log(event.target.className);
//        if (event.target.parentElement.className === 'album-view-song-item') {
//            event.target.parentElement.querySelector('.song-item-number').innerHTML = pauseButtonTemplate;
//        }
//    });
    // JUST ADDED ABOVE -- PT. 2
    
    for (var i = 0; i < songRows.length; i++) {

         songRows[i].addEventListener('mouseleave', function(event) {
             var songNumberCell = this.querySelector('.song-item-number');
             var songNumber = songNumberCell.getAttribute('data-song-number');
             if (songNumber != currentlyPlayingSong) {
                songNumberCell.innerHTML = songNumber;
             }
         });
        
        songRows[i].addEventListener('click', function() {
            var songNumberCell = this.querySelector('.song-item-number');
            var songNumber = songNumberCell.getAttribute('data-song-number');
            songNumberCell.innerHTML = pauseButtonTemplate;
            
            // if there's no currently playing song
            // show the pause button
            // and set the currently playing song to the clicked song
            if (currentlyPlayingSong == null) {
                songNumberCell.innerHTML = pauseButtonTemplate;
                currentlyPlayingSong = songNumber;
            // if the currently playing song is the song we just clicked on
            // set the currently playing song to null
            // hide the pause button
            } else if (currentlyPlayingSong == songNumber) {
                currentlyPlayingSong = null;
                songNumberCell.innerHTML = playButtonTemplate;
            // if we click on a new song and a different song is playing
            // find the element of the currently playing song
            // hide the pause button on that element
            // show the pause button on the new song
            // set the currently playing song to the clicked song
            } else if (currentlyPlayingSong != songNumber) {
                var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
                currentlyPlayingSongElement.innerHTML = currentlyPlayingSong;
                songNumberCell.innerHTML = pauseButtonTemplate;
                currentlyPlayingSong = songNumber;
            }
        });
     }
};


