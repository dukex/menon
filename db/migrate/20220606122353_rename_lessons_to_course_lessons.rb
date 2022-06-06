class RenameLessonsToCourseLessons < ActiveRecord::Migration[7.0]
  def change
    rename_table :lessons, :courses_lessons
  end
end
