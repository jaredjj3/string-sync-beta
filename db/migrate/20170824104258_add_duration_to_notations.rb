class AddDurationToNotations < ActiveRecord::Migration[5.0]
  def change
    add_column :notations, :duration, :float
  end
end
