module LessonsHelper
  def lesson_status_class_for(user, lesson, current_lesson)
    classes = ['lesson']
    classes.push 'finished' if user && lesson.status_for(user).finished
    classes.push 'current' if lesson.id == (current_lesson && current_lesson.id)
    classes.join(' ')
  end

  def lesson_icon_for(user, lesson, current_lesson)
    i = 'circle'
    i = 'check-circle-o' if user && lesson.status_for(user).finished
    i = 'dot-circle-o' if lesson.id == (current_lesson && current_lesson.id)
    i
  end

  # TODO: test
  def has_previous_lesson(course, lesson)
    course.lessons.index(lesson) != 0
  end

  # TODO: test
  def has_next_lesson(course, lesson)
    course.lessons.index(lesson) != course.lessons.count - 1
  end

  # TODO: test
  def hyperlink(text)
    return text.gsub(/((http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?)/, '<a target="blank" href=\'\1\'>\1</a>').html_safe
  end
end
