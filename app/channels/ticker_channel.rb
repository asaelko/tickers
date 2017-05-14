class TickerChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'tickers'
  end

  def unsubscribed
  end
end
