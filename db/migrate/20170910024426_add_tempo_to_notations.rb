class AddTempoToNotations < ActiveRecord::Migration[5.0]
  def change
    add_column :notations, :tempo, :integer, null: false
  end
end
