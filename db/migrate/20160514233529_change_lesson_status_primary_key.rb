class ChangeLessonStatusPrimaryKey < ActiveRecord::Migration
  def change
    execute 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'

    add_column :lesson_statuses, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    execute 'ALTER TABLE "lesson_statuses" DROP "id" CASCADE'
    change_table :lesson_statuses do |t|
      t.rename :uuid, :id
    end
    execute "ALTER TABLE lesson_statuses ADD PRIMARY KEY (id);"
  end
end
