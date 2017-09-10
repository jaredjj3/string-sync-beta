class UpdateNotations < ActiveRecord::Migration[5.0]
  def change
    change_column :notations, :duration, :integer
    add_column :notations, :dead_time, :integer, default: 0
    rename_column :notations, :build_structs, :vextab
    change_column :notations, :vextab, :text
    remove_column :notations, :scroll_structs
  end
end
