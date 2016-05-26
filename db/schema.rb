# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160526134658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "blazer_audits", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "query_id"
    t.text     "statement"
    t.string   "data_source"
    t.datetime "created_at"
  end

  create_table "blazer_checks", force: :cascade do |t|
    t.integer  "creator_id"
    t.integer  "query_id"
    t.string   "state"
    t.string   "schedule"
    t.text     "emails"
    t.boolean  "invert"
    t.datetime "last_run_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "blazer_dashboard_queries", force: :cascade do |t|
    t.integer  "dashboard_id"
    t.integer  "query_id"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "blazer_dashboards", force: :cascade do |t|
    t.integer  "creator_id"
    t.text     "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "blazer_queries", force: :cascade do |t|
    t.integer  "creator_id"
    t.string   "name"
    t.text     "description"
    t.text     "statement"
    t.string   "data_source"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "courses", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "description"
    t.string   "source_url"
    t.string   "thumbnail_url"
    t.string   "slug"
    t.uuid     "owner_id"
  end

  add_index "courses", ["slug"], name: "index_courses_on_slug", unique: true, using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
    t.uuid     "sluggable_id"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "lesson_statuses", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.float    "time"
    t.boolean  "finished",   default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.uuid     "lesson_id"
    t.uuid     "user_id"
  end

  create_table "lessons", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.string   "type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "description"
    t.string   "thumbnail_url"
    t.date     "published_at"
    t.string   "provider_id"
    t.integer  "position"
    t.integer  "duration"
    t.string   "slug"
    t.uuid     "course_id"
  end

  add_index "lessons", ["provider_id"], name: "index_lessons_on_provider_id", using: :btree
  add_index "lessons", ["slug"], name: "index_lessons_on_slug", unique: true, using: :btree

  create_table "users", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
