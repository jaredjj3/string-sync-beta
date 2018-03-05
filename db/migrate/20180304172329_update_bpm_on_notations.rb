class UpdateBpmOnNotations < ActiveRecord::Migration[5.0]
  def change
    change_column(:notations, :bpm, :decimal)
  end
end
