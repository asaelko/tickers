App.ticker = App.cable.subscriptions.create "TickerChannel",
  connected: ->
    console.log 'connected'

  disconnected: ->
    console.log 'disconnected'

  received: (data) ->
    @appendNewLine data

  appendNewLine: (data) ->
    App.graph.tick data.log