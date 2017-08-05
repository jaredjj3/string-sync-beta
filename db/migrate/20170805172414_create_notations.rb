class CreateNotations < ActiveRecord::Migration[5.0]
  def change
    create_table :notations do |t|
      t.integer :user_id, null: false
      t.text :youtube_video_id, null: false
      t.text :thumbnail_url, null: false
      t.string :name, null: false
      t.string :artist_name, null: false
      t.text :build_structs
      t.text :scroll_structs

      t.timestamps
    end

    add_index :notations, :user_id

    create_table :user_notations do |t|
      t.integer :user_id
      t.integer :notation_id
    end

    add_index :user_notations, %i(user_id notation_id), unique: true
  end
end
