module LessonsHelper
  def lesson_status_class_for(user, lesson)
    classes = ['lesson']
    classes.push 'finished' if lesson.status_for(user).finished
    classes.push 'current' if lesson.id == @lesson.id
    classes.join(' ')
  end
end
