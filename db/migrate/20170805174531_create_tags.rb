class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :name, null: false
    end

    add_index :tags, :name, unique: true

    create_table :taggings, id: false do |t|
      t.integer :notation_id, null: false
      t.integer :tag_id, null: false
    end

    add_index :taggings, %i(notation_id tag_id), unique: true
  end
end
