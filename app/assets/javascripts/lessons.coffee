_tracker = null
player = null

handleEvent "turbolinks:before-cache", clearTrack

window.setupPlayer = (videoId, statusURL, finishURL)->
  width = $('.lesson-container').width()-50
  height = (width * 9) / 16
  try
    player = new YT.Player 'player',
      height: height
      width: width
      videoId: videoId
      playerVars:
        showinfo: 0
        autohide: 1
        rel: 0
      events:
        'onReady': ready,
        'onError': ->
          Turbolinks.visit(document.location.pathname)

    player.addEventListener 'onStateChange', state(statusURL, finishURL)
  catch e
    console.log e
    if YT.loaded
      Turbolinks.visit(document.location.pathname)
    else
      setTimeout(setupPlayer, 1000)


ready = (e)->
  # $("#player").affix offset: top: 80
  e.target.playVideo()

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
