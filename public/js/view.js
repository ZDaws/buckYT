// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoCountdown;
var videoList = [];

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
            },
            'onStateChange': onPlayerStateChange
        }
    });
    videoList.push(player);
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
    videoList[i].pauseVideo();
    $('.players').children().eq(i).hide();
    i--;
    if(i<0){
        i = $('.players').children().length-1;
    }
    $('.players').children().eq(i).show();
} 
function nextVideo(autoPlay){
    videoList[i].pauseVideo();
    $('.players').children().eq(i).hide();
    i++;
    if(i>=$('.players').children().length){
        i = 0;
    }
    $('.players').children().eq(i).show();
    if(autoPlay){
        videoList[i].seekTo(0);
        videoList[i].playVideo();
    }
} 

function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED){
        nextVideo(true);
    }

}
