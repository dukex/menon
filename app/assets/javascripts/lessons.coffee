_tracker = null

handleEvent = (eventName, handler) ->
  document.addEventListener(eventName, handler, false)

handleEvent "turbolinks:before-visit", clearTrack

window.setupPlayer = (videoId, statusURL, finishURL)->
  width = $('.lesson-container').width()-50
  height = (width * 9) / 16
  try
    new YT.Player 'player',
      height: height
      width: width
      videoId: videoId
      playerVars:
        showinfo: 0
        autohide: 1
        rel: 0
        origin: window.location.origin
      events:
        'onReady': ready,
        'onError': -> Turbolinks.visit(document.location.pathname)
        'onStateChange': state(statusURL, finishURL)
  catch e
    if YT?.loaded
    else
      setTimeout(setupPlayer, 1000)


ready = (e)-> e.target.playVideo()

state = (statusURL, finishURL)->
  (e)->
    clearTrack()
    switch e.data
      when YT.PlayerState.PLAYING
        track(statusURL, e.target)()
      when YT.PlayerState.ENDED
        finish(finishURL)()

clearTrack = -> window.clearTimeout(_tracker)

track = (url, element)->
  ->
    return unless $('body').hasClass('lessons')
    _tracker = setTimeout ->
      fetch url,
        method: 'POST'
        credentials: 'include'
        headers:
          "Content-Type": "application/json"
          "Accept": "application/json"
        body: JSON.stringify
          status:
            time: element.v.currentTime
      .then(track(url, element), track(url, element))
    , 2000

finish = (url)->
  ->
    fetch url,
      method: 'POST'
      credentials: 'include'
      headers:
        "Content-Type": "application/json"
        "Accept": "application/json"
