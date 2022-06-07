class CreateCoursesLanguages < ActiveRecord::Migration[7.0]
  def change
    create_view :courses_languages, materialized: true
  end
end
