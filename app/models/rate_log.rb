class RateLog < ApplicationRecord
  validates :currency, uniqueness: {scope: :actual_date}

  def as_json(options = {})
    {
      id: id,
      currency: currency,
      rate: rate.to_f,
      date: actual_date
    }
  end

  def to_json(*options)
    as_json(*options).to_json(*options)
  end
end
