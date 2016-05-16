class ChangeLessonsPrimaryKey < ActiveRecord::Migration
  def change
    execute 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'

    add_column :lessons, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    Lesson.all.each do |l|
      l.statuses.update_all lesson_id: l.uuid
    end

    execute 'ALTER TABLE "lessons" DROP "id" CASCADE'
    change_table :lessons do |t|
      t.rename :uuid, :id
    end
    execute "ALTER TABLE lessons ADD PRIMARY KEY (id);"
  end
end
