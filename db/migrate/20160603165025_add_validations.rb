class AddValidations < ActiveRecord::Migration[4.2]
  def up
    execute "ALTER TABLE lesson_statuses
      ADD CONSTRAINT time_greater_than_zero CHECK (time > 0)"

    execute "ALTER TABLE courses
      ALTER COLUMN name SET NOT NULL"

    execute "ALTER TABLE courses
      ADD CONSTRAINT owner_id_fk
      FOREIGN KEY (owner_id)
      REFERENCES users (id)"

    execute "ALTER TABLE lessons
      ADD CONSTRAINT course_id_fk
      FOREIGN KEY (course_id)
      REFERENCES courses (id)"

    execute "ALTER TABLE lesson_statuses
      ADD CONSTRAINT lesson_id_fk
      FOREIGN KEY (lesson_id)
      REFERENCES lessons (id)"

    execute "ALTER TABLE lesson_statuses
      ADD CONSTRAINT user_id_fk
      FOREIGN KEY (user_id)
      REFERENCES users (id)"

    execute "ALTER TABLE lesson_statuses
      ADD CONSTRAINT lesson_id_user_id UNIQUE (lesson_id, user_id)"
  end

  def down
    execute "ALTER TABLE lesson_statuses
      DROP CONSTRAINT time_greater_than_zero"

   execute "ALTER TABLE courses
      ALTER COLUMN name SET NULL"

    execute "ALTER TABLE courses
      DROP CONSTRAINT owner_id_fk"

    execute "ALTER TABLE lessons
      DROP CONSTRAINT course_id_fk"

    execute "ALTER TABLE lesson_statuses
      DROP CONSTRAINT lesson_id_fk"

    execute "ALTER TABLE lesson_statuses
      DROP CONSTRAINT user_id_fk"

    execute "ALTER TABLE lesson_statuses
      DROP CONSTRAINT lesson_id_user_id"

  end
end
