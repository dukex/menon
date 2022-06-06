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

ActiveRecord::Schema[7.0].define(version: 2022_06_06_122353) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
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
    t.boolean "featured"
    t.index ["slug"], name: "index_courses_on_slug", unique: true
    t.index ["source_url"], name: "index_courses_on_source_url", unique: true
    t.index ["status", "slug"], name: "index_courses_on_status_and_slug"
  end

  create_table "courses_lessons", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
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
    t.index ["provider_id"], name: "index_courses_lessons_on_provider_id"
    t.index ["slug"], name: "index_courses_lessons_on_slug", unique: true
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
    t.float "time", null: false
    t.boolean "finished", default: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.uuid "lesson_id"
    t.uuid "user_id"
    t.index ["lesson_id", "user_id"], name: "lesson_id_user_id", unique: true
    t.check_constraint "\"time\" > 0::double precision", name: "time_greater_than_zero"
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
  add_foreign_key "courses_lessons", "courses", name: "course_id_fk"
  add_foreign_key "lesson_statuses", "courses_lessons", column: "lesson_id", name: "lesson_id_fk"
  add_foreign_key "lesson_statuses", "users", name: "user_id_fk"

  create_view "courses_categories", materialized: true, sql_definition: <<-SQL
      SELECT split_part((courses.category)::text, '/'::text, 1) AS category,
      split_part((courses.category)::text, '/'::text, 2) AS sub_category,
      count(*) AS courses
     FROM courses
    GROUP BY (split_part((courses.category)::text, '/'::text, 1)), (split_part((courses.category)::text, '/'::text, 2));
  SQL
  create_view "courses_homepages", materialized: true, sql_definition: <<-SQL
      WITH base AS (
           SELECT courses.id,
              courses.name,
              courses.created_at,
              courses.updated_at,
              courses.description,
              courses.source_url,
              courses.thumbnail_url,
              courses.slug,
              courses.owner_id,
              courses.language,
              courses.published_at,
              courses.status,
              courses.creator_name,
              courses.creator_url,
              courses.category,
              courses.featured
             FROM courses
            WHERE ((courses.status)::text = 'reviewed'::text)
          ), latest AS (
           SELECT 'latest'::text AS section,
              base.id,
              base.name,
              base.created_at,
              base.updated_at,
              base.description,
              base.source_url,
              base.thumbnail_url,
              base.slug,
              base.owner_id,
              base.language,
              base.published_at,
              base.status,
              base.creator_name,
              base.creator_url,
              base.category,
              base.featured
             FROM base
            ORDER BY base.updated_at DESC
          ), featured AS (
           SELECT 'featured'::text AS section,
              latest.name,
              latest.category
             FROM latest
            WHERE (latest.featured = true)
            ORDER BY latest.updated_at DESC
          ), top_categories AS (
           SELECT 'top_categories'::text AS section,
              latest.name,
              latest.category,
              rank() OVER (PARTITION BY latest.category ORDER BY latest.updated_at DESC) AS rank
             FROM latest
            WHERE ((latest.category)::text = 'tech'::text)
            ORDER BY latest.updated_at DESC
          ), top_categories_filtered AS (
           SELECT top_categories.section,
              top_categories.name,
              top_categories.category,
              top_categories.rank
             FROM top_categories
            WHERE (top_categories.rank <= 2)
          ), result AS (
          ( SELECT featured.section,
              featured.name,
              featured.category
             FROM featured
           LIMIT 5)
          UNION
          ( SELECT latest.section,
              latest.name,
              latest.category
             FROM latest
           LIMIT 5)
          UNION
          ( SELECT top_categories_filtered.section,
              top_categories_filtered.name,
              top_categories_filtered.category
             FROM top_categories_filtered
           LIMIT 4)
          )
   SELECT result.section,
      result.name,
      result.category
     FROM result
    ORDER BY result.section;
  SQL
  create_view "courses_languages", materialized: true, sql_definition: <<-SQL
      SELECT courses.language,
      count(*) AS courses
     FROM courses
    GROUP BY courses.language;
  SQL
end
