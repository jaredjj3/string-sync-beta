class UpdateNotationColumnNames < ActiveRecord::Migration[5.0]
  def change
    rename_column(:notations, :dead_time, :dead_time_ms)
    rename_column(:notations, :tempo, :bpm)
    rename_column(:notations, :vextab, :vextab_string)
    rename_column(:notations, :name, :song_name)
    rename_column(:notations, :duration, :duration_ms)
    rename_column(:notations, :user_id, :transcriber_id)

    change_column(:notations, :bpm, :integer, default: 0, null: false)
    change_column(:notations, :dead_time_ms, :integer, default: 0, null: false)
  end
end
