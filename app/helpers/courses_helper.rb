module CoursesHelper
  def course_progress_for(user, course)
    "#{course.progress_for(user)}%"
  end
end
