_tracker = null
player = null

window.setupPlayer = (videoId, statusURL, finishURL)->
  player = new YT.Player 'player',
    height: document.getElementById("player").clientWidth * 0.6
    width: '100%'
    videoId: videoId
    events:
      'onReady': ready,
      'onStateChange': state(statusURL, finishURL)

ready = (e)-> e.target.playVideo()

state = (statusURL, finishURL)->
  (e)->
    switch e.data
      when YT.PlayerState.PLAYING
        track(statusURL)()
      when YT.PlayerState.ENDED
        clearTrack()
        finish(finishURL)()
      else
        clearTrack()

clearTrack = -> window.clearTimeout(_tracker)

track = (url)->
  ->
    _tracker = setTimeout ->
      fetch url,
        method: 'POST'
        credentials: 'include'
        headers:
          "Content-Type": "application/json"
          "Accept": "application/json"
        body: JSON.stringify
          time: player.getCurrentTime()
      .then(track(url), track(url))
    , 2000

finish = (url)->
  ->
    fetch url,
      method: 'POST'
      credentials: 'include'
      headers:
        "Content-Type": "application/json"
        "Accept": "application/json"
