class CreateCoursesCategories < ActiveRecord::Migration[7.0]
  def change
    create_view :courses_categories, materialized: true
  end
end
