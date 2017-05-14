class LogController < ApplicationController
  def view
    @currency = params.fetch :currency, 'usd'
    @logs = RateLog.where(currency: @currency).pluck(:rate).last(10)
  end
end
