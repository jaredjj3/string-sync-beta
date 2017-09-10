# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170910011021) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notations", force: :cascade do |t|
    t.integer  "user_id",                            null: false
    t.text     "youtube_video_id",                   null: false
    t.string   "name",                               null: false
    t.string   "artist_name",                        null: false
    t.text     "vextab"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.integer  "duration"
    t.integer  "dead_time",              default: 0
    t.index ["user_id"], name: "index_notations_on_user_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string "name", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true, using: :btree
  end

  create_table "taggings", id: false, force: :cascade do |t|
    t.integer "notation_id", null: false
    t.integer "tag_id",      null: false
    t.index ["notation_id", "tag_id"], name: "index_taggings_on_notation_id_and_tag_id", unique: true, using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true, using: :btree
  end

  create_table "user_notations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "notation_id"
    t.index ["user_id", "notation_id"], name: "index_user_notations_on_user_id_and_notation_id", unique: true, using: :btree
  end

  create_table "user_roles", id: false, force: :cascade do |t|
    t.integer  "role_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id", "user_id"], name: "index_user_roles_on_role_id_and_user_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "username",        null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  end

end
