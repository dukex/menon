class ChangeCoursePrimaryKey < ActiveRecord::Migration[4.2]
  def change
    execute 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'

    add_column :courses, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    Course.all.each do |c|
      c.lessons.update_all course_id: c.uuid
    end

    execute 'ALTER TABLE "courses" DROP "id" CASCADE'
    change_table :courses do |t|
      t.rename :uuid, :id
    end
    execute "ALTER TABLE courses ADD PRIMARY KEY (id);"
  end
end
