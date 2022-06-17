class Courses::Homepage < ApplicationRecord
  def self.refresh
    Scenic.database.refresh_materialized_view(table_name, concurrently: false, cascade: false)
  end

  def lessons_ordered
    @lessons_ordered ||= Courses::Lesson.where(course_id: id).order('position ASC')
  end
end
