// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoList = [];

$(function() {
    $('.js-add').on('click', function(event) {
        event.preventDefault();
        var textinput=$('.js-videourl').val();
        var videoid = youtube_parser(textinput);

        // If no video id found from the input, assume the
        // entire input is the video id from YT
        if (videoid == false) {
            videoid = textinput;
        }

        videoList.push(videoid);
        $('#videoList').val(videoList.join());

        var player_element = $('<div class="player"></div>');
        $('.players').append(player_element);
        makePlayer(player_element.get(0), videoid);

        $('.js-videourl').val('');
    });
});

// From http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function makePlayer(element, videoid) {
    player = new YT.Player(element, {
        height: '255',
        width: '380',
        videoId: videoid,
        events: {
            'onReady': function(event) {
                console.log(event.target.getVideoUrl());
            }
        }
    });
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