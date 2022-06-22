class CreateCoursesSearches < ActiveRecord::Migration[7.0]
  def change
    create_view :courses_searches, materialized: true
  end
end
