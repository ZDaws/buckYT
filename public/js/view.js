// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoCountdown;

$(function() {
    $('.players').hide();
});

function onYouTubeIframeAPIReady() {
    videoCountdown = $('.players').children().length;
    console.log(videoCountdown);
    $('.players').children().each(function(index,element) {
        makePlayer(this, $(this).data('videoid'));
    });
}

function makePlayer(element, videoid) {
    player = new YT.Player(element, {
        height: '510',
        width: '760',
        videoId: videoid,
        events: {
            'onReady': function(event) {
                videoCountdown--;
                if(videoCountdown === 0){
                    initializeVideos();
                }
            }
        }
    });
}

function hideVideos(){
    $('.players').children().hide();
}

function initializeVideos(){
    hideVideos();
    $('.players').show();
    $('.spinner').hide();
    $('.players').children().eq(0).show();
    $('.jsPrevious').on('click', function(event) {
        event.preventDefault();
        previousVideo();
    });
    $('.jsNext').on('click', function(event) {
        event.preventDefault();
        nextVideo();
    });
    $('.player-controls').show();
}

var i = 0;

function previousVideo(){
    $('.players').children().eq(i).hide();
    i--;
    if(i<0){
        i = $('.players').children().length-1;
    }
    $('.players').children().eq(i).show();
} 
function nextVideo(){
    $('.players').children().eq(i).hide();
    i++;
    if(i>=$('.players').children().length){
        i = 0;
    }
    $('.players').children().eq(i).show();
} 

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
}
  function stopVideo() {
    player.stopVideo();
  }