module LessonsHelper
  def lesson_status_class_for(user, lesson, current_lesson)
    classes = ['lesson']
    classes.push 'finished' if lesson_finished?(user, lesson)
    classes.push 'current' if lesson_current?(lesson, current_lesson)
    classes.join(' ')
  end

  def lesson_icon_for(user, lesson, current_lesson)
    i = 'circle'
    i = 'check-circle-o' if lesson_finished?(user, lesson)
    i = 'dot-circle-o' if lesson_current?(lesson, current_lesson)
    i
  end

  def lesson_finished?(user, lesson)
    user && lesson.status_for(user) && lesson.status_for(user).finished
  end

  def lesson_current?(lesson, current_lesson)
    lesson.id == (current_lesson && current_lesson.id)
  end

  def has_previous_lesson(course, lesson)
    course.lessons.index(lesson) != 0
  end

  def has_next_lesson(course, lesson)
    course.lessons.index(lesson) != course.lessons.count - 1
  end

  # TODO: test
  def hyperlink(text)
    return text && text.gsub(/((http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?)/, '<a target="blank" href=\'\1\'>\1</a>').html_safe
  end
end
