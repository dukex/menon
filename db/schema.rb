# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_31_222743) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "courses", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.text "description"
    t.string "source_url"
    t.string "thumbnail_url"
    t.string "slug"
    t.uuid "owner_id"
    t.string "language", default: "en"
    t.date "published_at"
    t.string "status"
    t.string "creator_name"
    t.string "creator_url"
    t.string "category"
    t.index ["slug"], name: "index_courses_on_slug", unique: true
    t.index ["source_url"], name: "index_courses_on_source_url", unique: true
    t.index ["status", "slug"], name: "index_courses_on_status_and_slug"
  end

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at", precision: nil
    t.uuid "sluggable_id"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "lesson_statuses", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.float "time"
    t.boolean "finished"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.uuid "lesson_id"
    t.uuid "user_id"
    t.index ["lesson_id", "user_id"], name: "lesson_id_user_id", unique: true
    t.check_constraint "\"time\" > 0::double precision", name: "time_greater_than_zero"
  end

  create_table "lessons", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.text "description"
    t.string "thumbnail_url"
    t.date "published_at"
    t.string "provider_id"
    t.integer "position"
    t.integer "duration"
    t.string "slug"
    t.uuid "course_id"
    t.index ["provider_id"], name: "index_lessons_on_provider_id"
    t.index ["slug"], name: "index_lessons_on_slug", unique: true
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at", precision: nil
    t.datetime "last_sign_in_at", precision: nil
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at", precision: nil
    t.datetime "confirmation_sent_at", precision: nil
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "courses", "users", column: "owner_id", name: "owner_id_fk"
  add_foreign_key "lesson_statuses", "lessons", name: "lesson_id_fk"
  add_foreign_key "lesson_statuses", "users", name: "user_id_fk"
  add_foreign_key "lessons", "courses", name: "course_id_fk"
end
