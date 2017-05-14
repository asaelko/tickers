class GetLastRatesJob < ApplicationJob
  queue_as :default

  def perform(type)
    raise Exception unless %w[usd rur eur].include? type

    key = "btc_#{type}"
    client = RestClient
    response = client.post("https://btc-e.nz/api/3/ticker/#{key}", {})
    ticker_data = ActiveSupport::JSON.decode response.body

    ticker = RateLog.new
    ticker.actual_date = Time.at(ticker_data[key]['updated']).to_datetime
    ticker.rate = ticker_data[key]['last']
    ticker.currency = type

    ActionCable.server.broadcast 'tickers', log: ticker if ticker.save

    GetLastRatesJob.set(wait: 1.minute).perform_later(type)
  end
end
