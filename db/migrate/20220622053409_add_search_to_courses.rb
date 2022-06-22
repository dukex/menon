class AddSearchToCourses < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE courses
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'B')
      ) STORED;
    SQL
  end

  def down
    remove_column :courses, :searchable
  end
end
