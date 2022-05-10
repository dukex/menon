class AddPublishedAtToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :published_at, :date
  end
end
