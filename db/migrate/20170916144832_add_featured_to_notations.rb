class AddFeaturedToNotations < ActiveRecord::Migration[5.0]
  def change
    add_column :notations, :featured, :boolean, null: false, default: false
  end
end
