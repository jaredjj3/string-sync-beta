class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :username, null: false

      t.timestamps
    end

    add_index :users, :session_token, unique: true
    add_index :users, :email, unique: true

    create_table :roles do |t|
      t.string :name, null: false
    end

    add_index :roles, :name, unique: true

    create_table :user_roles, id: false do |t|
      t.integer :role_id
      t.integer :user_id

      t.timestamps
    end

    add_index :user_roles, %i(role_id user_id), unique: true
  end
end
