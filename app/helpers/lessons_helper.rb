module LessonsHelper
  def lesson_status_class_for(user, lesson)
    classes = ['lesson']
    classes.push 'finished' if lesson.status_for(user).finished
    classes.push 'current' if lesson.id == @lesson.id
    classes.join(' ')
  end

  def has_previous_lesson(course, lesson)
    course.lessons.index(lesson) != 0
  end

  def has_next_lesson(course, lesson)
    course.lessons.index(lesson) != course.lessons.count - 1
  end
end
