class CreateRateLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :rate_logs do |t|
      t.string :currency
      t.decimal :rate, precision: 16, scale: 4
      t.timestamp :actual_date

      t.timestamps
    end

    add_index :rate_logs, %i[currency actual_date], unique: true
  end
end
